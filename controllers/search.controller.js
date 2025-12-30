const fs = require("fs");
const path = require("path");

// A simple in-memory cache for bible versions to avoid reading files on every request.
const bibleCache = new Map();

/**
 * Determines the testament ('old' or 'new') based on the biblical book number.
 * @param {number} bookNumber - The book number (1-66).
 * @returns {('old'|'new'|null)} 'old', 'new', or null if the number is out of range.
 */
const getTestamentByBookNumber = (bookNumber) => {
  if (bookNumber >= 1 && bookNumber <= 39) {
    return "old";
  }
  if (bookNumber >= 40 && bookNumber <= 66) {
    return "new";
  }
  return null;
};

class SearchController {
  /**
   * Loads a bible version from a JSON file.
   * Caches the loaded data in memory to improve performance for subsequent requests.
   * @param {string} language - The language of the bible.
   * @param {string} version - The version of the bible.
   * @returns {object|null} The parsed bible data or null if not found or on error.
   */
  loadBible(language, version) {
    const cacheKey = `${language}-${version}`;
    if (bibleCache.has(cacheKey)) {
      return bibleCache.get(cacheKey);
    }

    const biblePath = path.join(
      __dirname,
      "../bibles",
      language,
      version,
      `${version}.json`
    );

    if (!fs.existsSync(biblePath)) {
      console.error(`Bible file not found at: ${biblePath}`);
      return null;
    }

    try {
      const bibleContent = fs.readFileSync(biblePath, "utf8");
      const bibleData = JSON.parse(bibleContent);
      if (bibleData && bibleData.verses) {
        bibleCache.set(cacheKey, bibleData);
        return bibleData;
      }
      console.error(`Invalid bible data structure in file: ${biblePath}`);
      return null;
    } catch (error) {
      console.error(`Error loading or parsing bible file: ${biblePath}`, error);
      return null;
    }
  }

  /**
   * Handles the bible search request.
   * Searches through verses based on query parameters.
   */
  searchBible(req, res) {
    // Default to Amharic if no language/version is specified
    const {
      q,
      limit,
      book,
      testament,
      lang = "amharic",
      version = "haile-selassie-1961",
    } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const bibleData = this.loadBible(lang, version);

    if (!bibleData) {
      return res.status(404).json({
        error: `Bible version not found for language: '${lang}' and version: '${version}'`,
      });
    }

    const maxResults = limit ? parseInt(limit, 10) : Infinity;
    const results = [];
    const lowerCaseQuery = q.toLowerCase();
    const lowerCaseBook = book ? book.toLowerCase() : null;
    const lowerCaseTestament = testament ? testament.toLowerCase() : null;

    for (const verse of bibleData.verses) {
      if (results.length >= maxResults) {
        break;
      }

      // 1. Testament filter (fastest check)
      if (lowerCaseTestament) {
        const verseTestament = getTestamentByBookNumber(verse.book);
        if (verseTestament !== lowerCaseTestament) {
          continue;
        }
      }

      // 2. Book filter
      if (lowerCaseBook && !verse.book_name.toLowerCase().includes(lowerCaseBook)) {
        continue;
      }

      // 3. Search query filter (most expensive check)
      if (verse.text.toLowerCase().includes(lowerCaseQuery)) {
        results.push({
          book: verse.book_name,
          chapter: verse.chapter,
          verse: verse.verse,
          text: verse.text,
        });
      }
    }

    res.json({
      query: q,
      language: lang,
      version: version,
      book: book || "all",
      testament: testament || "all",
      total: results.length,
      results,
    });
  }
}

module.exports = new SearchController();

const fs = require("fs");
const path = require("path");

const booksDir = path.join(__dirname, "../data/books");

function getAllBooks() {
  return fs.readdirSync(booksDir).map((file) => {
    const data = JSON.parse(fs.readFileSync(path.join(booksDir, file), "utf8"));

    return {
      title: data.title,
      abbv: data.abbv,
      chapters: data.chapters.length,
    };
  });
}

function getBookByName(bookParam) {
  const book = decodeURIComponent(bookParam).trim();

  const files = fs.readdirSync(booksDir);

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(booksDir, file), "utf8"));

    if (data.abbv === book || data.title === book) {
      return data;
    }
  }

  return null;
}

module.exports = {
  getAllBooks,
  getBookByName,
};

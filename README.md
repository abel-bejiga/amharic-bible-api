# Open Amharic Bible API

**URL:** [https://openamharicbible.vercel.app](https://openamharicbible.vercel.app)

A RESTful API providing access to the full Amharic Holy Bible in structured JSON format. Each book is served as JSON with chapters and verses. Perfect for developers, researchers, or enthusiasts building apps, websites, or educational projects.

---

Perfect for:

* Bible apps 📱
* Church websites ⛪
* Study tools 📚
* Language and text projects 🇪🇹

---

## Live Demo

Visit: [https://openamharicbible.vercel.app](https://openamharicbible.vercel.app)
Landing page includes instructions, usage examples, and quick links to all endpoints.

---

## 🌟 Features

* ✅ Full Amharic Bible support
* ✅ One JSON file per book
* ✅ Clean REST API structure
* ✅ Easy to add new books (other languages, e.g., Afaan Oromo)
* ✅ No database required
* ✅ Unicode-safe (Amharic URLs work)
* ✅ Full-text search with optional limit
* ✅ Search by testament (old/new)
* ✅ Book abbreviation routing supported

---

## 📞 Project Structure

```
amharic-bible-api/
│
├── data/
│   └── books/
│       ├── ኦሪት ዘፍጥረት.json
│       ├── ኦሪት ዘጸአት.json
│       └── ...
│
├── controllers/
│   └── bible.controller.js
│
├── routes/
│   └── bible.routes.js
│
├── utils/
│   ├── bookLoader.js
│   └── getTestament.js
│
├── config/
│   └── testamentMap.js
│
├── app.js
└── package.json
```

---

## 📚 Data Format (Per Book)

Example: `ኦሪት ዘፍጥረት.json`

```json
{
  "title": "ኦሪት ዘፍጥረት",
  "abbv": "ዘፍ",
  "chapters": [
    {
      "chapter": "1",
      "title": "",
      "verses": [
        "በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።"
      ]
    }
  ]
}
```

---

## 🚀 Getting Started

### 1️⃣ Clone the project

```bash
git clone https://github.com/misikirAyu/amharic-bible-api.git
cd amharic-bible-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
node app.js
```

Server runs at:

```
http://localhost:3000
```

---

## API Usage

### List all books

```
GET /api/am/books
```

```
curl https://openamharicbible.vercel.app/api/am/books
```

---

### Get all chapters of a book

```
GET /api/am/books/:book/chapters
```

*Example:* `/api/am/books/ኦሪት ዘፍጥረት/chapters`

```
curl https://openamharicbible.vercel.app/api/am/books/ዘፍ/chapters
```

---

### Get a specific chapter

```
GET /api/am/books/:book/chapters/:chapter
```

*Example:* `/api/am/books/ኦሪት ዘፍጥረት/chapters/1`

```
curl https://openamharicbible.vercel.app/api/am/books/ዘፍ/chapters/1
```

---

### Get a single verse

```
GET /api/am/books/:book/chapters/:chapter/:verse
```

*Example:* `/api/am/books/ኦሪት ዘፍጥረት/chapters/1/1`

```
curl https://openamharicbible.vercel.app/api/am/books/ዘፍ/chapters/1/1
```

---

### Search the Bible

```
GET /api/am/search?q=<keyword>
```

*Example:* Search for "እግዚአብሔር"

```
curl "https://openamharicbible.vercel.app/api/am/search?q=እግዚአብሔር"
```

* Limit results:

```
GET /api/am/search?q=<keyword>&limit=5
```

* Search in a specific book:

```
GET /api/am/search?q=<keyword>&book=ዘፍ
```

* Search by testament:

```
GET /api/am/search?q=<keyword>&testament=new
GET /api/am/search?q=<keyword>&testament=old
```

```
curl "https://openamharicbible.vercel.app/api/am/search?q=እግዚአብሔር&testament=new"
```

---

### Book Name Formats

You can use either **full titles** or **abbreviations**:

```
GET /api/am/books/ኦሪት ዘፍጥረት/chapters/1/4
GET /api/am/books/ዘፍ/chapters/1/4
```

---

## 🧠 Design Philosophy

* **Data-first**: Bible files stay untouched
* **Simple logic**: no unnecessary abstractions
* **Scalable**: add books by dropping JSON files
* **Readable**: clean code, clear folder structure

---

## 🛠 Future Improvements

* 🔍 Enhance full-text search
* 🌍 Add more languages (Oromo, Tigrinya, etc.)
* ⚡ Implement caching
* 🗃 Optional database backend (MongoDB/PostgreSQL)
* 📦 API versioning
* 💡 Interactive landing page features

---

## 🤝 Contributing

* Add missing books (other languages)
* Improve documentation
* Optimize performance
* Add new API features

Fork the repo and open a pull request.

---

## 📜 License

MIT License – Free to use, modify, and distribute.

---

## ❤️ Built for the Community

Made with love for Amharic readers, developers, and learners.

If you build something with this API, that’s already a win.

*misikir ayu, Dec 21, 2025*

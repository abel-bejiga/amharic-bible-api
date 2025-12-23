module.exports = {
  title: "Amharic Bible API",
  description: "REST API for accessing the Amharic Holy Bible",
  baseUrl: "/api/am",
  endpoints: [
    {
      group: "Core",
      description: "List all books",
      method: "GET",
      path: "/books",
    },
    {
      group: "Core",
      description: "List chapters of a book",
      method: "GET",
      path: "/books/:book/chapters",
    },
    {
      group: "Core",
      description: "Get a specific chapter",
      method: "GET",
      path: "/books/:book/chapters/:chapter",
    },
    {
      group: "Core",
      description: "Get a single verse",
      method: "GET",
      path: "/books/:book/chapters/:chapter/:verse",
    },
    {
      group: "Search",
      description: "Search entire Bible",
      method: "GET",
      path: "/search?q=እግዚአብሔር",
    },
    {
      group: "Search",
      description: "Limit search results",
      method: "GET",
      path: "/search?q=እግዚአብሔር&limit=5",
    },
    {
      group: "Search",
      description: "Search inside a book",
      method: "GET",
      path: "/search?q=መጀመሪያ&book=ዘፍ",
    },
  ],
};

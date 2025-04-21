const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  if (req.method === "GET") {
    const jsonPath = path.join(__dirname, "..", "data", "simpsons.json");

    fs.readFile(jsonPath, "utf8", (err, data) => {
      if (err) {
        res.status(500).json({ error: "Failed to read data file" });
        return;
      }
      try {
        const items = JSON.parse(data);
        res.status(200).json(items);
      } catch (parseErr) {
        res.status(500).json({ error: "Failed to parse JSON data" });
      }
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

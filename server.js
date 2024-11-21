const express = require("express");
const cors = require("cors"); // Import the cors middleware
const { main } = require("./azureAi");

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const result = await main(userMessage);
    res.json({ reply: result });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  const responseElement = document.getElementById("response");

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }), // Ensure the body is a JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    responseElement.textContent = data.reply;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    responseElement.textContent = "Error: " + error.message;
  }
}

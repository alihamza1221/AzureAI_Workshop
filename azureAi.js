const { AzureOpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

async function main(userMessage = "something you can provide") {
  // You will need to set these environment variables or edit the following values
  const endpoint =
    process.env["AZURE_OPENAI_ENDPOINT"] ||
    "https://completionssdf.openai.azure.com/";
  const apiKey =
    process.env["AZURE_OPENAI_API_KEY"] || "<REPLACE_WITH_YOUR_KEY_VALUE_HERE>";
  const apiVersion = "2024-05-01-preview";
  const deployment = process.env.DEPLOYMENT_NAME || "gpt-35-turbo";

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const result = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI assistant that helps people find information.",
      },
      { role: "user", content: userMessage },
    ],
    max_tokens: 800,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null,
  });

  return result.choices[0].message.content;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

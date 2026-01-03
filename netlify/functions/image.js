const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const ua = event.headers["user-agent"] || "";

  // ŚCIEŻKI
  const imagePath = path.join(__dirname, "../../public/preview.jpg");
  const htmlPath = path.join(__dirname, "../../public/index.html");

  // DISCORD BOT → DIRECT IMAGE
  if (ua.includes("Discordbot")) {
    const imageBuffer = fs.readFileSync(imagePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000"
      },
      body: imageBuffer.toString("base64"),
      isBase64Encoded: true
    };
  }

  // NORMALNA PRZEGLĄDARKA → HTML
  const html = fs.readFileSync(htmlPath, "utf8");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    },
    body: html
  };
};

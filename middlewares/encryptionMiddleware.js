const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET_KEY; // Must be 32 bytes

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

const encryptionMiddleware = (req, res, next) => {
  res.encryptResponse = (data) => {
    const jsonData = JSON.stringify(data);
    const encryptedData = encrypt(jsonData);
    res.json({ encrypted: encryptedData });
  };
  next();
};

module.exports = encryptionMiddleware;

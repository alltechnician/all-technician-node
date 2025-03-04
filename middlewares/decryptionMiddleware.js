const crypto = require("crypto");
const multer = require("multer");
const responseHandler = require("../utils/responseHandler");

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET_KEY; // Must be 32 bytes

const decrypt = (text) => {
  try {
    const [ivHex, encryptedText] = text.split(":");
    if (!ivHex || !encryptedText) throw new Error("Invalid encrypted data");

    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedText, "hex");
    const key = Buffer.from(secretKey);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted); // Convert back to JSON
  } catch (error) {
    throw new Error("Invalid or Malformed Encrypted Data");
  }
};

// Multer setup to handle FormData
const upload = multer();

const decryptionMiddleware = (req, res, next) => {
  if (req.is("multipart/form-data")) {
    upload.none()(req, res, (err) => {
      if (err) return responseHandler.forbidden(res, "Invalid FormData");
    
      try {
        if (req.body.encrypted) {
          console.log("🔒 Encrypted FormData Received:", req.body.encrypted);
          req.body = decrypt(req.body.encrypted);
          console.log("✅ Decrypted FormData:", req.body);
        }
      } catch (error) {
        return responseHandler.forbidden(res,"Invalid encrypted request" );
      }

      next();
    });
  } else {
    try {
      if (req.rawBody) {
        console.log("🔒 Encrypted JSON Received:", req.rawBody);
        req.body = decrypt(req.rawBody);
        console.log("✅ Decrypted JSON:", req.body);
      }
      next();
    } catch (error) {
      return responseHandler.forbidden(res,"Invalid encrypted request" );
    }
  }
};

module.exports = decryptionMiddleware;

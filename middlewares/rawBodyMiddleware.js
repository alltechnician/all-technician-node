const rawBodyMiddleware = (req, res, next) => {
    req.rawBody = "";
    req.on("data", (chunk) => {
      req.rawBody += chunk;
    });
    req.on("end", () => {
      console.log("🔒 Received Raw Body:", req.rawBody);
      next();
    });
  };
  
  module.exports = rawBodyMiddleware;
  
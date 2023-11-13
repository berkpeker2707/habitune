import rateLimit from "express-rate-limit";

//rate limitter (10 requests per 60 minutes)
const lowLimitter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default lowLimitter;

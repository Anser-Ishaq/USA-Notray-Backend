// middlewares/corsMiddleware.js
const cors = require("cors");

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://usa-frontend.netlify.app",
//   "https://usa-editor.netlify.app",
//   "http://localhost:5174",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("Origin:", origin);
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//   allowedHeaders: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const corsOptions = {
  origin: "*", // Allow all domains
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: "*", // Allow all headers
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = cors(corsOptions);

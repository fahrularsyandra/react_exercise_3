const transactionRoute = require("express").Router();
const AuthController = require("../controllers/AuthController");
const TransactionController = require("../controllers/TransactionController");
const { verifyToken } = require("../helpers/jwt");
const authentication = (req, res, next) => {
  const access_token = req.headers.access_token;
  if (access_token) {
    try {
      const token = verifyToken(access_token);
      req.headers.userData = token;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Token not autenticated!",
      });
    }
  } else {
    res.status(404).json({
      message: "Access token not found!",
    });
  }
};
// transactionRoute.get('/', (req, res) => res.send('Hello !'))
transactionRoute.get("/", AuthController.authentication, TransactionController.get);
transactionRoute.get("/:id", AuthController.authentication, TransactionController.delete);
transactionRoute.post("/", AuthController.authentication, TransactionController.create);

module.exports = transactionRoute;

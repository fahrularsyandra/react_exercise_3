const debtRoute = require("express").Router();
const AuthController = require("../controllers/AuthController");
const DebtController = require("../controllers/DebtController");
const { verifyToken } = require("../helpers/jwt");

// debtRoute.get('/', (req, res) => res.send('Hello !'))

// const authentication = (req, res, next) => {
//   const access_token = req.headers.access_token;
//   if (access_token) {
//     try {
//       const token = verifyToken(access_token);
//       req.headers.userData = token;
//       next();
//     } catch (error) {
//       res.status(401).json({
//         message: "Token not autenticated!",
//       });
//     }
//   } else {
//     res.status(404).json({
//       message: "Access token not found!",
//     });
//   }
// };
debtRoute.get("/", AuthController.authentication, DebtController.get);
debtRoute.post("/", AuthController.authentication, DebtController.create);
debtRoute.get("/:id", AuthController.authentication, DebtController.delete);

module.exports = debtRoute;

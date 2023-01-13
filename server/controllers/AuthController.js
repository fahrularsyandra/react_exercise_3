const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

class AuthController {
  static authentication = async (req, res, next) => {
    const access_token = req.headers.access_token;

    if (access_token) {
      try {
        const token = verifyToken(access_token);
        const user = await User.findOne({
          where: {
            username: token.username,
          },
        });
        if (user) {
          req.headers.user_id = user.id;
          next();
        } else {
          res.status(401).json({
            message: "There is something wrong!",
          });
        }
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
}

module.exports = AuthController;

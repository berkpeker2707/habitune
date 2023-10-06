const jwt = require("jsonwebtoken");
require("dotenv").config();
import User from "../user/user.model";
import Logger from "./logger";

interface idecoded {
  user: {
    _id: number;
    id: number;
    firstName: string;
    email: string;
    image: string;
    habits: [];
    friends: [];
  };
}

const verifyToken = async (req: any, res: any, next: any) => {
  try {
    var jwtS = process.env.JWT_SECRET;

    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1];
    const decoded: idecoded = jwt.verify(token, jwtS);

    if (!decoded) {
      return res.json({ message: "Unauthorized!" });
    }

    const user = await User.find({ email: decoded.user.email });
    req.user = user;

    next();
  } catch (error) {
    Logger.error(error);
    res.json(error);
  }
};

export default verifyToken;

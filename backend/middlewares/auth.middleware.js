// import jwt from 'jsonwebtoken';
// import { User } from '../models/User.js';

// export const protect = async (req, res, next) => {
//   let token = req.headers.authorization?.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Not authorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token failed' });
//   }
// };

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const Authenticated = async (req, res, next) => {
  try {
    // const token = req.header("Authorization")?.split(" ")[1]; //
    let token = req.header("Authorization");
    // let token = req.headers["Authorization"]
    if (token?.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login First",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded:-",decoded)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

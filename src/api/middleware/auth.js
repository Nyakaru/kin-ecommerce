//@ts-check
// define helpers for auth
import jwt from "jsonwebtoken";

require('dotenv').config()

const SECRET_KEY = process.env.JWT_SECRET_KEY || "somethingveryrandomnaround";

/**
 * @param {string} email
 */
const createToken = ( email ) => {
    return jwt.sign({ email: email}, SECRET_KEY, {expiresIn : "3h"})
};

/**
 * @param {{ headers: { authorization: string; }; userData: string | object; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string; }): any; new (): any; }; }; }} res
 */
const authHelper = ( req, res ) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
  });
  }
}


/**
 * @param {{ headers: { authorization: string; }; userData: string | object; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string; }): any; new (): any; }; }; }} res
 * @param {() => void} next
 */
const checkAuth = (req, res, next) => {
      req.userData = authHelper(req, res);
      next();
  };

/**
 * @param {{ headers: { authorization: string; }; userData: string | object; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string; }): any; new (): any; }; }; }} res
 */
const getUser = (req, res) => {
    return authHelper(req, res)
}
export { createToken, checkAuth, getUser };

//@ts-check
// define helpers for auth
import jwt from "jsonwebtoken";

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
 * @param {() => void} next
 */
const checkAuth = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRET_KEY)
      req.userData = decoded;
      next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
  };

/**
 * @param {{ headers: { authorization: string; }; }} req
 */
const getUser = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    console.log({ error: error})
  }
}
export { createToken, checkAuth, getUser };

//@ts-check
// methods for routes
import bcrypt from "bcrypt";

import User from "./models";
import { createToken } from "../middleware/auth";

/**
 * @param {{ body: { email: any; password: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message?: string; status?: boolean; data?: any; error?: any; }): void; new (): any; }; }; }} res
 */
const signUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await User.find({ email: email });
  if (existingUser.length >=1 ) {
    return res.status(409).json({
      message: "User with that email already exists",
    });
  }
  try {
    let hash = await bcrypt.hash(password, 5);
    const newUser = await User.create({ email: email, password: hash });
    res.status(201).json({
      status: true,
      data: newUser.email,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

/**
 * @param {{ body: { email: string; password: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string; token?: string; }): any; new (): any; }; }; }} res
 */
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.find({ email: email });
  if (user.length < 1) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }
  try {
    // @ts-ignore
    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }
    const token = createToken(email);
    return res.status(200).json({
      message: "Auth successful",
      token: token,
    });
  } catch (error) {}
};

export { signUp, login };

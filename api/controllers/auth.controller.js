import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; //import it here for the password hashing function to work in node
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(
      errorHandler(400, "all fields are  required, check your input fields ")
    );
  }

  const hashedPassword = bcryptjs.hashSync(password, 10); // rounds 10, and has its wait called async

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePicture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  });

  try {
    await newUser.save();
    res.json({ message: "sign up successful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = Jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRETE,
      { expiresIn: "365d" } // Token will expire in 365 days
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = Jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRETE,
        { expiresIn: "365d" } // Token will expire in 365 days
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
        })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture:
          googlePhotoUrl ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      });
      await newUser.save();
      const token = Jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRETE,
        { expiresIn: "365d" } // Token will expire in 365 days
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

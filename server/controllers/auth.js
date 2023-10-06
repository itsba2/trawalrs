import User from "../models/User.js";

export const registerUser = (req, res) => {
  try {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (error, newUser) => {
      if (error) throw new Error(error);
      const user = {
        _id: newUser._id,
        username: newUser.username,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };
      res.status(201).json({ user });
    });
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const loginUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(401).json({ message: "Failed to login. Try again." });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Successfully logged out" });
};

export const checkUser = (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

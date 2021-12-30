import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    // save new user
    const savedUser = await newUser.save();
    res.status(201).json(savedUser._id);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const validUser = await User.findOne({ username: req.body.username });
    !validUser && res.status(400).json('Invalid username or password');

    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    !validPassword && res.status(400).json('Invalid username or password');

    res.status(200).json({ _id: validUser._id, username: validUser.username });
  } catch (error) {
    res.status(500);
  }
};

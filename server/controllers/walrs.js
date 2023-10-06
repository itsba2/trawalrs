import Walr from "../models/Walr.js";

const cwd = process.cwd();
const publicPath = cwd + "\\public\\";

export const addNewWalr = async (req, res) => {
  try {
    const { title, desc, rating, lat, lng } = req.body;
    const username = req.user.username;
    let photo = {},
      photoName = "";
    if (req.files) {
      photo = req.files["photo[]"];
    }

    // Give the photo a user specific name
    // instead of their upload names
    if (Object.keys(photo).length) {
      photoName = `${username}_${Date.now()}.${photo.name.split(".").pop()}`;
    }

    const newWalr = new Walr({
      username,
      title,
      desc,
      rating,
      photo: photoName,
      lat,
      lng,
    });

    // Save new Walr to DB
    const savedWalr = await newWalr.save();

    // If there is any photo
    if (Object.keys(photo).length) {
      const photoPath = publicPath + photoName;
      // Move the photo to /public directory
      photo.mv(photoPath, (error) => {
        if (error) {
          console.error(error);
          return;
        }
      });
    }

    res.status(201).json({ message: "New Walr saved", savedWalr });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

export const getWalrs = async (req, res) => {
  try {
    const username = req.user.username;
    const allWalrs = await Walr.find({ username });
    res.status(200).json(allWalrs);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const getWalrImages = (req, res) => {
  try {
    const { photo } = req.query;
    res.status(200).sendFile(publicPath + photo);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const deleteWalr = async (req, res) => {
  try {
    const { id } = req.params;
    await Walr.findByIdAndDelete(id);
    res.status(204).json({ message: "Walr deleted" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

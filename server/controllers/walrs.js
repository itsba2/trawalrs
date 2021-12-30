import Walr from '../models/Walr.js';

export const addNewWalr = async (req, res) => {
  const newWalr = new Walr(req.body);
  try {
    const savedWalr = await newWalr.save();
    res.status(201).json(savedWalr);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

export const getWalrs = async (req, res) => {
  try {
    const allWalrs = await Walr.find();
    res.status(200).json(allWalrs);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deleteWalr = async (req, res) => {
  try {
    const { id } = req.params;
    await Walr.findByIdAndDelete(id);
    res.status(204).json({message: 'Walr deleted'})
  } catch (error) {
    res.status(404).json(error);
  }
};

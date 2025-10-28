import Creator from "../models/Creator.js";

export const getCreators = async (req, res) => {
  const creators = await Creator.find();
  res.json(creators);
};

export const getCreatorById = async (req, res) => {
  const creator = await Creator.findById(req.params.id);
  res.json(creator);
};

export const addCreator = async (req, res) => {
  const creator = await Creator.create(req.body);
  res.status(201).json(creator);
};

export const updateCreator = async (req, res) => {
  const updated = await Creator.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteCreator = async (req, res) => {
  await Creator.findByIdAndDelete(req.params.id);
  res.json({ message: "Creator deleted successfully" });
};

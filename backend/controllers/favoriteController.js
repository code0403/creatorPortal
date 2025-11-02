import User from "../models/User.js";
import Creator from "../models/Creator.js";
import { sendEmail } from "../utils/sendEmail.js";

export const addToFavorites = async (req, res) => {
  try {

    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: user not logged in" });
    }
    const { creatorId } = req.body;
    if (!creatorId) {
      return res.status(400).json({ message: "Creator ID is required" });
    }

    const creator = await Creator.findById(creatorId);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    const user = await User.findById(userId);
    if (!user.favorites.includes(creatorId)) {
      user.favorites.push(creatorId);
      await user.save();
    }

    console.log(`🤍 ${creator}`);

    if (creator.email) {
      console.log("Sending email...");
      const subject = "You were added to favorites!";
      const html = `
        <h2>Hi ${creator.name},</h2>
        <p>Good news! <strong>${user.name}</strong> has added you to their favorites on <b>Creator Portal</b>.</p>
        <p>Keep inspiring others!</p>
        <br />
        <p>– Creator Portal Team</p>
      `;
      await sendEmail(creator.email, subject, html);
    }

    // console.log(
    //   `Notification: {creator.name} was added to favorites by ${user.name}`
    // );

    res.json({
      success: true,
      message: "Creator added to favorites successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    console.log("add to favorites:", error);
    res.status(500).json({ message: "Failed to add to favorites" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    // console.log("📩 Fetching favorites for user:", req.user?.id); 
    // Get the user's favorite creators only
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (error) {
    console.log("getFavorites error", error);
    res.status(500).json({ message: "Failed to get favorites" });
  }
};


export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { creatorId } = req.body;

    if (!userId || !creatorId) {
      return res.status(400).json({ message: "User ID and Creator ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== creatorId.toString()
    );

    await user.save();

    console.log(`🗑️ ${creatorId} removed from favorites by ${user.name}`);

    res.json({
      success: true,
      message: "Creator removed from favorites successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("removeFromFavorites error:", error);
    res.status(500).json({ message: "Failed to remove from favorites" });
  }
};


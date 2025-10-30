import User from "../models/User.js"


export const getRecentLogins = async(req, res) => {
    try {
        const users = await User.find({lastLogin : {$exists :true}}).sort({lastLogin : -1}).limit(5).select("name email lastLogin");
        res.json(users)
    } catch (error) {
        console.log(error);  

        res.status(500).json({message : error.message})
    }
}
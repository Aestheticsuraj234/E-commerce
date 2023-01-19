import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Invalid request method" });
    }
    const { email, role } = req.body;
    if (!email || !role) {
        return res.status(400).json({ error: "Invalid request body" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.role = role;
        await user.save();
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default connectDb(handler);

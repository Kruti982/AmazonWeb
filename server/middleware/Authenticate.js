const jwt = require("jsonwebtoken");
const User = require("../user/UserSchema");
const keysecret = process.env.KEY;

const authenicate = async (req, res, next) => {
  try {
    const token = req.cookies.AmazonWeb;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const verifyToken = jwt.verify(token, keysecret);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authenicate;


const User = require("../models/user")
const {setUser} = require("../service/auth")

async function userSignup (req, res) {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.end("All fields are required.");
    await User.create({
        name, email, password
    });

    return res.redirect("/");
}

async function userLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    // console.log("user", user)
    if(!user) return res.render('login', {
        error: "Invalid username or password",
    });

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/")
}

module.exports = {
    userSignup,
    userLogin
}
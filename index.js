const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser")
const {dbConnection} = require("./connection")
const URL = require("./models/url")
const {restrictToLoggedUserOnly, checkAuth} = require("./middleware/auth")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const PORT = 8000;

const app = express();

dbConnection("mongodb://127.0.0.1:27017/url-shortner")

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.use("/url", restrictToLoggedUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    if (!shortId) return res.status(400).json({ error: "the short id is invalid"});
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            },
        }
    );
    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
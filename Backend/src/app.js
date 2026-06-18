const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const authRoutes = require('../src/routes/auth.routes.js')
const serviceRoute = require('./routes/interview.routes.js')

const app = express();
app.use(cookieParser()) 
app.use(cors({
    origin: "https://gen-ai-analyser-nwas.vercel.app", // Aapke frontend ka exact URL (last me '/' mat lagana)
    credentials: true,               // Cookies aur headers allow karne ke liye yeh ZAROORI hai
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())



app.use("/api/auth",authRoutes)
app.use("/api/service",serviceRoute)
app.get('/test', (req, res) => {
    console.log("this is for testing"); // Yeh terminal/cmd me dikhega
    res.send("Hello! Server is working properly."); // Yeh browser me dikhega
});

module.exports = app
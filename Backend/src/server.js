const app = require("../src/app.js")
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);// Cloudflare DNS

const dbConnect = require("../src/config/database.js")
const env = require("dotenv")
env.config();

dbConnect()

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+process.env.PORT)
})

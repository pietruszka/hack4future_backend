const bodyParser = require("body-parser");
const cors = require("cors");
const Router = require("express").Router;
const db = require("./data/db");

class Middleware {
    constructor() {
        this.router = Router();
        this.router.use(bodyParser.json({
            limit: "100kb",
            type: "application/json",
        }));
        this.router.use(cors());
        db;
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Middleware;
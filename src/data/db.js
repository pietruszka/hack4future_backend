const mongoose = require("mongoose");
const config = require("./config");
const UserModel = require("./models/user");
const EventModel = require("./models/event");

class DB {
    constructor() {
        this.init();
    }
    getConnection() {
        return this.connection;
    }
    init() {
        this.connection = mongoose.createConnection(config.DB_URL, {
            auth: {
                password: config.DB_URL_AUTH.PASSWORD,
                user: config.DB_URL_AUTH.USER,
            },
        });
        this.connection.setMaxListeners(0);

        this.connection.on("open", () => {
            console.log("info", "Connected to DB");
    });
        this.connection.on("disconnected", () => {
            console.log("info", "Disconnected from DB");
    });
        this.connection.on("error", () => {
            console.log("error", "DB connection error");
    });
        mongoose.Promise = global.Promise;

        this.loadSchame();
    }
    loadSchame() {
        this.userModel = new UserModel(this.connection).getModel();
        this.eventModel = new EventModel(this.connection).getModel();
    }
}

module.exports = new DB();

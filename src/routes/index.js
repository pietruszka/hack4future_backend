const Router = require("express").Router;
const AuthRoute = require("./auth");
const UserRoute = require("./user");
const EventRouter = require("./events");

class Routes {
    constructor() {
        this.router = Router();
        this.router.use(new AuthRoute().getRouter());
        this.router.use(new UserRoute().getRouter());
        this.router.use(new EventRouter().getRouter());
    }
    getRouter() {
        return this.router;
    }
}

module.exports = Routes;
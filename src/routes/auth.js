const Router = require("express").Router;
const User = (require("./../data/db").getConnection()).model("User");

class AuthRoute {
    constructor() {
        this.router = Router();
        this.router.post('/api/login', (req, res) => {
            if(req.body.email && req.body.password) {
                User.findOne({email: req.body.email, password: req.body.password}, (err, result) => {
                    if(result) res.send("ok");
                    else res.send("nok");
                })
            }
        })
    }
    getRouter() {
        return this.router;
    }
}

module.exports = AuthRoute;
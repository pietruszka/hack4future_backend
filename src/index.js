const express = require("express");
const Middleware = require("./middleware");
const Routes = require("./routes/index.js");
const config = require("./data/config");
let StateMachine = require("./SM");

class Application {
    constructor() {
        this.app = express();
        this.app.use(new Middleware().getRouter());
        this.app.use(new Routes().getRouter());
        this.app.listen(config.PORT, () => {
            console.log("info", `Server started on port ${config.PORT}`);
        });

        setInterval(()=>{
            //StateMachine.getFBEvent()
            StateMachine.getCrossWebEvents();
            //StateMachine.extractTags();
        },5*1*1000);
    }


}


module.exports = Application;
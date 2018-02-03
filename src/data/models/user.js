const mongoose = require("mongoose");


class UserModel {
    constructor(connection) {
        this.model = connection.model("User", this._userModel(), "UserSkillBase");
    }
    getModel() {
        return this.model;
    }

    _userModel() {
        return new mongoose.Schema({
            email: String,
            password: String,
            skills : [{
                name: String,
                value: String,
                _id: false,
            }],
            role: String,
        });
    }
}

module.exports = UserModel;
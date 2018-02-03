const mongoose = require("mongoose");

class BoardsModel {
    constructor(connection) {
        this.model = connection.model("Boards", this._boardsModel(), "BoardsSkillBase");
    }
    getModel() {
        return this.model;
    }

    _boardsModel() {
        return new mongoose.Schema({
            name: String,
            category: [{
                url: String,
                title: String,
                _id: false,
            }]
        });
    }
}

module.exports = BoardsModel;
const mongoose = require("mongoose");

class EventModel {
    constructor(connection) {
        this.model = connection.model("Event", this._eventModel(), "EventSkillBase");
    }
    getModel() {
        return this.model;
    }

    _eventModel() {
        return new mongoose.Schema({
            id: String,
            tags: [String],
            name: String,
            description: String,
            place: String,
            start: String,
            end: String,
        });
    }
}

module.exports = EventModel;
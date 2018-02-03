const request = require("request");
class FBcrawler {
    constructor() {

    }
    getEventsFromTag(tag, cb) {
        request.get(`https://graph.facebook.com/search?q=${tag}&type=event&access_token=EAAcY40WZCZA6MBAIiodfZAjvlLXNMQWcRtiRXnhnHOZCgUxdlXZBvznmF5ikxYp3C2so8FMCTZAua4rPhjiR8fXbU0r5pqYmezsS7VMfQUVgQhWDSxlvjiLIh7A3ZC9ZCq6JVmGE2cGVi3L2UmCTKb9mhEECAadeCrXhamL8eLKQjwZDZD`, (err, response, body) => {
            let jsonBody = JSON.parse(body);
            //console.log('22', jsonBody, tag);
            setTimeout(()=> {
                cb(null, jsonBody)
            }, 30000)
            // jsonBody.data.forEach(element => {
            //     const {description, name} = element;
            //     //console.log(element)
            //     let _event = new Event({
            //         name,
            //         description,
            //     })
            //     _event.save((err, result) => {
            //         Organisation.findByIdAndUpdate(organisationID, {$addToSet: {events: new mongoose.mongo.ObjectId(result._id)}}, (err, rezult) => {
            //
            //             resolve({success: true, message: "Created event"})
            //         });
            //     })
            // })
        })
    }
}

module.exports = new FBcrawler();
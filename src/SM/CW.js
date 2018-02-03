const request = require("request");
class CWcrawler {
    constructor() {

    }
    getEventsList(cb) {
        request.get(`https://crossweb.pl/wydarzenia/wroclaw/`, (err, response, body) => {
            //let jsonBody = JSON.parse(body);
            //console.log('22', jsonBody, tag);
            setTimeout(()=>{
                cb(null, body)
            },3000);
        })
    }

    getDetailedEvents(path, cb) {
        request.get(path, (err, response, body) => {
            //let jsonBody = JSON.parse(body);
            //console.log('22', jsonBody, tag);
            cb(null, body)
        })
    }
}

module.exports = new CWcrawler();
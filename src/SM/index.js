const async = require("async");
const cheerio = require("cheerio");
const natural = require("natural");
const request = require("request");
const _ = require("lodash");
const dictionary = require("./dictionary");
const User = (require("./../data/db").getConnection()).model("User");
const Event = (require("./../data/db").getConnection()).model("Event");

let FB = require("./FB");
let CW = require("./CW");


const getFBEvent = () => {
    let skills = ["java", "css", 'php', 'angular', 'react', 'c#', 'agile', 'objectivec',
    'scrum', 'golang', 'android', 'swift', 'consulting', 'vue', 'mongodb', 'recruitment', 'mysql',
    'administrative', 'business analysis', ];
    skills = skills.map(element => `wroclaw ${element}`);

    let eventTagsList = skills.map(element => {
        let _tempFN = (cb) => {
            FB.getEventsFromTag(element, cb);
        };
        return _tempFN;
    })

    async.parallelLimit(eventTagsList, 4, (err, results) => {
        let v = results;
        //console.log(results)
        let added = v.map(event => {
            let l;
            console.log(event,111)
            if(event.data) {
                l = (cb) => {
                    Event.findOne({id: event.data[0].id}, (err, result) => {
                        //console.log(event.data[0], 1344)
                        if(!result){
                            new Event({
                                description: event.data[0].description,
                                name: event.data[0].name,
                                id: event.data[0].id,
                                end: event.data[0].end_time,
                                start: event.data[0].start_time,
                                place: event.data[0].place.name,
                            }).save((err, result) => {
                                cb(null, true)
                            })
                        }else{
                            cb(null, true)
                        }
                    })
                };
            }else{
                l = (cb) => {
                    cb(null, true);
                }
            }

            return l;
        })
        async.series(added, (err, result) => console.log(result.length, err))

    })
};

const getCrossWebEventsList = () => {
    return new Promise((resolve, reject) => {
        CW.getEventsList((err, result) => {
            let $ = cheerio.load(result);
            let list = [];
                $('.brow').each((index, element)=> {
                let path = `https://crossweb.pl${$(element).attr('href')}`
                list.push(path);

            })
            resolve(list);
        })
    })
    //get list of events

};

const getDetailedCrossEvent = (pageList) => {
    return pageList.map(element => {
        return new Promise(async(resolve, reject) => {
            request.get(element, (err, response, body) => {
                //let jsonBody = JSON.parse(body);
                //console.log('22', jsonBody, tag);
                setTimeout(()=>{
                    resolve(body)
                },3000)
            })
        });
    })
};

const getCrossWebEvents = async () => {
    //get list of events
    let list = await getCrossWebEventsList();
    //console.log(list);
    let pages = await Promise.all(getDetailedCrossEvent(list));
    let v = [];
    pages.map((element,i) => {
        $ = cheerio.load(element);
        let content = $(`.event-var`,`div[itemscope]`).prev().prev() //$(`div[itemscope]`).children().next()
        let name = $(`.event-var`,`div[itemscope]`).eq(0).text().trim();
        let type = $(`.event-var`,`div[itemscope]`).eq(1).text().trim();
        let date = $(`.event-var`,`div[itemscope]`).eq(3).text().trim();
        let time = $(`.event-var`,`div[itemscope]`).eq(4).text().trim();
        let address = $(`.event-var`,`div[itemscope]`).eq(9).text().trim();
        let place = $(`.event-var`,`div[itemscope]`).eq(8).text().trim();
        let city = $(`.event-var`,`div[itemscope]`).eq(7).text().trim();
        let description = $(`.description .event-var`).text().trim();

        v.push({name, start: `${date} ${time}`, place: `${city} ${address} ${place}`, description, id:i});
    });
    v = v.map(element => {
        return (cb) => {
            Event.findOne({id:element.id}, (err, result) => {
                if(!result){
                    new Event({
                        name: element.name,
                        start: element.start,
                        place: element.place,
                        description: element.description,
                        id: element.id,
                    }).save((err, result) => {
                        cb(null, true);
                    })
                }else{
                    cb(null, true);
                }
            })

        };
    })
    async.series(v, (err, result) => {console.log('cw')})
};

const extractTags = () => {
    let _tags = [];
    Event.find({},(err, result) => {
        _tags = result.map((element, i) => {
            let _element = [];
            _element.push(..._.difference(element.name.split(" ")),dictionary.ignored);
            _element.push(..._.difference(element.description.split(" "),dictionary.ignored));
            _element = _.uniq(_element);
            console.log(_element);
        })
    })
};

module.exports = {
    getFBEvent,
    getCrossWebEvents,
    extractTags,
};
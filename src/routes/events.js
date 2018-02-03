const Router = require("express").Router;
const Event = (require("./../data/db").getConnection()).model("Event");

class EventRoute {
    constructor() {
        this.router = Router();
        this.router.get('/api/events', (req, res) => {
            Event.find({},(err, result)=> {
                res.status(200).json({
                    success: true,
                    data: result,
                })
            })
        });
        this.router.post('/api/events', (req, res) => {
            if(req.body.tags){
                // let RegExpList = req.body.tags.map(element=>new RegExp(element));
                // console.log(Reg)
                // Event.find({$or: [{name: {$in: RegExpList, $options: 'i'}},{description: {$in: RegExpList, $options: 'i'}}]}, (err, result) => {
                //     res.status(200).json({
                //         success: true,
                //         data: result,
                //     })
                // })
                let promiseList = req.body.tags.map(element => {
                    return new Promise((resolve, reject) => {
                        Event.find({$or: [{name: {$regex: element, $options: 'i'}},{description: {$regex: element, $options: 'i'}}]}, (err, result) => {
                            resolve(result);
                        })
                    })
                })
                Promise.all(promiseList).then(result=>{
                    res.status(200).json({
                        success: true,
                        data: result,
                    })
                })
            }
        })
    }
    getRouter() {
        return this.router;
    }
}

module.exports = EventRoute;
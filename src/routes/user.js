const Router = require("express").Router;
const User = (require("./../data/db").getConnection()).model("User");

class AuthRoute {
    constructor() {
        this.router = Router();
        this.router.post('/api/user/addSkill', (req, res) => {
            if(req.body.userID && req.body.value && req.body.name) {
                const {userID, value, name} = req.body;
                User.findById(userID, (err, result) => {
                    console.log(result)
                    if(result && result.skills === undefined) result.skills = [];
                    if(result && result.skills){
                        let skillsArray = result.skills;
                        if(skillsArray.length>0){

                            skillsArray = skillsArray.filter(element => {
                                if(element.name !== name) return true;
                                else return false;
                            })
                            skillsArray.push({name, value: Number(value)});
                        }else{
                            skillsArray = [{name, value: Number(value)}];
                        }

                        User.findByIdAndUpdate(userID, {$set: {skills: skillsArray}}, (err, result) => {
                            res.status(200).json({
                                success: true,
                                message: "Skill added",
                            });
                        })
                    }
                });

            }
        });

        this.router.post('/api/user/addSkill', (req, res) => {
            if(req.body.userID && req.body.value && req.body.name) {
                const {userID, value, name} = req.body;
                User.findById(userID, (err, result) => {
                    console.log(result)
                    if(result && result.skills === undefined) result.skills = [];
                    if(result && result.skills){
                        let skillsArray = result.skills;
                        if(skillsArray.length>0){

                            skillsArray = skillsArray.filter(element => {
                                if(element.name !== name) return true;
                                else return false;
                            })
                            skillsArray.push({name, value: Number(value)});
                        }else{
                            skillsArray = [{name, value: Number(value)}];
                        }

                        User.findByIdAndUpdate(userID, {$set: {skills: skillsArray}}, (err, result) => {
                            res.status(200).json({
                                success: true,
                                message: "Skill added",
                            });
                        })
                    }
                });

            }
        });


    }
    getRouter() {
        return this.router;
    }
}

module.exports = AuthRoute;
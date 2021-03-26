let generator = require('generate-password');
let nodeMailer = require ('nodemailer');

let member = require('../model/profile')
let login = require('../model/login')
let tree = require('../model/level')
let wallet = require('../model/wallet')
let admin = require('../model/admin')
let statement = require('../model/statement')
let querry = require('../model/query')

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/chaloonline");

module.exports={
    //      Level 1 active
    lvl1:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl1':{'name':name,'mobile':mid}}},(err)=>{
                    if(err) throw err
                    else{
                        this.lvl2(sponser,mid)
                    }
                })
            }
        })
    },
    //          Level 2 active
    lvl2:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl2':{'name':name,'mobile':mid}}},(err)=>{
                    if(err) throw err
                    else{
                        this.lvl3(sponser,mid)
                    }
                })
            }
        })
    },
    //  Upload form
    form:function(req,res){
        let id = req.body.id
        let gender = req.body.gender
        let marry = req.body.marital
        let income = req.body.income
        let occ = req.body.Occ
        let othOc= req.body.otherOcc
        let address = req.body.address
        let city = req.body.city
        let state = req.body.state
        let pincode = req.body.pincode
        let father = req.body.father
        let mother = req.body.mother
        let aadharNo = req.body.aadharNo
        let panNo = req.body.panNo
        let incomePType = req.body.incomeProofType
        let addressPType = req.body.addressProf
        let dob = req.body.dob
        member.updateOne({'id':id},{'Gender':gender,'motherName':mother,'fatherName':father,'occupation':occ,
            'maritalStatus':marry,'address':address,'city':city,'state':state,'pincode':pincode,'annualIncome':income,
            'OthOc':othOc,'aadharno':aadharNo,'panNo':panNo,'incomePType':incomePType,'addressPType':addressPType,
            'dob':dob,'formStat':true},(err)=>{
                if(err)throw err
                else{
                    res.json({'err':0,'msg':'Form Submitted'});
                }
            })
    },
    //          Activation code starts here
    actlvl1:function(req,res){
        let mobile = req.body.mobile
        let pkg = req.body.pkg
        let dispkg = pkg * 0.05
        
        member.findOne({'mobile':mobile},(err,data)=>{
            if(err) throw err
            else{
                let sponsor = data.sponserId
                let name = data.name
                let email = data.email
                let spnsorName = data.sponserName
                let id = data.id

                member.findOne({'id':sponsor},(err,data1)=>{
                    if(err) throw err
                    else{
                        let lvl = data1.lvlNo + 1
                        tree.findOne({'id':sponsor,'right':{$all:[1]}},(err,data2)=>{
                            console.log(data2)
                            if(err) throw err
                            else if(!data2 || data2.length == 0){
                                tree.updateOne({'id':sponsor},{$addToSet:{'right':{'lvlNo':1,'id':id,'name':name,'payout':'not Gen'}}},(err)=>{
                                    if(err) throw err
                                    else{
                                        member.updateOne({'id':id},{'parentId':sponsor,'lvlNo':lvl},(err)=>{
                                            if(err) throw err
                                            else{
                                                member.findOne({'id':'CO210000001'},(err,data3)=>{
                                                    if(err) throw err
                                                    else{
                                                        let cmpy = data3.cmpLvl
                                                        if(lvl > cmpy){
                                                            member.updateOne({'id':'CO210000001'},{'cmpLvl':lvl},(err)=>{
                                                                if(err) throw err
                                                                else{
                                                                    res.json({'err':0,'Msg':'Activated Successfully'});
                                                                }
                                                            })
                                                        }
                                                        else{
                                                            res.json({'err':0,'Msg':'Activated Successfully'});
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            else{
                                tree.findOne({'id':sponsor,'left':[{'lvlNo':1}]},(err,data3)=>{
                                    if(err) throw err
                                    else if(!data3 || data3.length == 0){
                                        tree.updateOne({'id':sponsor},{$addToSet:{'left':{'lvlNo':1,'id':id,'name':name,'payout':'not Gen'}}},(err)=>{
                                            if(err) throw err
                                            else{
                                                member.updateOne({'id':id},{'parentId':sponsor,'lvlNo':lvl},(err)=>{
                                                    if(err) throw err
                                                    else{
                                                        member.findOne({'id':'CO210000001'},(err,data4)=>{
                                                            if(err) throw err
                                                            else{
                                                                let cmpy = data4.cmpLvl
                                                                if(lvl > cmpy){
                                                                    member.updateOne({'id':'CO210000001'},{'cmpLvl':lvl},(err)=>{
                                                                        if(err) throw err
                                                                        else{
                                                                            res.json({'err':0,'Msg':'Activated Successfully'});
                                                                        }
                                                                    })
                                                                }
                                                                else{
                                                                    res.json({'err':0,'Msg':'Activated Successfully'});
                                                                }
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    else{
                                        member.findOne({'id':'CO210000001'},(err,data2)=>{
                                            if(err) throw err
                                            else{
                                                let cmpy = data2.cmpLvl
                                                let lv = lvl - 1
                                                tree.findOne({'id':sponsor,'right':{'lvlNo':1}},(err,data3)=>{
                                                    if(err) throw err
                                                    else{
                                                        console.log(data3)
                                                        // let ip = data
                                                        // for(var i = lv; i <= cmpy; i++){
                                                        //     tree.findOne({'id':ip,'right':{'lvlNo':1}},(err,data3)=>{
                                                        //         if(err) throw err
                                                        //         else{

                                                        //         }
                                                        //     })
                                                        // }      
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
}    
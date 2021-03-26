let member = require('../../modeldash/profile')

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/dashback",{userNewUrlParser: true});

let multer = require('multer');
let DIR =  '../../attach';
let storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,DIR);
    },
    filename:function(req,file,cb,n){
        var date = Date.now();
        var name = n
        cb(null,file.filename+'-'+name+'-'+date+'.'+file.originalname.split('.')[file.originalname.split('.').length-1])
    }
});
let aadhar = multer({storage:storage}).single('aadhar');
let pan = multer({storage:storage}).single('pan');
let photo = multer({storage:storage}).single('photo');
let aadharB = multer({storage:storage}).single('aadharBack');
let signature = multer({storage:storage}).single('sign');
let statment = multer({storage:storage}).single('statement');

module.exports = {
    // upload aadhar front

    // upload Form
    uploadForm:function(req,res){
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
    }
}
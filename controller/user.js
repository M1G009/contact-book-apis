const USER = require("../model/user")
const ADMIN = require("../model/admin")
const PHONE = require("../model/phonebook")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

// multyple auth

exports.multypleauth = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken
        const admintoken = req.headers.admintoken

        if(!usertoken && !admintoken){
            throw new Error ("plz send token")
        }

        if(usertoken){
            const checkusertoken = jwt.verify(usertoken , "SURAT")
            var checkuser = await USER.findById(checkusertoken.id)
        }else{
            const checkadmintoken = jwt.verify(admintoken , "SURAT")
            var checkadmin = await ADMIN.findById(checkadmintoken.id)
        }


        if(!checkuser && !checkadmin){
            throw new Error ("user not found")
        }
        next()
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

// user auth

exports.userauth = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken

        if(!usertoken){
            throw new Error ("plz send token")
        }

        const checkusertoken = jwt.verify(usertoken , "SURAT")
        const checkuser = await USER.findById(checkusertoken.id)

        if(!checkuser){
            throw new Error ("user not found")
        }
        next()
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

// admin auth

exports.adminauth = async function(req, res, next) {
    try {
        const admintoken = req.headers.admintoken

        if(!admintoken){
            throw new Error ("plz send token")
        }

        const checkadmintoken = jwt.verify(admintoken , "SURAT")
        const checkadmin = await ADMIN.findById(checkadmintoken.id)

        if(!checkadmin){
            throw new Error ("user not found")
        }
        next()
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

// user

exports.usersignup = async function(req, res, next) {
    try {

        req.body.password = await bcrypt.hash(req.body.password , 10)
        const data = await USER.create(req.body)

        var usertoken = jwt.sign({ id : data._id }, 'SURAT');

        res.status(201).json({
            status : "success",
            message : "data created successfully",
            data,
            token : usertoken
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.userlogin = async function(req, res, next) {
    try {
        const logindata = await USER.findOne({uname : req.body.uname})
        if(!logindata){
            throw new Error("invalid username")
        }
        const checkpassword = await bcrypt.compare(req.body.password , logindata.password)
        if(!checkpassword){
            throw new Error("invalid password")
        }

        var usertoken = jwt.sign({ id : logindata._id }, 'SURAT');

        res.status(201).json({
            status : "success",
            message : "login successfully",
            token : usertoken,
            data : logindata
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.userupdate = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken
        const checkusertoken = jwt.verify(usertoken , "SURAT")
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password , 10)
        }
        const data = await USER.findByIdAndUpdate(checkusertoken.id , req.body)
        console.log("hello 5")

        res.status(201).json({
            status : "success",
            message : "data updated successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.userdelete = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken
        const checkusertoken = jwt.verify(usertoken , "SURAT")
        await USER.findByIdAndDelete(checkusertoken.id)

        res.status(201).json({
            status : "success",
            message : "data deleted successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.userfind = async function(req, res, next) {
    try {
        const data = await USER.find()

        res.status(200).json({
            status : "success",
            message : "data find successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

// admin

exports.adminsignup = async function(req, res, next) {
    try {

        req.body.password = await bcrypt.hash(req.body.password , 10)
        const data = await ADMIN.create(req.body)

        var admintoken = jwt.sign({ id : data._id }, 'SURAT');

        res.status(201).json({
            status : "success",
            message : "data created successfully",
            data:data,
            token : admintoken
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.adminlogin = async function(req, res, next) {
    try {
        const logindata = await ADMIN.findOne({uname : req.body.uname})
        
        if(!logindata){
            throw new Error("invalid username")
        }
        
        const checkpassword = await bcrypt.compare(req.body.password , logindata.password)
        
        if(!checkpassword){
            throw new Error("invalid password")
        }

        var admintoken = jwt.sign({ id : logindata._id }, 'SURAT');

        res.status(200).json({
            status : "success",
            message : "login successfully",
            token : admintoken,
            data : logindata
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.adminupdate = async function(req, res, next) {
    try {
        const admintoken = req.headers.admintoken
        const checkadmintoken = jwt.verify(admintoken , "SURAT")
        req.body.password = await bcrypt.hash(req.body.password , 10)
        console.log(req.body);
        await ADMIN.findByIdAndUpdate(checkadmintoken.id , req.body)

        res.status(201).json({
            status : "success",
            message : "data updated successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.admindelete = async function(req, res, next) {
    try {
        const admintoken = req.headers.admintoken
        const checkadmintoken = jwt.verify(admintoken , "SURAT")
        await ADMIN.findByIdAndDelete(checkadmintoken.id)

        res.status(201).json({
            status : "success",
            message : "data deleted successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.adminfind = async function(req, res, next) {
    try {
        const data = await ADMIN.find()

        res.status(200).json({
            status : "success",
            message : "data find successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

// phone book

exports.phonebookcreate = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken
        const checkusertoken = jwt.verify(usertoken , "SURAT")
        req.body.user = checkusertoken.id
        const data = await PHONE.create(req.body)

        res.status(201).json({
            status : "success",
            message : "data created successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.phonebookupdate = async function(req, res, next) {
    try {
        await PHONE.findByIdAndUpdate(req.query.id , req.body)

        res.status(200).json({
            status : "success",
            message : "data updated successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.phonebookdelete = async function(req, res, next) {
    try {
        await PHONE.findByIdAndDelete(req.query.id)

        res.status(201).json({
            status : "success",
            message : "data deleted successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.phonebookfind = async function(req, res, next) {
    try {
        const data = await PHONE.find()

        res.status(200).json({
            status : "success",
            message : "data find successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.phonebookfindbyuser = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken
        const checkusertoken = jwt.verify(usertoken , "SURAT")
        const data = await PHONE.find({user : checkusertoken.id})
        res.status(200).json({
            status : "success",
            message : "data find successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}

exports.phonebookfindbyfeild = async function(req, res, next) {
    try {
        const usertoken = req.headers.usertoken
        const checkusertoken = jwt.verify(usertoken , "SURAT")
        const data = await PHONE.find({$and:[{user : checkusertoken.id},{$or : [{fname : {$regex : req.query.search}} , {lname : {$regex : req.query.search}} , {contact : {$regex : req.query.search}} , {city : {$regex : req.query.search}}]}]})

        res.status(200).json({
            status : "success",
            message : "data find successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
}
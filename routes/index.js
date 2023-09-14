var express = require('express');
var router = express.Router();
const datacontrollers = require("../controller/user")

/* GET home page. */
// user
router.post('/user/signup', datacontrollers.usersignup);
router.post('/user/login', datacontrollers.userlogin);
router.patch('/user/update', datacontrollers.userauth , datacontrollers.userupdate);
router.delete('/user/delete', datacontrollers.multypleauth , datacontrollers.userdelete);
router.get('/user/find', datacontrollers.adminauth , datacontrollers.userfind);

// admin
router.post('/admin/signup', datacontrollers.adminsignup);
router.post('/admin/login', datacontrollers.adminlogin);
router.patch('/admin/update', datacontrollers.adminauth , datacontrollers.adminupdate);
router.delete('/admin/delete', datacontrollers.adminauth , datacontrollers.admindelete);
router.get('/admin/find', datacontrollers.adminauth , datacontrollers.adminfind);

// phone book
router.post('/phonebook/create', datacontrollers.userauth , datacontrollers.phonebookcreate);
router.patch('/phonebook/update', datacontrollers.userauth , datacontrollers.phonebookupdate);
router.delete('/phonebook/delete', datacontrollers.multypleauth , datacontrollers.phonebookdelete);
router.get('/phonebook/find', datacontrollers.phonebookfind);
router.get('/phonebook/findbyuser', datacontrollers.userauth , datacontrollers.phonebookfindbyuser);
router.get('/phonebook/findbyfeild', datacontrollers.userauth , datacontrollers.phonebookfindbyfeild);

module.exports = router;
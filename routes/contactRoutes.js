const express = require("express");
const router = express.Router();

const { getAllContact,createContact, getContact, deleteContact , updateContact } = require('../controllers/contactController');
const validateTokenHandler = require("../middleware/validataTokenHandler");

const validatetoken = require('../middleware/validataTokenHandler');
router.use(validatetoken);

// get all contacts:-
// router.route('/').get(getAllContact);

// create contacts :-
// router.route('/').post(createContact)

// for common ;- 
router.route('/').get(getAllContact).post(createContact);

// get a contact 
// router.route('/:id').get(getContact)

// update a contact 
// router.route('/:id').put(updateContact)

// delete a contact 
// router.route('/:id').delete(deleteContact)

// for common : - 
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;
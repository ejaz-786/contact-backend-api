const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");


// @desc Get all Contacts 
// @route GET /api/contacts
// @access public/  **Private

const getAllContact = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
})

// @desc create Contacts 
// @route POST /api/contacts/
// @access public    **Private

const createContact = asyncHandler(async (req,res) => {
    const { name , email , phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400); 
        throw new Error("All feilds are mandatory..");
    }
    const contact = await Contact.create({
        name, email, phone
    });
    res.status(201).json(contact);
})

// @desc Get a Contact
// @route GET /api/contacts:id
// @access public    **Private

const getContact = asyncHandler(async (req,res) => {
    const  contact = await Contact.findById(req.params.id);
    if(!contact) {
      res.status(404);
      throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
})

// @desc update a Contacts 
// @route PUT /api/contacts:id
// @access public       **Private

const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contacts Not Found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    ) 
    res.status(200).json(updatedContact)
})


// @desc delet a Contact
// @route DELETE /api/contacts:id
// @access public      **Private


const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.remove(contact);
    res.status(200).json(contact);
})

module.exports = { getAllContact,createContact, getContact, deleteContact , updateContact}
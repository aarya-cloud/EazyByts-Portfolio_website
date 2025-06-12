const Contact = require('../models/contact');

const getContact = async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            return res.status(404).json({ message: 'No contact information found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateContact = async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            // If no contact exists, create a new one
            contact = new Contact(req.body);
        } else {
            // Update existing contact
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.linkedIn = req.body.linkedIn;
            contact.github = req.body.github;
        }
        await contact.save();
        res.json({ message: 'Contact information saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getContact, updateContact };

const Contact = require('mongoose').model('Contact');
const contactValidation = require('../util/contactValidation');

module.exports = {

  getContacts: (req, res) => {
    const pageLength = 5;
    const page = Number(req.params.page) || 1;

    Contact.count().then(contactsCount => {
      let maxPages = Math.ceil(contactsCount / pageLength);

      if (page > maxPages) {
        page = maxPages;
      }

      if (page < 0) {
        page = 1;
      }

      let pages = {
        prevPage: page - 1 < 1 ? 1 : page - 1,
        nextPage: page + 1 > maxPages ? maxPages : page + 1,
        hasPrevPage: page - 1 > 0,
        hasNextPage: page + 1 <= maxPages
      };

      Contact.find()
        .skip((pageLength * page) - pageLength)
        .limit(pageLength)
        .then(contacts => {
          if (!contacts) {
            return res.status(200).json({
              success: false,
              message: 'There are no contacts in the database'
            });
          }

          return res.status(200).json({
            success: true,
            contacts,
            pages
          })
        })
    })
  },
  createContact: (req, res) => {
    const validator = contactValidation.validateContact(req.body);
    if (!validator.success) {
      return res.status(200).json({
        success: false,
        message: validator.errors
      });
    }

    const contactToCreate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      image: req.body.image,
      phone: req.body.phone,
      creator: req.body.creator
    };

    Contact.create(contactToCreate)
      .then(contact => {
        if (contact) {
          return res.status(200).json({
            success: true,
            message: 'Contact created successfully!'
          });
        }
      })
  },

  editContact: (req, res) => {
    const contactId = req.params.id;
    const userId = req.body.userId;

    const payload = req.body;

    Contact.findById(contactId)
      .then(contact => {
        if (!contact) {
          return res.status(404).json({
            success: false,
            message: 'Contact does not exist!'
          });
        }

        let validator = contactValidation.validateContact(payload);

        if (contact.creator.toString() === userId) {
          if (validator.success) {
            contact.firstName = payload.firstName;
            contact.lastName = payload.lastName;
            contact.email = payload.email;
            contact.image = payload.image;
            contact.phone = payload.phone;

            contact.save().then(() => {
              return res.status(200).json({
                success: true,
                message: 'Contact edited successfully!',
                contact
              });
            })
          } else {
            return res.status(200).json({
              success: false,
              message: validator.errors
            });
          }

        } else {
          return res.status(404).json({
            success: false,
            message: 'Unauthorized'
          })
        }

      })
  },

  deleteContact: (req, res) => {
    const contactId = req.params.id;
    const userId = req.body.userId;

    Contact.findById(contactId)
      .then(contact => {
        if (!contact) {
          return res.status(404).json({
            success: false,
            message: 'Contact does not exist!'
          });
        }

        if (contact.creator.toString() === userId) {
          Contact.findByIdAndRemove(contactId)
            .then(response => {
              return res.status(200).json({
                success: true,
                message: 'Contact deleted successfully!'
              });
            })
        } else {
          return res.status(404).json({
            success: false,
            message: 'Unauthorized'
          });
        }
      })
  }
}
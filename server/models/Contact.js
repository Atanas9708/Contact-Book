const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  phone: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
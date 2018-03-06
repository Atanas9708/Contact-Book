const Contact = require('mongoose').model('Contact');
const validator = require('validator');

module.exports = {
  validateContact: (payload) => {
    let errors = {};
    let isValid = true;

    if (!payload || !payload.firstName || typeof payload.firstName !== 'string' || payload.firstName.length < 4) {
      errors['firstName'] = 'First name must be at least 4 characters long!';
      isValid = false;
    }

    if (!payload || !payload.lastName || typeof payload.lastName !== 'string' || payload.lastName.length < 4) {
      errors['lastName'] = 'Last name must be at least 4 characters long!';
      isValid = false;
    }

    if (!payload || !payload.email || !validator.isEmail(payload.email)) {
      errors['email'] = 'Please provide a valid email address!';
      isValid = false;
    }

    if (payload.image.endsWith('.jpg') || payload.image.endsWith('.png')) {
      null;
    } else {
      errors['image'] = 'Image must be in jpg or png format.';
      isValid = false;
    }

    if (!payload || !payload.phone || payload.phone.length != 10) {
      errors['phone'] = 'Phone number must consist of 10 digits';
      isValid = false;
    }

    return {
      success: isValid,
      errors
    }
  }
}
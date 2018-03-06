import validator from 'validator';
import toastr from 'toastr';

export default function validateContact(payload) {

  if (!payload || !payload.firstName || typeof payload.firstName !== 'string' || payload.firstName.length < 4) {
    toastr.error('First name must be at least 4 characters long!');
    return false;
  }

  if (!payload || !payload.lastName || typeof payload.lastName !== 'string' || payload.lastName.length < 4) {
    toastr.error('Last name must be at least 4 characters long!');
    return false;
  }

  if (!payload || !payload.email || !validator.isEmail(payload.email)) {
    toastr.error('Please provide a valid email address!');
    return false;
  }

  if (payload.image.endsWith('.jpg') || payload.image.endsWith('.png')) {
    null;
  } else {
    toastr.error('Image must be in jpg or png format.');
    return false;
  }

  if (!payload || !payload.phone || payload.phone.length != 10) {
    toastr.error('Phone number must consist of 10 digits');
    return false;
  }

  return true;

}
module.exports = {
  validateSignupForm: (payload) => {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide a valid username.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
      isFormValid = false;
      errors.password = 'Password must have at least 4 characters.';
    }

    if (!payload || payload.password !== payload.repeatPass) {
      isFormValid = false;
      errors.password = 'Passwords must match.';
    }

    return {
      success: isFormValid,
      errors
    }
  },

  validateLoginForm: (payload) => {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide your username.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    }

    return {
      success: isFormValid,
      errors
    }
  }
}
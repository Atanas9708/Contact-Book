const controllers = require('../controllers');

module.exports = app => {
  app.post('/register', controllers.user.registerPost);
  app.post('/login', controllers.user.loginPost);

  app.get('/contacts/:page', controllers.contact.getContacts);
  app.post('/create', controllers.contact.createContact);
  app.post('/edit/:id', controllers.contact.editContact);
  app.post('/delete/:id', controllers.contact.deleteContact);
}
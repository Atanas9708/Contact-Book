const env = process.env.NOVE_ENV || 'development';
const config = require('./config/config')[env];
require('./config/database')(config);
const app = require('express')();
require('./config/express')(app);
require('./config/routes')(app);


app.listen(config.port);
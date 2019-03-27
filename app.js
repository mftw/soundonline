const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

//Set port
app.set('port', port);
//Set view directory (__dirname => DOCUMENT_ROOT)
app.set('views', __dirname + '/views');
//Set view engine to ejs
app.set('view engine', 'ejs');

//Set static path
app.use(express.static(__dirname + '/'));

//Requires
require('./routes/index')(app);
// require('./routes/brands')(app);
require('./routes/api/brands')(app);
require('./routes/admin/brandadmin')(app);


//Angiver en listener på port 4000
app.listen(port, () => {
    console.log(`Express server started http://localhost:${port}`);
});
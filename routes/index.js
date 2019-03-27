const mysql = require('../config/mysql')();
const bodyParser = require('body-parser');
// console.log(mysql);

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());

    //Get all 
    app.get('/api/', function(req, res) {
        // const sql = 'SELECT * FROM brand';
        const sql = 'SELECT * FROM product';
        mysql.query(sql, (err, rows) => {
            return res.json(rows);
        })
        // res.send(response)
        // res.sendStatus(200);
    });

    // //Get single product
    // app.get('/api/:id', (req, res) => {
    //     res.sendStatus(200);
    // })
    
    // //Add new item
    // app.post('/api/', (req, res) => {
    //     res.sendStatus(200);
    // })
    
    // //Update item
    // app.put('/api/:id', (req, res) => {
    //     res.sendStatus(200);
    // })
    
    // //Delete item
    // app.delete('/api/:id', (req, res) => {
    //     res.sendStatus(200);
    // })
}
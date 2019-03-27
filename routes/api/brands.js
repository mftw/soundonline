const mysql = require('../../config/mysql')();
const bodyParser = require('body-parser');
// console.log(mysql);

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());

    //Get all 
    app.get('/api/brands', function(req, res) {
        const sql = 'SELECT id, title, description FROM brand';
        mysql.query(sql, (err, rows) => {
            return res.json(rows);
        })
        // res.send(response)
        // res.sendStatus(200);
    });

    //Get single product
    app.get('/api/brands/:id', (req, res) => {
        if(isNaN(req.params.id)){
        // if(isNaN(req.params.id) == false){
            res.sendStatus(400);
        } else {
            const sql =`SELECT title, description 
                        FROM brand
                        WHERE id = ?`;
            // const sql =`SELECT title, description 
            //             FROM brand
            //             WHERE id = ${req.params.id}`;
            mysql.query(sql, [req.params.id], (err, result) => {
            // mysql.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    return res.json(result)
                }
            })
        }
    })
    
    //Add new item
    app.post('/api/brands', (req, res) => {
        const title = (req.body.title === undefined) ? '' : req.body.title;
        const description = (req.body.description === undefined) ? '' : req.body.description;
        // console.log(title)
        // console.log(Object.entries(req.body))

        if(title === '' || description === '') {
            res.sendStatus(418);
        } else {
            const sql =`INSERT INTO brand(title, description)
                        VALUES(?, ?)`;
            
            mysql.query(sql, [title, description], (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(result.insertId);
                    res.sendStatus(200);
                }
            })
        }

        
        // res.sendStatus(200);
    })
    
    //Update item
    app.put('/api/brands/:id', (req, res) => {
        const title = (req.body.title === undefined) ? '' : req.body.title;
        const description = (req.body.description === undefined) ? '' : req.body.description;

        if(title === '' || description === '') {
            res.sendStatus(400);
        } else {
            const sql =`UPDATE brand SET 
                        title = ?, 
                        description = ?
                        WHERE id = ?`;
            // const sql =`SELECT title, description 
            //             FROM brand
            //             WHERE id = ${req.params.id}`;
            mysql.query(sql, [title, description, req.params.id], (err, result) => {
            // mysql.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    res.sendStatus(400);
                } else {
                    console.log(result)
                    res.sendStatus(200);
                }
            })
        }
    })
    
    //Delete item
    app.delete('/api/brands/:id', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(400)
        } else {
            const sql =`DELETE FROM brand WHERE id = ?`;
            
            mysql.query(sql, [req.params.id], (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    // console.log(result.insertId);
                    res.sendStatus(200);
                }
            })
        }
    })
}
const mysql = require('../../config/mysql')();
const bodyParser = require('body-parser');
// console.log(mysql);

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());

    //Get all 
    app.get('/api/products', (req, res) => {
        const sql = 'SELECT * FROM product';
        mysql.query(sql, (err, rows) => {
            if(err) {
                console.error(err)
            } else {
                return res.json(rows);
            }
        })
        // res.send(response)
        // res.sendStatus(200);
    });

    //Get single product
    app.get('/api/products/:id', (req, res) => {
        if(isNaN(req.params.id)){
        // if(isNaN(req.params.id) == false){
            res.sendStatus(418);
        } else {
            const sql =`SELECT *
                        FROM product
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
    app.post('/api/products', (req, res) => {
        const title = (req.body.title === undefined) ? '' : req.body.title;
        const description = (req.body.description === undefined) ? '' : req.body.description;
        // console.log(title)
        // console.log(Object.entries(req.body))

        if(title === '' || description === '') {
            res.sendStatus(418);
        } else {
            const sql =`INSERT INTO product(title, description)
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
    app.put('/api/products/:id', (req, res) => {
        const title = (req.body.title === undefined) ? '' : req.body.title;
        const description = (req.body.description === undefined) ? '' : req.body.description;
        let resultid = 0;

        if(title === '' || description === '') {
            res.sendStatus(418);
        } else {
            const sql =`UPDATE product SET 
                        title = ?, 
                        description = ?
                        WHERE id = ?`;

            mysql.query(sql, [title, description, req.params.id], (err, result) => {
            // mysql.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    res.sendStatus(418);
                } else {
                    // resultid = result.insertId;
                    // console.log(result)
                    res.sendStatus(200);
                }
            })
        }

        // res.redirect('/admin/brand/details/' + req.params.id);
        // res.redirect('/admin/brand/details/' + resultid);
    })
    
    //Delete item
    app.delete('/api/products/:id', (req, res) => {
        if(isNaN(req.params.id)) {
            res.sendStatus(418)
        } else {
            const sql =`DELETE FROM product WHERE id = ?`;
            
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
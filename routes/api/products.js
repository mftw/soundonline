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

    function checkDefinition(value) {
        return (value === undefined) ? '' : value;
    }
    
    //Add new item
    app.post('/api/product/', (req, res) => {
        // let item_number = (req.body.item_number === undefined) ? '' : req.body.item_number;
        // let title = (req.body.title === undefined) ? '' : req.body.title;
        // let description_short = (req.body.description_short === undefined) ? '' : req.body.description_short;
        // let description_long = (req.body.description_long === undefined) ? '' : req.body.description_long;
        const item_number       = checkDefinition(req.body.item_number) 
        const title             = checkDefinition(req.body.title) 
        const description_short = checkDefinition(req.body.description_short) 
        const description_long  = checkDefinition(req.body.description_long) 
        const image             = checkDefinition(req.body.image) 
        const price             = checkDefinition(req.body.price) 
        const stock             = checkDefinition(req.body.stock) 
        const brand_id          = checkDefinition(req.body.brand_id) 
        const active            = checkDefinition(req.body.active) 
        // const item_number = (req.body.item_number === undefined) ? '' : req.body.item_number;
        // const title = (req.body.title === undefined) ? '' : req.body.title;
        // const description_short = (req.body.description_short === undefined) ? '' : req.body.description_short;
        // const description_long = (req.body.description_long === undefined) ? '' : req.body.description_long;
        // const image = (req.body.image === undefined) ? '' : req.body.image;
        // const price = (req.body.price === undefined) ? '' : req.body.price;
        // const stock = (req.body.stock === undefined) ? '' : req.body.stock;
        // const brand_id = (req.body.brand_id === undefined) ? '' : req.body.brand_id;
        // const active = (req.body.active === undefined) ? '' : req.body.active;

        if(title === '' || description_short === '') {
            res.sendStatus(418);
        } else {
            const sql = `INSERT INTO product(item_number, title, description_short, description_long, image, price, stock, brand_id, active) 
                            VALUES(?,?,?,?,?,?,?,?,?)`;
            mysql.query(sql, [item_number, title, description_short, description_long, image, price, stock, brand_id, active], (err, result) => {
                if(err) {
                    console.error(err);
                } else {
                    console.log(result.insertId);
                    res.sendStatus(200);
                }
            })

        }
    })
    
    //Update item
    app.put('/api/products/:id', (req, res) => {
        const title = (req.body.title === undefined) ? '' : req.body.title;
        const description = (req.body.description === undefined) ? '' : req.body.description;

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
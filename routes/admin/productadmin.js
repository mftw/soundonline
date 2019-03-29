

// const mysql = require('../../config/mysql')();

const modulename = 'Product';

module.exports = (app) => {
    // GET: list of brands
    app.get('/admin/product/list', (req, res) => {
        // console.log(arguments);
        res.render('pages/admin/product/index', {
            modulename: modulename,     
            modulemode: 'Oversigt'
        })
    })

    // GET: henter enkelt brand ud fra id
    app.get('/admin/product/details/:id', (req, res) => {
        res.render('pages/admin/product/details', {
            modulename: modulename,     
            modulemode: 'Detaljer',
            id: req.params.id,
        })
    })

    // POST: Oprette nyt brand
    app.get('/admin/product/create', (req, res) => {
        res.render('pages/admin/product/create', {
            modulename: modulename,     
            modulemode: 'Opret Ny',
        })
    })
    
    // PUT: Redigere brand
    app.get('/admin/product/update/:id', (req, res) => {
        res.render('pages/admin/product/update', {
            modulename: modulename,     
            modulemode: 'Rediger',
            id: req.params.id,
        })
    })
    
    // DELETE: Slet brand
    app.get('/admin/product/delete/:id', (req, res) => {
        res.render('pages/admin/product/delete', {
            modulename: modulename,     
            modulemode: 'Slet mærke',
            id: req.params.id,
        })
    })
}
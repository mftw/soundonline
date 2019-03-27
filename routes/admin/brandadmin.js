

// const mysql = require('../../config/mysql')();

const modulename = 'Brands';

module.exports = (app) => {
    // GET: list of brands
    app.get('/admin/brand/list', (req, res) => {
        // console.log(arguments);
        res.render('pages/admin/brand/index', {
            modulename: modulename,     
            modulemode: 'Oversigt'
        })
    })

    // GET: henter enkelt brand ud fra id
    app.get('/admin/brand/details/:id', (req, res) => {
        res.render('pages/admin/brand/details', {
            modulename: modulename,     
            modulemode: 'Detaljer',
            id: req.params.id,
        })
    })

    // POST: Oprette nyt brand
    app.get('/admin/brand/create', (req, res) => {
        res.render('pages/admin/brand/create', {
            modulename: modulename,     
            modulemode: 'Opret Ny',
        })
    })
}
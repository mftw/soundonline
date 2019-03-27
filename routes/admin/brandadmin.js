

// const mysql = require('../../config/mysql')();

const modulename = 'Brands';

module.exports = (app) => {
    // GET: list of brands
    app.get('/admin/brand/list', (req, res) => {
        res.render('pages/admin/brand/index', {
            modulename: modulename,     
            modulemode: 'Oversigt'
            // modulename: req.hostname,     
            // modulemode: req.url
        })
    })

    // GET: henter enkelt brand ud fra id
    app.get('/admin/brand/details/:id', (req, res) => {
        res.render('pages/admin/brand/details', {
            modulename: modulename,     
            modulemode: 'Detaljer',
            id: req.params.id,
            // modulename: req.hostname,     
            // modulemode: req.url
        })
    })
}
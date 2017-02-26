const app = require('express')();
const ejs = require('ejs');
const fs = require('file-system');
const config = require('./config.json');
const Utils = require('./class/Utils.js');

const imgs = (layer) => fs.readdirSync('./img/' + layer);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        imgs: imgs('layer-1'),
        config: config
    });
});

app.get('/choose-thumb/:id/:toolId?', (req, res) => {
    res.render('thumb', {
        img: imgs('layer-1')[req.params.id],
        imgId: req.params.id,
        tools: imgs('layer-2'),
        toolId: req.params.toolId,
        tool: imgs('layer-2')[req.params.toolId],
        config: config
    });
});

app.get('/image/:layer/:name', (req, res) => {
    res.sendFile(req.params.name, {
        root: __dirname + config.ASSET_LOCATION + req.params.layer
    });
});

app.listen(3311);
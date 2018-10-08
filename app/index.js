/*let Sequelize = require("sequelize");
let config    = require('../config/database');  // we use node-config to handle environments

let sequelize = new Sequelize(config.connection.database, config.connection.user, config.connection.password, {
    host: config.connection.host,
    port: config.connection.port,
    dialect: config.client,
    logging: false,
    additional: {
        timestamps: false

    },
    dialectOptions: {
        prependSearchPath: true
    }
});

let models = [
  
    { key: "floorplan_design_info", file: "floorplan_design_info" },
    { key: "feature_info", file: "feature_info" }
    
];


models.forEach(function(model){
    module.exports[model.key] = sequelize.import(__dirname + '/' + model.file);
    console.log('Model loaded ' + model.key);
});
(function(m){
    m.floorplan_design_info.belongsToMany(m.feature_info, {through: m.fp_design_features_link , foreignKey: "fp_design_id"});
    m.feature_info.belongsToMany(m.floorplan_design_info, {
        through: m.fp_design_features_link, 
        foreignKey: "feature_id"
    });

  
})(module.exports);

module.exports.sequelize = sequelize;*/


let fs = require('fs-extra');
let passportStrategies = require('../config/passport');
module.exports = function(router, passport) {
    console.log('initializing passport strategies.');
    passportStrategies.initialize();

    router.get('/', (req, res, next) => {
        res.sendFile(global.rootdirectory+'/public/docs/api-landing-page.html');
    });
    router.get('/docs', (req, res) => {
        let file = 'public/docs/index.html';
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            res.send(data);
        });
    });
    router.get('/docs-api/v1', (req, res) => {
        let file = 'public/docs/swagger.json';
        console.log('file: ', file);
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            data = JSON.parse(data);
            res.send(data);
        });
    });
};
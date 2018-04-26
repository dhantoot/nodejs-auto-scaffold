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



let passportStrategies = require('../config/passport');
module.exports = function(router, passport) {
    console.log('initializing passport strategies.');
    passportStrategies.initialize();

    router.get('/', (req, res, next) => {
        res.status(200).json({
            success: true,
            message: "Welcome To Heavens door"
        });
    });
    router.get('/vuejs-app', (req, res) => {
        res.sendFile(global.rootdirectory+'/public/vuejs-app/index.html');
    });
    router.get('/api-docs', (req, res) => {
        res.render('api-docs',{'api_key': process.env.api_key}, (err, html)=>{
            res.send(html);
        })
    });
};

let shell = require('shelljs');
let helpers = require('../../helpers/scaffold.js');

module.exports = function(app,port) {
    require('./routing')(app);
    console.log('initializing server...');
    console.log('global.rootdirectory ',global.rootdirectory);
    console.log('process.argv ',process.argv);
    switch(process.argv[2]) {
        case 'add:route':
            const _route = process.argv[3].toLowerCase();
            const component_directory = global.rootdirectory + '/app/routes/' + _route;
            const component_index = global.rootdirectory + '/app/routes/' + _route + '/index.js';
            const component_name = global.rootdirectory + '/app/routes/' + _route + '/' + _route +'.js';
            const component_Ctrl = global.rootdirectory + '/app/routes/' + _route + '/' + _route + 'Ctrl.js';
            const component_Test = global.rootdirectory + '/app/routes/' + _route + '/' + _route + 'Test.js';
            shell.mkdir(component_directory);
            shell.touch(component_index);
            shell.touch(component_name);
            shell.touch(component_Ctrl);
            shell.touch(component_Test);
            helpers.scaffold(_route, component_name, component_index, component_Ctrl, component_Test);
            break;
        default:
            let conf = require(`../../config/environment/${process.argv[2]}.js`);
            app.listen(conf.port, function() {
                console.log('Server started on port: ' + conf.port);
            });
            break;
    }
}
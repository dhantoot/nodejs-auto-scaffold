let shell = require('shelljs');
let helpers = require('../helpers/scaffold.js');

module.exports = function(app,port) {
    console.log('initializing server...');
    console.log('global.rootdirectory ',global.rootdirectory);
    console.log('process.argv ',process.argv);
    switch(process.argv[2]) {
        case 'component':
            const _component = process.argv[3].toLowerCase();
            const component_directory = global.rootdirectory + '/app/routes/' + _component;
            const component_index = global.rootdirectory + '/app/routes/' + _component + '/index.js';
            const component_name = global.rootdirectory + '/app/routes/' + _component + '/' + _component +'.js';
            const component_Ctrl = global.rootdirectory + '/app/routes/' + _component + '/' + _component + 'Ctrl.js';
            const component_Test = global.rootdirectory + '/app/routes/' + _component + '/' + _component + 'Test.js';
            shell.mkdir(component_directory);
            shell.touch(component_index);
            shell.touch(component_name);
            shell.touch(component_Ctrl);
            shell.touch(component_Test);
            helpers.scaffold(_component, component_name, component_index, component_Ctrl, component_Test);
            break;
        default:
            let conf = require(`../config/environment/${process.argv[2]}.js`);
            app.listen(conf.port, function() {
                console.log('Server started on port: ' + conf.port);
            });
            break;
    }
}
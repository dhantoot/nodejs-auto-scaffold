module.exports = function(app) {
    require('../routes/user')(app);
    require('../routes/login')(app);
    //auto_add_routes_here_please_dont_delete
}
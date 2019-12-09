module.exports = function(app){
    var controller = require('./controller');

    app.route('/inscription')
    .post(controller.inscription);

    app.route('/hi')
    .get(controller.hello);
};
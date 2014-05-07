define(function(require, exports, module) {
	var Card = require('models/Card');

	module.exports = Backbone.Collection.extend({
		model: Card
	});
});
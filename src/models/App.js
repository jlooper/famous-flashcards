define(function(require, exports, module) {
	var defaultCards = require('models/defaultCards');
	var Cards        = require('models/Cards');

	module.exports = Backbone.Model.extend({
		initialize: function(params) {
			this.fetch();
		},

		fetch: function() {
			this.set('cards', new Cards(defaultCards));
		}
	});
});
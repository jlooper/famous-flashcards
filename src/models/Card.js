define(function(require, exports, module) {
	module.exports = Backbone.Model.extend({
		defaults: {
			verb: '',
			category: '',
			firstsingular: '',
			secondsingular: '',
			thirdsingular: '',
			firstplural: '',
			secondplural: '',
			thirdplural: '',
			starred: false
		}
	});
});
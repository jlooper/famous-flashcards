define(function(require, exports, module) {
	// Famous Modules
	var Surface   = require('famous/core/Surface');
	var Modifier  = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');
	var View      = require('famous/core/View');
	var Scene     = require('famous/core/Scene');
	var Utility   = require('famous/utilities/Utility');

	function HeaderView() {
		View.apply(this, arguments);

		this.title = new Surface({
			size: [undefined, 50],
			content: 'French Verb Conjugations',
			properties: {
				textAlign: 'center',
				fontSize: '30px',
				lineHeight: '50px',
				backgroundColor: '#D810FF'
			}
		});

		this.other = new Surface({
			size: [true, 50],
			content: "&#xf055;",
			classes: ["headerIcon"],
			properties: {
				lineHeight: "50px"
			}
		});

		this.topBar = new View();
		this.topBar._add(new Modifier({
			origin: [0.5, 0]
		})).add(this.title);
		this._add(Utility.transformInFront).add(this.topBar);
	};

	HeaderView.prototype = Object.create(View.prototype);
	HeaderView.prototype.constructor = HeaderView;

	module.exports = HeaderView;
});
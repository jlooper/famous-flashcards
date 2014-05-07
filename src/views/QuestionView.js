define(function(require, exports, module) {
	var Surface          = require('famous/core/Surface');
	var Modifier         = require('famous/core/Modifier');
	var Transform        = require('famous/core/Transform');
	var View             = require('famous/core/View');
	var SequentialLayout = require('famous/views/SequentialLayout');
	var Utility          = require('famous/utilities/Utility');
	var Transitionable   = require('famous/transitions/Transitionable');

	function QuestionView(model) {
		View.apply(this);

		this.model = model;

		this.model.on('change', function() {
			this.setContent();
		}, this);

		this.transform = new Transitionable([0, 0, 0]);
		this.size = new Transitionable(100);

		this.questionModifier = new Modifier();
		this.questionModifier.transformFrom(function() {
			var currentValue = this.transform.get();
			return Transform.translate(currentValue[0], currentValue[1], currentValue[2]);
		}.bind(this));

		this.questionModifier.sizeFrom(this.getSize());

		this.questionSurface = new Surface({
			size: [undefined, 100]
		});
		this.setContent();
		this.questionSurface.pipe(this._eventOutput);

		this.questionSurface.on('click', function() {
			this._eventOutput.emit('answer', this.model);
		}.bind(this));

		this._add(this.questionModifier).add(this.questionSurface);
	}

	QuestionView.prototype = Object.create(View.prototype);
	QuestionView.prototype.constructor = QuestionView;

	QuestionView.prototype.getSize = function() {
		return [undefined, this.size.get()];
	};

	QuestionView.prototype.setContent = function() {
		this.questionSurface.setContent(template.call(this));
	};

	QuestionView.prototype.delete = function(cb) {
		this.transform.set([window.innerWidth + 100, 0, 0], {duration: 1000, curve: 'easeInOut'}, function() {
			this.size.set(0, {duration: 300, curve: 'easeOut'}, function() {
				cb();
				this._eventOutput.emit('closed');
			}.bind(this));
		}.bind(this));
	};

	var template = function() {
		var firstsingular = this.model.get('firstsingular') ? "firstsingular" : "";
		return "<div class='card " + this.model.get('category') + "'>" + 
		"<div class='cardData " + firstsingular + "'>" + this.model.get("verb") + "</div>" +
		"</div>";
	};
	

module.exports = QuestionView;
});
define(function(require, exports, module) {
	var View         = require('famous/core/View');
	var Modifier     = require('famous/core/Modifier');
	var ViewSequence = require('famous/core/ViewSequence');
	var Scrollview   = require('famous/views/Scrollview');
	var QuestionView     = require('views/QuestionView');
	var EventHandler = require('famous/core/EventHandler');
	var RenderNode   = require('famous/core/RenderNode');
	var Card         = require('models/Card');

	function QuestionListView(collection) {
		View.apply(this, arguments);

		this.collection = collection;

		var temp = false;

		this.collection.on('remove', function(card, collection, removalData) {
			this.questionViews[removalData.index].delete(function() {
				this.viewSequence.splice(removalData.index, 1);
			}.bind(this));
		}.bind(this));

		this.questionViews = [];

		this.scrollview = new Scrollview({
			margin: 100000
		});
		this.viewSequence = new ViewSequence(this.questionViews);
		this.scrollview.sequenceFrom(this.viewSequence);
		this.setContent();

		this._eventInput.on('answer', function(data) {
			this._eventOutput.emit('answer', data);
		}.bind(this));

		this._add(this.scrollview);
	};

	QuestionListView.prototype = Object.create(View.prototype);
	QuestionListView.prototype.constructor = QuestionListView;

	QuestionListView.prototype.setContent = function() {
		var cards = this.collection.models;
		var node = this.questionSequence;
		for (var i = 0; i < cards.length; i++) {
			temp = new QuestionView(cards[i]);
			temp.pipe(this.scrollview);
			temp.pipe(this._eventInput);
			this.questionViews.push(temp);
		}
	};

	module.exports = QuestionListView;
});
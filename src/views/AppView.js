define(function(require, exports, module) {
	// Famous Modules
	var View               = require('famous/core/View');
	var RenderNode         = require('famous/core/RenderNode')
	var Transform          = require('famous/core/Transform');
	var Surface            = require('famous/core/Surface');
	var Modifier           = require('famous/core/Modifier');
	var EventHandler       = require('famous/core/EventHandler');
	var ViewSequence       = require('famous/core/ViewSequence');
	var Transitionable     = require('famous/transitions/Transitionable');
	var Scrollview         = require('famous/views/Scrollview');
	var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
	var Utility            = require('famous/utilities/Utility');

	// Custom Views
	var HeaderView    = require('views/HeaderView');
	var AnswerView  = require('views/AnswerView');
	var QuestionView      = require('views/QuestionView');
	var QuestionListView  = require('views/QuestionListView');

	var Card          = require('models/Card');

	function AppView(model) {
		View.apply(this);

		this.model = model;

		// Create the mainTransforms for shifting the entire view over on menu open
		this.mainTransform = new Modifier({
		    transform: Transform.identity
		});

		this.mainTransitionable = new Transitionable(0);
		this.mainTransform.transformFrom(function() {
			return Transform.translate(this.mainTransitionable.get(), 0, 0);
		}.bind(this));

		this.questionListView = new QuestionListView(this.model.get('cards'));
		this.questionListView.pipe(this._eventInput);

		this._eventInput.on('answer', function(card) {
			this.answerView.answer(card);						
		}.bind(this));

		this.mainNode = new RenderNode();
		this.mainNode.add(this.questionListView);
		this.mainNode.add(this.sideView);

		this.layout = new HeaderFooterLayout({
			size: [undefined, undefined],
			headerSize: 50,
			footerSize: 1
		});

		this.headerView = new HeaderView();
		this.headerView.pipe(this._eventInput);
		
		this.layout.header.add(this.headerView);
		this.layout.content.add(Utility.transformBehind).add(this.mainNode);

		this.answerView = new AnswerView(new Card());
		this.answerView.pipe(this._eventInput);

		this.comboNode = new RenderNode();
		this.comboNode.add(new Modifier({transform: Transform.translate(0,0,5)})).add(this.answerView);
		this.comboNode.add(this.layout);
		
		this._add(this.mainTransform).add(this.comboNode);

	};

	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;

	var openCard = function(data) {
		this.answerView.answer(data);
	};

	
	module.exports = AppView;

});
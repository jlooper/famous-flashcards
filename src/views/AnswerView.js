define(function(require, exports, module) {
	// Famous Modules
	var Surface          = require('famous/core/Surface');
	var Modifier         = require('famous/core/Modifier');
	var Transform        = require('famous/core/Transform');
	var View             = require('famous/core/View');
	var RenderNode       = require('famous/core/RenderNode');
	var Transitionable   = require('famous/transitions/Transitionable');
	var SequentialLayout = require('famous/views/SequentialLayout');
	var Utility          = require('famous/utilities/Utility');
	var InputSurface     = require('famous/surfaces/InputSurface');
	var KeyCodes         = require('famous/utilities/KeyCodes');
	var GridLayout 		 = require('famous/views/GridLayout');
	
	function AnswerView(model) {
		View.apply(this, arguments);

		this.model = model;
		this.bindModelEvents();

		this.categoryIndex = 0;
		this.categoryList = ['regular', 'irregular'];

		this.backing = new Surface({
			size: [undefined, undefined],
			classes: ["backing"],
			content: 's',
			properties: {
				backgroundColor: "#B21FCC"
			}
		});

		this.exitSurface = new Surface({
			size: [50, undefined],
			content: "&#xf060;",
			classes: ["previous"],
			properties: {
				backgroundColor: "#FF034D"
			}
		});
		this.exitSurface.on('click', function() {
			this.flipClose();
		}.bind(this))

		this.answerGrid = new GridLayout({
		  dimensions: [2,3]
		});
		buildContent.call(this);

		var formModifier = new Modifier({
			transform: Transform.translate(50, 0, 0)
		});

		var renderNode = new RenderNode();
		renderNode.add(formModifier).add(this.answerGrid);

		this.hingeTransitionable = new Transitionable(-Math.PI / 2);
		this.hinge = new Modifier();
		this.hinge.transformFrom(function() {
			return Transform.rotateY(this.hingeTransitionable.get())
		}.bind(this));

		
		this.layout = new RenderNode();
		this.layout.add(this.backing);
		this.layout.add(this.exitSurface);
		this.layout.add(renderNode);
		

		this._add(new Modifier({
			transform: Transform.translate(0, 0, 10),
			size : [window.innerWidth, window.innerHeight]
		})).add(this.hinge).add(this.layout)
	};

	AnswerView.prototype = Object.create(View.prototype);
	AnswerView.prototype.constructor = AnswerView;

	AnswerView.prototype.answer = function(card) {
		this.model = card;
		this.bindModelEvents();
		this.setContent();
		this.flipOpen();
	};
	
	AnswerView.prototype.flipOpen = function() {
		this.hingeTransitionable.set(0, { duration: 500, curve: 'easeOut' });
	};

	AnswerView.prototype.flipClose = function() {
		this.hingeTransitionable.set(-Math.PI/2, { duration: 500, curve: 'easeOut' });
	};

	AnswerView.prototype.setContent = function() {
		this.setAnswer1();
		this.setAnswer2();
		this.setAnswer3();
		this.setAnswer4();
		this.setAnswer5();
		this.setAnswer6();		
	};

	
	AnswerView.prototype.setAnswer1 = function() {
		this.answer1.setClasses(["form", "answer" ]);
		this.answer1.setContent('<div class="text">' + this.model.get('firstsingular') + '</div>');
	};

	AnswerView.prototype.setAnswer2 = function() {
		this.answer2.setClasses(["form", "answer" ]);
		this.answer2.setContent('<div class="text">' + this.model.get('firstplural') + '</div>');
	};

	AnswerView.prototype.setAnswer3 = function() {
		this.answer3.setClasses(["form", "answer" ]);
		this.answer3.setContent('<div class="text">' + this.model.get('secondsingular') + '</div>');
	};

	AnswerView.prototype.setAnswer4 = function() {
		this.answer4.setClasses(["form", "answer" ]);
		this.answer4.setContent('<div class="text">' + this.model.get('secondplural') + '</div>');
	};

	AnswerView.prototype.setAnswer5 = function() {
		this.answer5.setClasses(["form", "answer" ]);
		this.answer5.setContent('<div class="text">' + this.model.get('thirdsingular') + '</div>');
	};

	AnswerView.prototype.setAnswer6 = function() {
		this.answer6.setClasses(["form", "answer" ]);
		this.answer6.setContent('<div class="text">' + this.model.get('thirdplural') + '</div>');
	};

	AnswerView.prototype.bindModelEvents = function() {
		this.model.on('change:category', function() {
			this.setCategory()
		}.bind(this));
	};

	var buildContent = function() {
		

		this.answer1 = new Surface({
	      content: '',
	      size: [120, 120],
	      classes: ['answer'],
	      properties: {
	        color: 'white',
	        textAlign: 'center'
	      }
	    });

	    this.answer2 = new Surface({
	      content: '',
	      size: [120, 120],
	      classes: ['answer'],
	      properties: {
	        color: 'white',
	        textAlign: 'center'
	      }
	    });

	    this.answer3 = new Surface({
	      content: '',
	      size: [120, 120],
	      classes: ['answer'],
	      properties: {
	        color: 'white',
	        textAlign: 'center'
	      }
	    });

	    this.answer4 = new Surface({
	      content: '',
	      size: [120, 120],
	      classes: ['answer'],
	      properties: {
	        color: 'white',
	        textAlign: 'center'
	      }
	    });

	    this.answer5 = new Surface({
	      content: '',
	      size: [120, 120],
	      classes: ['answer'],
	      properties: {
	        color: 'white',
	        textAlign: 'center'
	      }
	    });

	    this.answer6 = new Surface({
	      content: '',
	      size: [120, 120],
	      classes: ['answer'],
	      properties: {
	        color: 'white',
	        textAlign: 'center'
	      }
	    });

		

		var surfaces = [this.answer1,this.answer2,this.answer3,this.answer4,this.answer5,this.answer6];
		this.answerGrid.sequenceFrom(surfaces);

		
	}

	

	module.exports = AnswerView;
});
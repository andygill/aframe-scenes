// JavaScript

var KeyboardEvent = window.KeyboardEvent;

AFRAME.registerComponent('shader-test', {
	init: function () {
	    console.log("init shader-test");
	    this.listeners = {
		keydown: this.onKeyDown.bind(this)
	    };
	    window.addEventListener('keydown', this.listeners.keydown, false);
			this.state = false;
	},
	onKeyDown: function (event) {
		var self = this;
			if (event.code == "KeyT") {
				console.log(event.code);
				var f = function(o){ 
					console.log(this);
					if (self.state) {
						this.setAttribute("material","shader","standard");
					} else {
						this.setAttribute("material","shader","flat");
					}
				}
				$("a-box").each(f);
				$("a-sphere").each(f);
				$("a-cylinder").each(f);
				$("a-plane").each(f);
				self.state = !self.state;
			}
	}
});
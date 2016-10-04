// JavaScript

var KeyboardEvent = window.KeyboardEvent;

AFRAME.registerComponent('shader-test', {
	init: function () {
	    console.log("init shader-test");
	    this.listeners = {
		keydown: this.onKeyDown.bind(this)
	    };
	    window.addEventListener('keydown', this.listeners.keydown, false);
			this.state = 0;
			this.shaders = ["standard","flat"];
	},
	onKeyDown: function (event) {
		var self = this;
			if (event.code == "KeyT") {
				console.log(event.code);
				var f = function(o){ 
					console.log(this,self.shaders[self.state]);
					this.setAttribute("material","shader",self.shaders[self.state]);
				}
				$("a-box").each(f);
				$("a-sphere").each(f);
				$("a-cylinder").each(f);
				$("a-plane").each(f);
				self.state++;
				if (self.state >= self.shaders.length) {
					self.state = 0;
				}
			}
	}
});
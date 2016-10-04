// JavaScript

var KeyboardEvent = window.KeyboardEvent;

AFRAME.registerComponent('shader-test', {
	init: function () {
	    console.log("init shader-test");
	    this.listeners = {
		keydown: this.onKeyDown.bind(this)
	    };
	    window.addEventListener('keydown', this.listeners.keydown, false);
	},

	onKeyDown: function (event) {
	    console.log(event.code);
	}
    });
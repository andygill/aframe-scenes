// JavaScript

var KeyboardEvent = window.KeyboardEvent;

AFRAME.registerComponent('toggle-material', {
	init: function () {
	    console.log("init shader-test");
	    this.listeners = {
		keydown: this.onKeyDown.bind(this)
	    };
	    window.addEventListener('keydown', this.listeners.keydown, false);
			this.state = 0;
			this.shaders = ["standard","flat","my-shader"];
			this.original = true;

			$("[toggle-material]").each(function() {
				var grab = $($(this).clone().wrap("<div/>").parent().html());
				grab[0].setAttribute("material",grab[0].getAttribute("toggle-material"))
				grab[0].removeAttribute("toggle-material");
				grab[0].setAttribute("toggled-material","");
//				grab[0].setAttribute("scale","1.1 1.1 1.1");
				grab[0].setAttribute("visible",false);
				$(this).after(grab);
			});

	},
	onKeyDown: function (event) {
		var self = this;
			if (event.code == "KeyT") {
				console.log(event.code);
				self.original = !self.original;
				$("[toggle-material]").each(function() {
					this.setAttribute("visible",self.original);
				});
				$("[toggled-material]").each(function() {
					this.setAttribute("visible",!self.original);
				});
/*
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
*/
			}
	}
});


AFRAME.registerShader('my-shader', {
  schema: {
    colorx: {type: 'vec3', default: '0.5 0.5 0.5', is: 'uniform'}
  },
	//  vertexShader: [
//    'void main() {',
//    '  gl_Position = projectionMatrix * modelViewMatrix * position;',
//    '}'
//  ].join('\n'),
  fragmentShader: [
    'uniform vec3 colorx;',
    'void main() {',
    '  gl_FragColor = vec4(colorx, 1.0);',
    '}'
  ].join('\n')
});
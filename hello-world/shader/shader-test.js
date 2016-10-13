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
			this.original = false;

			$("[toggle-material]").each(function() {
				var grab = $($(this).clone().wrap("<div/>").parent().html());
				grab[0].setAttribute("material",grab[0].getAttribute("toggle-material"))
				grab[0].removeAttribute("toggle-material");
				grab[0].setAttribute("toggled-material","");
//				grab[0].setAttribute("scale","1.1 1.1 1.1");
				grab[0].setAttribute("visible",true);
				$(this)[0].setAttribute("visible",false)
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
			}
	}
});

AFRAME.registerShader('my-shader', {
  schema: {
    theColor: {type: 'vec3', default: '0.5 0.5 0.5', is: 'uniform'},
  },
  vertexShader: [
		'varying vec3 vNormal;',
    'void main() {',
		'  vec3 objectNormal = vec3( normal );',
		'  vec3 transformedNormal = normalMatrix * objectNormal;',
		'  vNormal = normalize( transformedNormal );',
		'  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),
  fragmentShader: [
		'varying vec2 UV;',
		'varying vec3 vNormal;',
    'uniform vec3 theColor;',
    'void main() {',
    '  gl_FragColor = linearToOutputTexel(vec4(theColor, 1.0));',
    '}'
  ].join('\n')
});
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(1);

	var _ngChroma = __webpack_require__(2);

	var moduleName = 'hzub.ngChroma';

	var mod = angular.module(moduleName, ['angular-click-outside']);
	mod.component(_ngChroma.ColorPickerComponent.NAME, _ngChroma.ColorPickerComponent.OPTIONS);

	exports.default = moduleName;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*global angular, navigator*/

	(function() {
	    'use strict';

	    angular
	        .module('angular-click-outside', [])
	        .directive('clickOutside', [
	            '$document', '$parse', '$timeout',
	            clickOutside
	        ]);
	    
	    /**
	     * @ngdoc directive
	     * @name angular-click-outside.directive:clickOutside
	     * @description Directive to add click outside capabilities to DOM elements
	     * @requires $document
	     * @requires $parse
	     * @requires $timeout
	     **/
	    function clickOutside($document, $parse, $timeout) {
	        return {
	            restrict: 'A',
	            link: function($scope, elem, attr) {

	                // postpone linking to next digest to allow for unique id generation
	                $timeout(function() {
	                    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
	                        fn;

	                    function eventHandler(e) {
	                        var i,
	                            element,
	                            r,
	                            id,
	                            classNames,
	                            l;

	                        // check if our element already hidden and abort if so
	                        if (angular.element(elem).hasClass("ng-hide")) {
	                            return;
	                        }

	                        // if there is no click target, no point going on
	                        if (!e || !e.target) {
	                            return;
	                        }

	                        // loop through the available elements, looking for classes in the class list that might match and so will eat
	                        for (element = e.target; element; element = element.parentNode) {
	                            // check if the element is the same element the directive is attached to and exit if so (props @CosticaPuntaru)
	                            if (element === elem[0]) {
	                                return;
	                            }
	                            
	                            // now we have done the initial checks, start gathering id's and classes
	                            id = element.id,
	                            classNames = element.className,
	                            l = classList.length;

	                            // Unwrap SVGAnimatedString classes
	                            if (classNames && classNames.baseVal !== undefined) {
	                                classNames = classNames.baseVal;
	                            }

	                            // if there are no class names on the element clicked, skip the check
	                            if (classNames || id) {

	                                // loop through the elements id's and classnames looking for exceptions
	                                for (i = 0; i < l; i++) {
	                                    //prepare regex for class word matching
	                                    r = new RegExp('\\b' + classList[i] + '\\b');

	                                    // check for exact matches on id's or classes, but only if they exist in the first place
	                                    if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
	                                        // now let's exit out as it is an element that has been defined as being ignored for clicking outside
	                                        return;
	                                    }
	                                }
	                            }
	                        }

	                        // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
	                        $timeout(function() {
	                            fn = $parse(attr['clickOutside']);
	                            fn($scope);
	                        });
	                    }

	                    // if the devices has a touchscreen, listen for this event
	                    if (_hasTouch()) {
	                        $document.on('touchstart', eventHandler);
	                    }

	                    // still listen for the click event even if there is touch to cater for touchscreen laptops
	                    $document.on('click', eventHandler);

	                    // when the scope is destroyed, clean up the documents event handlers as we don't want it hanging around
	                    $scope.$on('$destroy', function() {
	                        if (_hasTouch()) {
	                            $document.off('touchstart', eventHandler);
	                        }

	                        $document.off('click', eventHandler);
	                    });

	                    /**
	                     * @description Private function to attempt to figure out if we are on a touch device
	                     * @private
	                     **/
	                    function _hasTouch() {
	                        // works on most browsers, IE10/11 and Surface
	                        return 'ontouchstart' in window || navigator.maxTouchPoints;
	                    };
	                });
	            }
	        };
	    }
	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ColorPickerComponent = undefined;

	var _slicedToArray2 = __webpack_require__(3);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _assign = __webpack_require__(60);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(66);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(67);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _lodash = __webpack_require__(71);

	var _lodash2 = _interopRequireDefault(_lodash);

	__webpack_require__(72);

	var _color = __webpack_require__(74);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ColorPickerComponent = exports.ColorPickerComponent = function () {
	  ColorPickerComponent.$inject = ["$scope", "$element", "$attrs"];
	  function ColorPickerComponent($scope, $element, $attrs) {
	    'ngInject';

	    (0, _classCallCheck3.default)(this, ColorPickerComponent);
	    (0, _assign2.default)(this, {
	      $scope: $scope,
	      $element: $element,
	      $attrs: $attrs
	    });

	    this.selectColor = (0, _lodash2.default)(this._selectColor, 50);

	    this.hueMouseDown_bound = this.hueMouseDown.bind(this);
	    this.alphaMouseDown_bound = this.alphaMouseDown.bind(this);
	    this.hslMouseDown_bound = this.hslMouseDown.bind(this);
	    this.bodyMouseMove_bound = this.bodyMouseMove.bind(this);
	    this.bodyMouseUp_bound = this.bodyMouseUp.bind(this);
	  }

	  (0, _createClass3.default)(ColorPickerComponent, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.showCmykColors = typeof this.$attrs.cmykColors !== 'undefined';
	      this.showAlpha = typeof this.$attrs.alphaColors !== 'undefined';
	      this.showSelectedValue = typeof this.$attrs.showSelectedValue !== 'undefined';
	    }
	  }, {
	    key: '$onDestroy',
	    value: function $onDestroy() {
	      this.detachEventListeners();
	    }
	  }, {
	    key: 'detachEventListeners',
	    value: function detachEventListeners() {
	      if (!this.domRefs) {
	        return;
	      }

	      this.domRefs.alphaContainer.removeEventListener('mousedown', this.alphaMouseDown_bound);
	      this.domRefs.hueContainer.removeEventListener('mousedown', this.hueMouseDown_bound);
	      this.domRefs.hslContainer.removeEventListener('mousedown', this.hslMouseDown_bound);
	      this.domRefs.body.removeEventListener('mousemove', this.bodyMouseMove_bound);
	      this.domRefs.body.removeEventListener('mouseup', this.bodyMouseUp_bound);

	      this.domRefs = null;
	    }
	  }, {
	    key: 'setHue',
	    value: function setHue(hue) {
	      this.selectedHue = hue;
	      var htmlHue = _color.ColorUtils.rgbaToHtml(_color.ColorUtils.hsbToRgba([hue, 1, 1]));
	      this.domRefs.lightnessHslContainer.style.backgroundColor = htmlHue;
	      this.domRefs.hueHandle.style.left = hue * 100 + '%';
	    }
	  }, {
	    key: 'setAlpha',
	    value: function setAlpha(alpha) {
	      this.selectedAlpha = alpha;
	      this.domRefs.alphaHandle.style.left = alpha * 100 + '%';
	    }
	  }, {
	    key: 'setLightnessSaturation',
	    value: function setLightnessSaturation(lightness, saturation) {
	      this.selectedSaturation = saturation;
	      this.selectedLightness = lightness;
	      this.domRefs.hslHandle.style.left = lightness * 100 + '%';
	      this.domRefs.hslHandle.style.top = (1 - saturation) * 100 + '%';
	    }
	  }, {
	    key: 'selectColorFromHsl',
	    value: function selectColorFromHsl() {
	      var rgbColor = _color.ColorUtils.hsbToRgba([this.selectedHue, this.selectedSaturation, this.selectedLightness]);

	      this.setAlphaOverlay(rgbColor);

	      rgbColor[3] = this.selectedAlpha;

	      this.selectColor(_color.ColorUtils.rgbaToHtml(rgbColor));
	    }
	  }, {
	    key: 'setAlphaOverlay',
	    value: function setAlphaOverlay(rgb) {
	      this.domRefs.alphaOverlay.style.background = _color.ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1], '-webkit-');
	      this.domRefs.alphaOverlay.style.background = _color.ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1], '-moz-');
	      this.domRefs.alphaOverlay.style.background = _color.ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1], '-ms-');
	      this.domRefs.alphaOverlay.style.background = _color.ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1]);
	    }
	  }, {
	    key: 'refreshSelectedCmykColor',
	    value: function refreshSelectedCmykColor() {
	      var rgbColor = _color.ColorUtils.hsbToRgba([this.selectedHue, this.selectedSaturation, this.selectedLightness]);

	      this.setCmyk(_color.ColorUtils.rgbaToCmyk(rgbColor));
	    }
	  }, {
	    key: 'selectAlphaFromEvent',
	    value: function selectAlphaFromEvent(e) {
	      if (this.selectingAlpha) {
	        var offset = e.pageX - this.selectingAlpha[0];

	        offset = Math.min(offset, this.domRefs.alphaContainer.clientWidth);
	        offset = Math.max(offset, 0);

	        this.setAlpha(offset / this.domRefs.alphaContainer.clientWidth);
	        this.selectColorFromHsl();
	        this.refreshSelectedCmykColor();
	      }
	    }
	  }, {
	    key: 'selectHueFromEvent',
	    value: function selectHueFromEvent(e) {
	      if (this.selectingHue) {
	        var offset = e.pageX - this.selectingHue[0];
	        offset = Math.min(offset, this.domRefs.hueContainer.clientWidth);
	        offset = Math.max(offset, 0);

	        this.setHue(offset / this.domRefs.hueContainer.clientWidth);
	        this.selectColorFromHsl();
	        this.refreshSelectedCmykColor();
	      }
	    }
	  }, {
	    key: 'selectSaturationFromEvent',
	    value: function selectSaturationFromEvent(e) {
	      if (this.selectingSaturation) {
	        var offsetX = e.pageX - this.selectingSaturation[0];
	        var offsetY = e.pageY - this.selectingSaturation[1];
	        offsetX = Math.min(Math.max(offsetX, 0), this.domRefs.hslContainer.clientWidth);
	        offsetY = Math.min(Math.max(offsetY, 0), this.domRefs.hslContainer.clientHeight);
	        var saturation = 1.0 - offsetY / this.domRefs.hslContainer.clientHeight;
	        var lightness = offsetX / this.domRefs.hslContainer.clientWidth;

	        this.setLightnessSaturation(lightness, saturation);
	        this.selectColorFromHsl();
	        this.refreshSelectedCmykColor();
	      }
	    }
	  }, {
	    key: 'hueMouseDown',
	    value: function hueMouseDown(e) {
	      this.selectingHue = [this.domRefs.hueContainer.getBoundingClientRect().left];
	      this.selectHueFromEvent(e);
	      ColorPickerComponent.blockPageSelecting(true);
	    }
	  }, {
	    key: 'alphaMouseDown',
	    value: function alphaMouseDown(e) {
	      this.selectingAlpha = [this.domRefs.alphaContainer.getBoundingClientRect().left];
	      this.selectAlphaFromEvent(e);
	      ColorPickerComponent.blockPageSelecting(true);
	    }
	  }, {
	    key: 'hslMouseDown',
	    value: function hslMouseDown(e) {
	      this.selectingSaturation = [this.domRefs.hslContainer.getBoundingClientRect().left, this.domRefs.hslContainer.getBoundingClientRect().top];
	      this.selectSaturationFromEvent(e);
	      ColorPickerComponent.blockPageSelecting(true);
	    }
	  }, {
	    key: 'bodyMouseMove',
	    value: function bodyMouseMove(e) {
	      this.selectHueFromEvent(e);
	      this.selectSaturationFromEvent(e);
	      this.selectAlphaFromEvent(e);
	    }
	  }, {
	    key: 'bodyMouseUp',
	    value: function bodyMouseUp() {
	      this.selectingSaturation = null;
	      this.selectingHue = null;
	      this.selectingAlpha = null;
	      ColorPickerComponent.blockPageSelecting(false);
	    }
	  }, {
	    key: 'attachEventListeners',
	    value: function attachEventListeners() {
	      this.domRefs = {
	        body: document.body,
	        lightnessHslContainer: this.$element[0].querySelector('.js-lightness-saturation'),
	        hslContainer: this.$element[0].querySelector('.js-hsl-container'),
	        hslHandle: this.$element[0].querySelector('.js-hsl-handle'),

	        hueContainer: this.$element[0].querySelector('.js-hue-container'),
	        hueHandle: this.$element[0].querySelector('.js-hue-handle'),

	        alphaContainer: this.$element[0].querySelector('.js-alpha-container'),
	        alphaHandle: this.$element[0].querySelector('.js-alpha-handle'),
	        alphaOverlay: this.$element[0].querySelector('.js-alpha-overlay')
	      };

	      this.domRefs.alphaContainer.addEventListener('mousedown', this.alphaMouseDown_bound);
	      this.domRefs.hueContainer.addEventListener('mousedown', this.hueMouseDown_bound);
	      this.domRefs.hslContainer.addEventListener('mousedown', this.hslMouseDown_bound);
	      this.domRefs.body.addEventListener('mousemove', this.bodyMouseMove_bound);
	      this.domRefs.body.addEventListener('mouseup', this.bodyMouseUp_bound);
	    }
	  }, {
	    key: 'togglePopup',
	    value: function togglePopup() {
	      if (this.popupShown) {
	        this.hidePopup();
	      } else {
	        this.showPopup();
	      }
	    }
	  }, {
	    key: 'onPopupShown',
	    value: function onPopupShown() {
	      this.attachEventListeners();
	      this.restoreColors();
	    }
	  }, {
	    key: 'setCmyk',
	    value: function setCmyk(cmyk) {
	      var _cmyk = (0, _slicedToArray3.default)(cmyk, 4);

	      this.cmykC = _cmyk[0];
	      this.cmykM = _cmyk[1];
	      this.cmykY = _cmyk[2];
	      this.cmykK = _cmyk[3];
	    }
	  }, {
	    key: 'restoreHsl',
	    value: function restoreHsl(rgbValues) {
	      if (rgbValues[3]) {
	        this.setAlpha(rgbValues[3]);
	      }

	      var hslValues = _color.ColorUtils.rgbaToHsb(rgbValues);

	      if (hslValues) {
	        this.setAlphaOverlay(rgbValues);
	        this.setHue(hslValues[0]);
	        this.setLightnessSaturation(hslValues[2], hslValues[1]);
	      }
	    }
	  }, {
	    key: 'restoreColors',
	    value: function restoreColors() {
	      var rgbValues = _color.ColorUtils.htmlColorToRgba(this.ngModel.$viewValue);

	      if (!rgbValues) {
	        rgbValues = [0, 0, 0, 1];
	        this.selectColor(_color.ColorUtils.rgbaToHtml(rgbValues));
	      }

	      this.setCmyk(_color.ColorUtils.rgbaToCmyk(rgbValues));
	      this.restoreHsl(rgbValues);
	      this.selectedColorString = _color.ColorUtils.rgbaToHtml(rgbValues);
	    }
	  }, {
	    key: 'showPopup',
	    value: function showPopup() {
	      this.popupShown = true;
	    }
	  }, {
	    key: 'hidePopup',
	    value: function hidePopup() {
	      this.popupShown = false;
	      this.detachEventListeners();
	    }
	  }, {
	    key: '_selectColor',
	    value: function _selectColor(val) {
	      this.ngModel.$setViewValue(val);
	      this.selectedColorString = val;
	      this.ngChange({});
	    }
	  }, {
	    key: 'cmykChanged',
	    value: function cmykChanged() {
	      var rgbValues = _color.ColorUtils.cmykToRgba([this.cmykC, this.cmykM, this.cmykY, this.cmykK]);
	      this.restoreHsl(rgbValues);
	      this.selectColorFromHsl();
	    }
	  }, {
	    key: 'selectColorAndHide',
	    value: function selectColorAndHide(val) {
	      this.selectColor(val);
	      this.popupShown = false;
	    }
	  }], [{
	    key: 'blockPageSelecting',
	    value: function blockPageSelecting(block) {
	      var body = document.body;
	      var value = block ? 'none' : '';

	      body.style.webkitUserSelect = value;
	      body.style.khtmlUserSelect = value;
	      body.style.mozUserSelect = value;
	      body.style.msUserSelect = value;
	      body.style.userSelect = value;
	    }
	  }]);
	  return ColorPickerComponent;
	}();

	ColorPickerComponent.NAME = 'ngChroma';
	ColorPickerComponent.OPTIONS = {
	  controller: ColorPickerComponent,
	  template: __webpack_require__(75),
	  require: {
	    ngModel: 'ngModel'
	  },
	  bindings: {
	    ngChange: '&ngChange',
	    customColors: '<',
	    customColorsLabel: '@'
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(4);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(56);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(52);
	module.exports = __webpack_require__(54);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var global        = __webpack_require__(18)
	  , hide          = __webpack_require__(22)
	  , Iterators     = __webpack_require__(10)
	  , TO_STRING_TAG = __webpack_require__(49)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(8)
	  , step             = __webpack_require__(9)
	  , Iterators        = __webpack_require__(10)
	  , toIObject        = __webpack_require__(11);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(15)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(12)
	  , defined = __webpack_require__(14);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(13);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(16)
	  , $export        = __webpack_require__(17)
	  , redefine       = __webpack_require__(32)
	  , hide           = __webpack_require__(22)
	  , has            = __webpack_require__(33)
	  , Iterators      = __webpack_require__(10)
	  , $iterCreate    = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(50)
	  , ITERATOR       = __webpack_require__(49)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(18)
	  , core      = __webpack_require__(19)
	  , ctx       = __webpack_require__(20)
	  , hide      = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 18 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(23)
	  , createDesc = __webpack_require__(31);
	module.exports = __webpack_require__(27) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(24)
	  , IE8_DOM_DEFINE = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(30)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(27) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(27) && !__webpack_require__(28)(function(){
	  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(28)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25)
	  , document = __webpack_require__(18).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(25);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);

/***/ },
/* 33 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(35)
	  , descriptor     = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(48)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(22)(IteratorPrototype, __webpack_require__(49)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(24)
	  , dPs         = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(29)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(23)
	  , anObject = __webpack_require__(24)
	  , getKeys  = __webpack_require__(37);

	module.exports = __webpack_require__(27) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(38)
	  , enumBugKeys = __webpack_require__(46);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(33)
	  , toIObject    = __webpack_require__(11)
	  , arrayIndexOf = __webpack_require__(39)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(11)
	  , toLength  = __webpack_require__(40)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(41)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(41)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(18)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(23).f
	  , has = __webpack_require__(33)
	  , TAG = __webpack_require__(49)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(18).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(33)
	  , toObject    = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(14);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(53)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(15)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(41)
	  , defined   = __webpack_require__(14);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(55)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(10);
	module.exports = __webpack_require__(19).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(13)
	  , TAG = __webpack_require__(49)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(52);
	module.exports = __webpack_require__(58);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(24)
	  , get      = __webpack_require__(59);
	module.exports = __webpack_require__(19).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(55)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(10);
	module.exports = __webpack_require__(19).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	module.exports = __webpack_require__(19).Object.assign;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(17);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(63)});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(37)
	  , gOPS     = __webpack_require__(64)
	  , pIE      = __webpack_require__(65)
	  , toObject = __webpack_require__(51)
	  , IObject  = __webpack_require__(12)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(28)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 64 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 65 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(68);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	var $Object = __webpack_require__(19).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(17);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(27), 'Object', {defineProperty: __webpack_require__(23).f});

/***/ },
/* 71 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = throttle;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 72 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 73 */,
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ColorUtils = undefined;

	var _slicedToArray2 = __webpack_require__(3);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _classCallCheck2 = __webpack_require__(66);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(67);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ColorUtils = exports.ColorUtils = function () {
	  function ColorUtils() {
	    (0, _classCallCheck3.default)(this, ColorUtils);
	  }

	  (0, _createClass3.default)(ColorUtils, null, [{
	    key: 'createGradient',
	    value: function createGradient(direction, start, end) {
	      var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	      return prefix + 'linear-gradient(' + direction + ',\n      rgba(' + start[0] + ',' + start[1] + ', ' + start[2] + ', ' + start[3] + '),\n      rgba(' + end[0] + ', ' + end[1] + ', ' + end[2] + ', ' + end[3] + '))';
	    }
	  }, {
	    key: 'rgbaToHtml',
	    value: function rgbaToHtml(rgba) {
	      if (typeof rgba[3] === 'number' && rgba[3] < 1.0) {
	        return ColorUtils.rgbaToRgbaHtml(rgba);
	      }

	      return ColorUtils.rgbaToHexHtml(rgba);
	    }
	  }, {
	    key: 'rgbaToRgbaHtml',
	    value: function rgbaToRgbaHtml(rgba) {
	      var alpha = typeof rgba[3] === 'number' ? rgba[3] : 1;
	      alpha = alpha.toString().substr(0, 4);
	      return 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + alpha + ')';
	    }
	  }, {
	    key: 'rgbaToHexHtml',
	    value: function rgbaToHexHtml(rgba) {
	      var ret = '#';
	      ret += ('0' + parseInt(rgba[0], 10).toString(16)).slice(-2);
	      ret += ('0' + parseInt(rgba[1], 10).toString(16)).slice(-2);
	      ret += ('0' + parseInt(rgba[2], 10).toString(16)).slice(-2);
	      return ret;
	    }
	  }, {
	    key: 'hsbToRgba',
	    value: function hsbToRgba(hsv) {
	      var _hsv = (0, _slicedToArray3.default)(hsv, 3),
	          h = _hsv[0],
	          s = _hsv[1],
	          v = _hsv[2];

	      var r = void 0;
	      var g = void 0;
	      var b = void 0;

	      var i = Math.floor(h * 6);
	      var f = h * 6 - i;
	      var p = v * (1 - s);
	      var q = v * (1 - f * s);
	      var t = v * (1 - (1 - f) * s);

	      switch (i % 6) {
	        case 0:
	          r = v;
	          g = t;
	          b = p;
	          break;
	        case 1:
	          r = q;
	          g = v;
	          b = p;
	          break;
	        case 2:
	          r = p;
	          g = v;
	          b = t;
	          break;
	        case 3:
	          r = p;
	          g = q;
	          b = v;
	          break;
	        case 4:
	          r = t;
	          g = p;
	          b = v;
	          break;
	        case 5:
	          r = v;
	          g = p;
	          b = q;
	          break;
	        default:
	          break;
	      }
	      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1];
	    }
	  }, {
	    key: 'rgbaToHsb',
	    value: function rgbaToHsb(rgba) {
	      var _rgba = (0, _slicedToArray3.default)(rgba, 3),
	          r = _rgba[0],
	          g = _rgba[1],
	          b = _rgba[2];

	      var max = Math.max(r, g, b);
	      var min = Math.min(r, g, b);
	      var d = max - min;
	      var s = max === 0 ? 0 : d / max;
	      var v = max / 255;

	      var h = void 0;

	      switch (max) {
	        case min:
	          h = 0;
	          break;
	        case r:
	          h = g - b + d * (g < b ? 6 : 0);
	          h /= 6 * d;
	          break;
	        case g:
	          h = b - r + d * 2;
	          h /= 6 * d;
	          break;
	        case b:
	          h = r - g + d * 4;
	          h /= 6 * d;
	          break;
	        default:
	          break;
	      }

	      return [h, s, v];
	    }
	  }, {
	    key: 'htmlColorToRgba',
	    value: function htmlColorToRgba(input) {
	      var rgbaResult = /^rgba?[\s]?\(\s*(\d+)\s*\,\s*(\d+)\s*,\s*(\d+)\s*,?\s*([\d\.]+)?/i.exec(input);

	      if (rgbaResult) {
	        return [parseInt(rgbaResult[1], 10), parseInt(rgbaResult[2], 10), parseInt(rgbaResult[3], 10), parseFloat(rgbaResult[4], 10) || 1];
	      }

	      var hexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input);
	      if (hexResult) {
	        return [parseInt(hexResult[1], 16), parseInt(hexResult[2], 16), parseInt(hexResult[3], 16), 1];
	      }

	      return null;
	    }
	  }, {
	    key: 'rgbaToCmyk',
	    value: function rgbaToCmyk(rgba) {
	      var c = void 0;
	      var m = void 0;
	      var y = void 0;
	      var k = void 0;

	      var r = rgba[0] / 255;
	      var g = rgba[1] / 255;
	      var b = rgba[2] / 255;

	      k = Math.min(1 - r, 1 - g, 1 - b);
	      c = (1 - r - k) / (1 - k);
	      m = (1 - g - k) / (1 - k);
	      y = (1 - b - k) / (1 - k);

	      c = Math.round(c * 100) || 0;
	      m = Math.round(m * 100) || 0;
	      y = Math.round(y * 100) || 0;
	      k = Math.round(k * 100);

	      return [c, m, y, k];
	    }
	  }, {
	    key: 'cmykToRgba',
	    value: function cmykToRgba(cmyk) {
	      var r = void 0;
	      var g = void 0;
	      var b = void 0;

	      var _cmyk = (0, _slicedToArray3.default)(cmyk, 4),
	          c = _cmyk[0],
	          m = _cmyk[1],
	          y = _cmyk[2],
	          k = _cmyk[3];

	      c /= 100;
	      m /= 100;
	      y /= 100;
	      k /= 100;

	      r = 1 - Math.min(1, c * (1 - k) + k);
	      g = 1 - Math.min(1, m * (1 - k) + k);
	      b = 1 - Math.min(1, y * (1 - k) + k);

	      r = Math.round(r * 255);
	      g = Math.round(g * 255);
	      b = Math.round(b * 255);

	      return [r, g, b, 1];
	    }
	  }]);
	  return ColorUtils;
	}();

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = "<div class=\"color-picker\" click-outside=\"$ctrl.hidePopup()\">\n    <button ng-click=\"$ctrl.togglePopup()\" class=\"main-button\" ng-class=\"{'isActive': $ctrl.popupShown}\">\n        <div class=\"main-button-background\">\n            <div class=\"main-button-preview\" style=\"background-color: {{$ctrl.ngModel.$viewValue}}\"></div>\n        </div>\n        <i class=\"main-button-caret\"></i>\n    </button>\n    <div class=\"color-picker-selector js-selector\" ng-class=\"{'isShown': $ctrl.popupShown}\" ng-if=\"$ctrl.popupShown\" ng-init=\"$ctrl.onPopupShown()\">\n        <div class=\"user-color-label\" ng-bind=\"::($ctrl.customColorsLabel)\" ng-if=\"::($ctrl.customColorsLabel)\"></div>\n        <div class=\"user-color-container\" ng-if=\"::($ctrl.customColors)\">\n            <button ng-click=\"$ctrl.selectColorAndHide(stdColor)\" ng-repeat=\"stdColor in ::($ctrl.customColors) track by $index\" class=\"user-color\">\n                <div class=\"user-color-preview\" style=\"background-color: {{::stdColor}}\"></div>\n            </button>\n        </div>\n        <div class=\"separator\" ng-if=\"::($ctrl.customColors)\"></div>\n        <div class=\"hsl-selector-container\">\n            <div class=\"hsl-selector-lightness-saturation js-lightness-saturation\">\n                <div class=\"hsl-selector-lightness\">\n                </div>\n                <div class=\"hsl-selector-saturation js-hsl-container\">\n                    <div class=\"hsl-selector-saturation-handle js-hsl-handle\"></div>\n                </div>\n            </div>\n            <div class=\"margin\"></div>\n            <div class=\"hsl-selector-hue js-hue-container\">\n                <div class=\"hsl-selector-hue-handle js-hue-handle\"></div>\n            </div>\n        </div>\n        <div class=\"margin\"></div>\n        <div class=\"alpha-selector\" ng-show=\"::($ctrl.showAlpha)\">\n            <div class=\"alpha-selector-track js-alpha-container\">\n                <div class=\"alpha-selector-overlay js-alpha-overlay\">\n                </div>\n                <div class=\"alpha-selector-handle js-alpha-handle\"></div>\n            </div>\n        </div>\n        <div class=\"picker-cmyk-container\" ng-if=\"::($ctrl.showCmykColors)\">\n            <div class=\"margin\"></div>\n            <div class=\"picker-cmyk\">\n                <div class=\"picker-cmyk-input\">\n                    <span>C:</span>\n                    <input min=\"0\" max=\"100\" type=\"number\" ng-model=\"$ctrl.cmykC\" ng-change=\"$ctrl.cmykChanged()\" />\n                </div>\n                <div class=\"picker-cmyk-input\">\n                    <span>M:</span>\n                    <input min=\"0\" max=\"100\" type=\"number\" ng-model=\"$ctrl.cmykM\" ng-change=\"$ctrl.cmykChanged()\" />\n                </div>\n                <div class=\"picker-cmyk-input\">\n                    <span>Y:</span>\n                    <input min=\"0\" max=\"100\" type=\"number\" ng-model=\"$ctrl.cmykY\" ng-change=\"$ctrl.cmykChanged()\" />\n                </div>\n                <div class=\"picker-cmyk-input\">\n                    <span>K:</span>\n                    <input min=\"0\" max=\"100\" type=\"number\" ng-model=\"$ctrl.cmykK\" ng-change=\"$ctrl.cmykChanged()\" />\n                </div>\n            </div>\n        </div>\n        <div class=\"selected-color\" ng-show=\"::($ctrl.showSelectedValue)\">\n            <div class=\"margin\"></div>\n            <span class=\"selected-color-label\">Selected color:</span> <span class=\"selected-color-value\">{{$ctrl.selectedColorString}}</span>\n        </div>\n    </div>\n</div>\n"

/***/ }
/******/ ]);
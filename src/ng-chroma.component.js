import _throttle from 'lodash.throttle';

import './ng-chroma.styles.less';

import { ColorUtils } from './color.utils';

export class ColorPickerComponent {
  static NAME = 'ngChroma';
  static OPTIONS = {
    controller: ColorPickerComponent,
    template: require('./ng-chroma.template.html'),
    require: {
      ngModel: 'ngModel',
    },
    bindings: {
      ngChange: '&ngChange',
      customColors: '<',
      customColorsLabel: '@',
    },
  };

  constructor($scope, $element, $attrs) {
    'ngInject';

    Object.assign(this, {
      $scope,
      $element,
      $attrs,
    });

    this.selectColor = _throttle(this._selectColor, 50);

    this.hueMouseDown_bound = this.hueMouseDown.bind(this);
    this.alphaMouseDown_bound = this.alphaMouseDown.bind(this);
    this.hslMouseDown_bound = this.hslMouseDown.bind(this);
    this.bodyMouseMove_bound = this.bodyMouseMove.bind(this);
    this.bodyMouseUp_bound = this.bodyMouseUp.bind(this);
  }

  $onInit() {
    this.showCmykColors = typeof this.$attrs.cmykColors !== 'undefined';
    this.showAlpha = typeof this.$attrs.alphaColors !== 'undefined';
    this.showSelectedValue = typeof this.$attrs.showSelectedValue !== 'undefined';
  }

  $onDestroy() {
    this.detachEventListeners();
  }

  detachEventListeners() {
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

  setHue(hue) {
    this.selectedHue = hue;
    const htmlHue = ColorUtils.rgbaToHtml(ColorUtils.hsbToRgba([hue, 1, 1]));
    this.domRefs.lightnessHslContainer.style.backgroundColor = htmlHue;
    this.domRefs.hueHandle.style.left = `${(hue * 100)}%`;
  }

  setAlpha(alpha) {
    this.selectedAlpha = alpha;
    this.domRefs.alphaHandle.style.left = `${(alpha * 100)}%`;
  }

  setLightnessSaturation(lightness, saturation) {
    this.selectedSaturation = saturation;
    this.selectedLightness = lightness;
    this.domRefs.hslHandle.style.left = `${(lightness * 100)}%`;
    this.domRefs.hslHandle.style.top = `${((1 - saturation) * 100)}%`;
  }

  selectColorFromHsl() {
    const rgbColor = ColorUtils.hsbToRgba([
      this.selectedHue,
      this.selectedSaturation,
      this.selectedLightness,
    ]);

    this.setAlphaOverlay(rgbColor);

    rgbColor[3] = this.selectedAlpha;

    this.selectColor(ColorUtils.rgbaToHtml(rgbColor));
  }

  setAlphaOverlay(rgb) {
    this.domRefs.alphaOverlay.style.background =
      ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1], '-webkit-');
    this.domRefs.alphaOverlay.style.background =
      ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1], '-moz-');
    this.domRefs.alphaOverlay.style.background =
      ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1], '-ms-');
    this.domRefs.alphaOverlay.style.background =
      ColorUtils.createGradient('to right', [0, 0, 0, 0], [rgb[0], rgb[1], rgb[2], 1]);
  }

  refreshSelectedCmykColor() {
    const rgbColor = ColorUtils.hsbToRgba([
      this.selectedHue,
      this.selectedSaturation,
      this.selectedLightness,
    ]);

    this.setCmyk(ColorUtils.rgbaToCmyk(rgbColor));
  }

  selectAlphaFromEvent(e) {
    if (this.selectingAlpha) {
      let offset = e.pageX - this.selectingAlpha[0];

      offset = Math.min(offset, this.domRefs.alphaContainer.clientWidth);
      offset = Math.max(offset, 0);

      this.setAlpha(offset / this.domRefs.alphaContainer.clientWidth);
      this.selectColorFromHsl();
      this.refreshSelectedCmykColor();
    }
  }

  selectHueFromEvent(e) {
    if (this.selectingHue) {
      let offset = e.pageX - this.selectingHue[0];
      offset = Math.min(offset, this.domRefs.hueContainer.clientWidth);
      offset = Math.max(offset, 0);

      this.setHue(offset / this.domRefs.hueContainer.clientWidth);
      this.selectColorFromHsl();
      this.refreshSelectedCmykColor();
    }
  }

  static blockPageSelecting(block) {
    const body = document.body;
    const value = block ? 'none' : '';

    body.style.webkitUserSelect = value;
    body.style.khtmlUserSelect = value;
    body.style.mozUserSelect = value;
    body.style.msUserSelect = value;
    body.style.userSelect = value;
  }

  selectSaturationFromEvent(e) {
    if (this.selectingSaturation) {
      let offsetX = e.pageX - this.selectingSaturation[0];
      let offsetY = e.pageY - this.selectingSaturation[1];
      offsetX = Math.min(Math.max(offsetX, 0), this.domRefs.hslContainer.clientWidth);
      offsetY = Math.min(Math.max(offsetY, 0), this.domRefs.hslContainer.clientHeight);
      const saturation = 1.0 - (offsetY / this.domRefs.hslContainer.clientHeight);
      const lightness = offsetX / this.domRefs.hslContainer.clientWidth;

      this.setLightnessSaturation(lightness, saturation);
      this.selectColorFromHsl();
      this.refreshSelectedCmykColor();
    }
  }

  hueMouseDown(e) {
    this.selectingHue = [this.domRefs.hueContainer.getBoundingClientRect().left];
    this.selectHueFromEvent(e);
    ColorPickerComponent.blockPageSelecting(true);
  }

  alphaMouseDown(e) {
    this.selectingAlpha = [this.domRefs.alphaContainer.getBoundingClientRect().left];
    this.selectAlphaFromEvent(e);
    ColorPickerComponent.blockPageSelecting(true);
  }

  hslMouseDown(e) {
    this.selectingSaturation = [
      this.domRefs.hslContainer.getBoundingClientRect().left,
      this.domRefs.hslContainer.getBoundingClientRect().top,
    ];
    this.selectSaturationFromEvent(e);
    ColorPickerComponent.blockPageSelecting(true);
  }

  bodyMouseMove(e) {
    this.selectHueFromEvent(e);
    this.selectSaturationFromEvent(e);
    this.selectAlphaFromEvent(e);
  }

  bodyMouseUp() {
    this.selectingSaturation = null;
    this.selectingHue = null;
    this.selectingAlpha = null;
    ColorPickerComponent.blockPageSelecting(false);
  }

  attachEventListeners() {
    this.domRefs = {
      body: document.body,
      lightnessHslContainer: this.$element[0].querySelector('.js-lightness-saturation'),
      hslContainer: this.$element[0].querySelector('.js-hsl-container'),
      hslHandle: this.$element[0].querySelector('.js-hsl-handle'),

      hueContainer: this.$element[0].querySelector('.js-hue-container'),
      hueHandle: this.$element[0].querySelector('.js-hue-handle'),

      alphaContainer: this.$element[0].querySelector('.js-alpha-container'),
      alphaHandle: this.$element[0].querySelector('.js-alpha-handle'),
      alphaOverlay: this.$element[0].querySelector('.js-alpha-overlay'),
    };

    this.domRefs.alphaContainer.addEventListener('mousedown', this.alphaMouseDown_bound);
    this.domRefs.hueContainer.addEventListener('mousedown', this.hueMouseDown_bound);
    this.domRefs.hslContainer.addEventListener('mousedown', this.hslMouseDown_bound);
    this.domRefs.body.addEventListener('mousemove', this.bodyMouseMove_bound);
    this.domRefs.body.addEventListener('mouseup', this.bodyMouseUp_bound);
  }

  togglePopup() {
    if (this.popupShown) {
      this.hidePopup();
    } else {
      this.showPopup();
    }
  }

  onPopupShown() {
    this.attachEventListeners();
    this.restoreColors();
  }

  setCmyk(cmyk) {
    [this.cmykC, this.cmykM, this.cmykY, this.cmykK] = cmyk;
  }

  restoreHsl(rgbValues) {
    if (rgbValues[3]) {
      this.setAlpha(rgbValues[3]);
    }

    const hslValues = ColorUtils.rgbaToHsb(rgbValues);

    if (hslValues) {
      this.setAlphaOverlay(rgbValues);
      this.setHue(hslValues[0]);
      this.setLightnessSaturation(hslValues[2], hslValues[1]);
    }
  }

  restoreColors() {
    let rgbValues = ColorUtils.htmlColorToRgba(this.ngModel.$viewValue);

    if (!rgbValues) {
      rgbValues = [0, 0, 0, 1];
      this.selectColor(ColorUtils.rgbaToHtml(rgbValues));
    }

    this.setCmyk(ColorUtils.rgbaToCmyk(rgbValues));
    this.restoreHsl(rgbValues);
    this.selectedColorString = ColorUtils.rgbaToHtml(rgbValues);
  }

  showPopup() {
    this.popupShown = true;
  }

  hidePopup() {
    this.popupShown = false;
    this.detachEventListeners();
  }

  _selectColor(val) {
    this.ngModel.$setViewValue(val);
    this.selectedColorString = val;
    this.ngChange({});
  }

  cmykChanged() {
    const rgbValues = ColorUtils.cmykToRgba([this.cmykC, this.cmykM, this.cmykY, this.cmykK]);
    this.restoreHsl(rgbValues);
    this.selectColorFromHsl();
  }

  selectColorAndHide(val) {
    this.selectColor(val);
    this.popupShown = false;
  }
}

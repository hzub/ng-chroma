import $ from 'jquery';
import _ from 'lodash';

import './ng-chroma.styles.less';

import { ColorUtils } from './color.utils';

// import { STANDARD_COLORS } from './standard-colors.constant.js';

const STANDARD_COLORS = [];

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
    },
  };

  constructor($scope, $element) {
    'ngInject';
    Object.assign(this, {
      $scope,
      $element,
    });
    this.standardColors = STANDARD_COLORS;

    // TODO: Remove this filthy mock!
    this.userColors = [
      '#ff0000',
      '#0000ff',
    ];

    this.selectColor = _.throttle(this._selectColor, 50);

    this.hueMouseDown_bound = this.hueMouseDown.bind(this);
    this.hslMouseDown_bound = this.hslMouseDown.bind(this);
    this.bodyMouseMove_bound = this.bodyMouseMove.bind(this);
    this.bodyMouseUp_bound = this.bodyMouseUp.bind(this);
  }

  $onDestroy() {
    this.detachEventListeners();
  }

  detachEventListeners() {
    if (!this.domRefs) {
      return;
    }

    this.domRefs.hueContainer.off('mousedown', this.hueMouseDown_bound);
    this.domRefs.hslContainer.off('mousedown', this.hslMouseDown_bound);
    this.domRefs.body.off('mousemove', this.bodyMouseMove_bound);
    this.domRefs.body.off('mouseup', this.bodyMouseUp_bound);

    this.domRefs = null;
  }

  setHue(hue) {
    this.selectedHue = hue;
    const htmlHue = ColorUtils.rgbToHtml(ColorUtils.hsbToRgb([hue, 1, 1]));
    this.domRefs.lightnesshslContainer.css('backgroundColor', htmlHue);
    this.domRefs.hueHandle.css('left', `${(hue * 100)}%`);
  }

  setLightnessSaturation(lightness, saturation) {
    this.selectedSaturation = saturation;
    this.selectedLightness = lightness;
    this.domRefs.hslHandle.css('left', `${(lightness * 100)}%`);
    this.domRefs.hslHandle.css('top', `${((1 - saturation) * 100)}%`);
  }

  selectColorFromHsl() {
    const rgbColor = ColorUtils.hsbToRgb([
      this.selectedHue,
      this.selectedSaturation,
      this.selectedLightness,
    ]);

    this.selectColor(ColorUtils.rgbToHtml(rgbColor));
  }

  refreshSelectedCmykColor() {
    const rgbColor = ColorUtils.hsbToRgb([
      this.selectedHue,
      this.selectedSaturation,
      this.selectedLightness,
    ]);

    this.setCmyk(ColorUtils.rgbToCmyk(rgbColor));
  }

  selectHueFromEvent(e) {
    if (this.selectingHue) {
      let offset = e.pageX - this.selectingHue[0];
      offset = Math.min(offset, this.domRefs.hueContainer.width());
      offset = Math.max(offset, 0);

      this.setHue(offset / this.domRefs.hueContainer.width());
      this.selectColorFromHsl();
      this.refreshSelectedCmykColor();
    }
  }

  blockPageSelecting(block) {
    const body = $('body');
    const value = block ? 'none' : '';

    body.css('-webkit-user-select', value);
    body.css('-khtml-user-select', value);
    body.css('-moz-user-select', value);
    body.css('-ms-user-select', value);
    body.css('user-select', value);
  }

  selectSaturationFromEvent(e) {
    if (this.selectingSaturation) {
      let offsetX = e.pageX - this.selectingSaturation[0];
      let offsetY = e.pageY - this.selectingSaturation[1];
      offsetX = Math.min(Math.max(offsetX, 0), this.domRefs.hslContainer.width());
      offsetY = Math.min(Math.max(offsetY, 0), this.domRefs.hslContainer.height());
      const saturation = 1.0 - (offsetY / this.domRefs.hslContainer.height());
      const lightness = offsetX / this.domRefs.hslContainer.width();

      this.setLightnessSaturation(lightness, saturation);
      this.selectColorFromHsl();
      this.refreshSelectedCmykColor();
    }
  }

  hueMouseDown(e) {
    this.selectingHue = [this.domRefs.hueContainer.offset().left];
    this.selectHueFromEvent(e);
    this.blockPageSelecting(true);
  }

  hslMouseDown(e) {
    this.selectingSaturation = [
      this.domRefs.hslContainer.offset().left,
      this.domRefs.hslContainer.offset().top,
    ];
    this.selectSaturationFromEvent(e);
    this.blockPageSelecting(true);
  }

  bodyMouseMove(e) {
    this.selectHueFromEvent(e);
    this.selectSaturationFromEvent(e);
  }

  bodyMouseUp() {
    this.selectingSaturation = null;
    this.selectingHue = null;
    this.blockPageSelecting(false);
  }

  attachEventListeners() {
    this.domRefs = {
      body: $('body'),
      hueContainer: $(this.$element).find('.js-hue-container'),
      lightnesshslContainer: $(this.$element).find('.js-lightness-saturation'),
      hslContainer: $(this.$element).find('.js-hsl-container'),
      hslHandle: $(this.$element).find('.js-hsl-handle'),
      hueHandle: $(this.$element).find('.js-hue-handle'),
    };

    this.domRefs.hueContainer.on('mousedown', this.hueMouseDown_bound);
    this.domRefs.hslContainer.on('mousedown', this.hslMouseDown_bound);
    this.domRefs.body.on('mousemove', this.bodyMouseMove_bound);
    this.domRefs.body.on('mouseup', this.bodyMouseUp_bound);
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
    const hslValues = ColorUtils.rgbToHsb(rgbValues);
    if (hslValues) {
      this.setHue(hslValues[0]);
      this.setLightnessSaturation(hslValues[2], hslValues[1]);
    }
  }

  restoreColors() {
    const rgbValues = ColorUtils.htmlColorToRgb(this.ngModel.$viewValue);

    if (rgbValues) {
      this.setCmyk(ColorUtils.rgbToCmyk(rgbValues));
      this.restoreHsl(rgbValues);
      this.selectedColorString = ColorUtils.rgbToHexHtml(rgbValues);
    }
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
    this.selectedColorString = ColorUtils.rgbToHexHtml(ColorUtils.htmlColorToRgb(val));
    this.ngChange({});
  }

  cmykChanged() {
    const rgbValues = ColorUtils.cmykToRgb([this.cmykC, this.cmykM, this.cmykY, this.cmykK]);
    this.restoreHsl(rgbValues);
    this.selectColorFromHsl();
  }

  selectColorAndHide(val) {
    this.selectColor(val);
    this.popupShown = false;
  }
}

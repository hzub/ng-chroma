import angular from 'angular';
import '@iamadamjowett/angular-click-outside';

import { ColorPickerComponent } from './ng-chroma.component.js';

console.info("AA", ColorPickerComponent.NAME, ColorPickerComponent.OPTIONS);

export default angular.module('hzub.ngChroma', ['angular-click-outside'])
  .component(ColorPickerComponent.NAME, ColorPickerComponent.OPTIONS)
  .name;

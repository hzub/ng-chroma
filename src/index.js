import '@iamadamjowett/angular-click-outside';

import { ColorPickerComponent } from './ng-chroma.component';

const moduleName = 'hzub.ngChroma';

const mod = angular.module(moduleName, ['angular-click-outside']);
mod.component(ColorPickerComponent.NAME, ColorPickerComponent.OPTIONS);

export default moduleName;


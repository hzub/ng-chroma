# ng-chroma

### Description

**ng-chroma** is component for choosing colors using spectrum HSV view, dedicated for Angular 1.5+.
Library was created with simplicity of customization and configuration in mind.

Its features includes:
* CMYK selector
* Alpha channel selector
* Displaying list of user-defined colors

# 1. Installing via npm

`npm install ng-chroma`

# 2. Importing ng-chroma to your project

### Using UMD (webpack etc.)

```
var ngChromaModule = require('ng-chroma');
angular.module('yourModule', [ngChromaModule]);
```

### Using ES6 modules

```
import ngChromaModule from 'ng-chroma';
angular.module('yourModule', [ngChromaModule]);
```

### Import CSS styles from `node_modules`

```
import 'ng-chroma/dist/ng-chroma.css';
```

If you're using webpack, `css-loader` or similar must be configured.
If you want to utilize style sources (or write your own), please refer to `src/ng-chroma.styles.less` file.

# 3. Usage
### 3.1 Simple usage
Just include component in your HTML and provide `ng-model`:

`<ng-chroma ng-model="myModel"></ng-chroma>`

It will render control, hook all event listeners and reflect any change to model in a two-way manner.

Preview:

![1]

### 3.2 With user provided predefined colors

```
// controller.js
$scope.myColors = ['#ff0000', '#0000ff'];
```

```
<!-- view.html -->
<ng-chroma ng-model="myModel" custom-colors="myColors"></ng-chroma>
```

Preview:

![2]

### 3.3 With user provided predefined colors and label

```
<!-- view.html -->
<ng-chroma ng-model="myModel" custom-colors="myColors" custom-colors-label="Saved colors:"></ng-chroma>
```

Preview:

![3]

### 3.4 With selected value indicator

```
<!-- view.html -->
<ng-chroma ng-model="myModel" show-selected-value></ng-chroma>
```

Preview:

![4]

### 3.5 With CMYK controls
```
<!-- view.html -->
<ng-chroma ng-model="myModel" cmyk-colors></ng-chroma>
```

Preview:

![5]

### 3.6 With alpha channel
```
<!-- view.html -->
<ng-chroma ng-model="myModel" alpha-colors></ng-chroma>
```

Preview:

![6]
# 4. Customizing component

All styles can be easily overriden, using following pattern:

```
<!-- view.html -->
<div class="myContainer">
  <ng-chroma ng-model="myModel" alpha-colors></ng-chroma>
</div>
```

```
/* style-override.css */
.myContainer ng-chroma .<element-class> { /* ... */ }
```

Below is shortened list of sub-component classes that you can customize:

* `.color-picker-selector` - Main popup element
* `.margin` - Margin between segments
* `.separator` - Separator between predefined colors and spectrum selector
* `.main-button`, `.main-button-preview`, `.main-caret` - Main button invoking popup and its elements
* `.user-color`, `.user-color-container`, `.user-color-preview`, `.user-color-label` - Buttons with predefined colors and their components
* `.picker-cmyk`, `.picker-cmyk-input` - Margin between segments
* `.hsl-selector-saturation` - Main spectrum saturation container
* `.hsl-selector-saturation-handle` - Main spectrum saturation handle
* `.hsl-selector-hue` - Main spectrum hue container
* `.hsl-selector-hue-handle` - Main spectrum hue handle
* `.alpha-selector` - Alpha channel selector

# 5. Contributing

Feel free to fork, hack, crack and change everything :). Don't hestitate to contact me to be added as contributor.

# 6. Development

**ng-chroma** goes with webpack build files with commands defined in `package.json`. 

In order to run build script, run:
`npm run build`

In order to run watchers on webpack-dev-server with HTML testbed files served, run:
`npm run watch`

# 6. License

[WTFPL](http://www.wtfpl.net/)


[1]: https://github.com/hzub/ng-chroma/blob/master/resources/simpleDemo.png
[2]: https://github.com/hzub/ng-chroma/blob/master/resources/userSelectDemo.png
[3]: https://github.com/hzub/ng-chroma/blob/master/resources/userSelectLabelDemo.png
[4]: https://github.com/hzub/ng-chroma/blob/master/resources/stringDemo.png
[5]: https://github.com/hzub/ng-chroma/blob/master/resources/cmykDemo.png
[6]: https://github.com/hzub/ng-chroma/blob/master/resources/alphaDemo.png

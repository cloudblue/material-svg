# Material Design Icons SVG

Material Design Icons is an icon set designed under [the material design guidelines](https://material.io/guidelines/).

This repository includes the official [icon set](https://www.google.com/design/spec/style/icons.html#icons-system-icons) from Google in `icons/google/` directory. \
Custom icons from [CloudBlue Connect](https://connect.cloudblue.com/) are located in `icons/connect/` directory.

## NPM package

[The official NPM package](https://github.com/google/material-design-icons) is no longer maintained since release 4. This repository contains all SVG icons in all variations and sizes available as an NPM package. Available sizes are 24x24 and 20x20, variations: baseline, sharp, outline, round, and two-tone.

### Installation

```bash
npm install --save @cloudblueconnect/material-svg
```

### Usage

```js
import {
  googleAlarmAddBaseline, // vendorIconNameVariation
} from '@cloudblueconnect/material-svg';

// or icons/vendor/icon_name/variation.svg
import googleAlarmAddBaseline from '@cloudblueconnect/material-svg/icons/google/alarm_add/baseline.svg';
```

All files included in `@cloudblueconnect/material-icons` npm package are available over a CDN.

```html
<img src="https://unpkg.com/@cloudblueconnect/material-svg@latest/icons/google/alarm_add/baseline.svg" 
     alt="Add Alarm icon" />
```

## License

`@cloudblueconnect/material-svg` is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

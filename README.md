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

What an `.svg` import returns depends on your bundler setup.

### JS icon data

The `js/<variation>` entry points export every icon as a plain object, so they need no bundler setup. Names are the same as above, and bundlers drop the icons you do not import.

```js
import { googleEditBaseline } from '@cloudblueconnect/material-svg/js/baseline';

// googleEditBaseline = { viewBox: '0 0 24 24', body: '<path d="..."/>' }
```

`body` is the inner markup of the `<svg>` element. Render it inside an `<svg>` with the same `viewBox`, for example in Vue:

```vue
<svg :viewBox="icon.viewBox" v-html="icon.body" />
```

Entry points: `js/animated`, `js/baseline`, `js/outline`, `js/round`, `js/sharp`, `js/twotone`. Each one ships TypeScript types (`IconData`). Setups that need full ESM paths (Node, webpack in a `"type": "module"` project, TypeScript `node16` resolution) must import with the extension: `@cloudblueconnect/material-svg/js/baseline.js`.

### CDN

All files included in `@cloudblueconnect/material-svg` npm package are available over a CDN.

```html
<img src="https://unpkg.com/@cloudblueconnect/material-svg@latest/icons/google/alarm_add/baseline.svg" 
     alt="Add Alarm icon" />
```

## License

`@cloudblueconnect/material-svg` is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

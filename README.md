# selectize.js-edit_item
> A plugin for selectize.js
 Adds an option and event for item editing.
 
## Installing / Getting started

Clone or download [selectize.js](https://selectize.github.io/selectize.js/) and copy the contents of this repository to the plugins folder of selectize.js.
Build selectize.js via grunt, so this plugin is added to selectize.min.js or standalone or whatever works for you.

```shell
// WITHIN THE selectize.js REPOSITORY!
grunt --plugins=* OR grunt --plugins=edit_item
```
> Refer to the selectize.js doc [custom builds](https://github.com/selectize/selectize.js#custom-builds)

## Developing

> See [Contributing](https://github.com/psgmnd/selectize.js-edit_item#contributing)

## Features

This plugin adds "Edit [Option]" to the selectize.js dropdown
* Keeps the items id/value and passign it to a 'option_edit' callback for event handling

Please keep in mind, this code is only made to satisfy my needs, feel free to alter or contribute.

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

> See the [Selectize Plugin API](https://github.com/selectize/selectize.js/blob/master/docs/plugins.md) or [Example Plugins](https://github.com/selectize/selectize.js/tree/master/src/plugins) for further information about plugin development and [microplugin.js](https://github.com/brianreavis/microplugin.js) 

## Licensing

The code in this project is licensed under the Unilicense. Just do whatever you want to do with these lines, but don't start a nuclear war and maybe send me some warm words, if you are using it for your next billion $$$ idea.
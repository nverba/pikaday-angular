# __pikaday-angular__ <sup>v2.0.0 </sup>
__pikaday-angular__ is a directive wraper that aims to make using __[Pikaday](https://github.com/dbushell/Pikaday)__ with __[AngularJS](https://angularjs.org/)__ as simple as possible. [Examples &#8594;](http://nverba.github.io/pikaday-angular/)

__How simple?__  -  Include the module as a dependency.

```HTML
angular.module('YourApp', ['pikaday'])
```

Then use the `pikaday` attribute to bind the picker to a scope.

```HTML
<input pikaday="myPickerObject">
```
You now have access to Pikaday's functions from the scoped object `myPickerObject`.

## Config

Any of Pikaday's options can be passed to the corresponding attribute, the directive takes care of coercing the value to the proper type.*

<sub> *With the exception of function expressions, which are bound as callbacks. see: [Functions](#functions) </sub>

```HTML
<input pikaday="myPickerObject" number-of-months="2">
```

## Global config

Optionally, you may provide a global config* object for all pickers by creating a `pikadayConfigProvider`.

<sub> *In-line attributes override global configs.</sub>

```JS
angular.module('YourApp')
  .config(['pikadayConfigProvider', function(pikaday) {

    pikaday.setConfig({

      numberOfMonths: 2

    });
  }])
```

## i18n

To set the language with the `i18n` attribute, you must create a locales object, and pass it to `setConfig`. This makes setting locale using the attribute `i18n="de"` possible. You may also want to configure Moment.js to handle formatting the output in the appropriate i18n locale. see: [Moment](#momentjs).

```JS
.config(['pikadayConfigProvider', function(pikaday) {

  var locales = {
    de: {
      previousMonth : 'Vorheriger Monat',
      nextMonth     : 'Nächster Monat',
      months        : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      weekdays      : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      weekdaysShort : ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."]
    }
  };

  pikaday.setConfig({

    i18n: locales.de, // sets the default language [optional]
    locales: locales // required if setting the language using the i18n attribute

  });
}])
```
## <a name="momentjs"></a>Moment.js
If you load [Moment.js](http://momentjs.com/) anywhere in your HTML, Pikaday will automatically start using Moment to parse input dates and format the pickers output. __If you are using Moment.js anywhere in your document, you should* specify the__ `format` __option, either in the global config or as an attribute.__

<sub> *Otherwise Moment.js will use some rather counter intuitive  [ISO8601](http://en.wikipedia.org/wiki/ISO_8601) compliant defaults `"YYYY-MM-DDTHH:mm:ssZ"`.</sub>

> ___Caveat:___ Whilst it's possible to specify some fancy output formats with Moment, it may have a detrimental effect on the users ability to enter a date in the input field, as Moment.js will expect the input to conform to the current format setting. See [Moment's docs](http://momentjs.com/docs/#/parsing/string/) for clarification of some of the issues regarding date string parsing.

To get Moment.js to handle i18n output formatting, you need to load the appropriate Moment.js locale file. _Moment will automatically default to the most recently loaded locale file_. Explicit locale selection can be made programmatically by calling `moment.locale("<key>")` [with the key of a loaded locale](http://momentjs.com/docs/#/i18n/instance-locale/).

## <a name="functions"></a>Functions

Pikaday has several events you can bind callbacks to: `onSelect`, `onOpen`, `onClose`, `onDraw`, and `disableDayFn`. Callbacks can be passed two optional, predefined parameters in the function expression:

Option        | Type            | Description
------------- | -------------   | ------------
`pikaday`     | Object: Pikaday | The Pikaday object for the current input
`date`        | Object: Date    | The current selected date, or date to be evaluated by the filter

Example:
```HTML
<!-- controller as syntax - onSelect callback -->
<input pikaday="ctrl.myPicker" on-select="ctrl.onPikadaySelect(pikaday)">

<!-- scope syntax - passing date to filter Fn -->
<input pikaday="myPicker" on-disable-day="myDateFilter(date)">

```
Then in your controller:
```
angular.module('YourApp')
  .controller('sampleController', function() {
    // use scope.onPikadaySelect for older scope syntax
    this.onPikadaySelect = function onPikadaySelect(pikaday) {
      alert(pikaday.toString());
    };
  });
```

## NPM & Bower

```
[npm || bower] install -save pikaday-angular
```

pikaday-angular is provided in a [UMD](https://github.com/umdjs/umd) wrapper, making it compatible with several build systems & preprocessors such as [Browserify](http://browserify.org/), see the [source of the Example page](https://github.com/nverba/pikaday-angular/tree/gh-pages) to see pikaday-angular being used with Browserify & Gulp.

## Testing

The coercion tests can be run after installing the required [npm](https://www.npmjs.com/) packages.
```
# From the command line:
$ npm install
$ npm test
```
----------


## Changelog

v2.0.0: WARNING: BREAKING CHANGES

This version represents a complete rewrite of the directive with the goal of having complete support for all of Pikaday's options, both in the provider and as attributes, whilst being more maintainable in the long run. The directive no longer applies it's own defaults, instead decorating the config object only when needed. The new build should be flexible, but still simple to use.

 - Clarified naming of module and provider :
 - Updated to support all of Pikaday config options, functions and callbacks
 - Any option can now be added via `pikadayConfigProvider`
 - Added coercion tests `npm install; npm test`
 - Removed all defaults (directive will only apply attributes that are present)
 - Added multiple locale selection
 - Updated README.md



### __pikaday-angular__ <sup>2.0.0 </sup>
__pikaday-angular__ is an AngularJS directive wraper that aims to make using __[Pikaday](https://github.com/dbushell/Pikaday)__ with __[AngularJS](https://angularjs.org/)__ as simple as possible. [Examples &#8594;](http://nverba.github.io/pikaday-angular/)

__How simple?__  -  Include the pikaday-angular module as a dependency.

```HTML
angular.module('YourApp', ['pikaday'])
```

Then use the `pikaday` attribute to bind the picker to a scope.

```HTML
<input pikaday="myPickerObject">
```
You now have access to all of Pikaday's functions, such as `myPickerObject.getDate()`.

#### Config

Any of Pikaday's options can be passed as a string* to an attribute, the directive takes care of coercing the value to the proper type.
<sub>*With the exception of callback function references.</sub>
```HTML
<input pikaday="myPickerObject" number-of-months="2">
```

#### Global config

You can set a global config* object for all pickers by creating a `pikadayConfigProvider` module.
<sub>*In-line attributes override global configs.</sub>

```JS
angular.module('YourApp')
  .config(['pikadayConfigProvider', function(pikaday) {

    pikaday.setConfig({

      theme: 'material',
      numberOfMonths: 1

    });
  }])
```

#### i18n

To set the language with the `i18n` attribute, you must create a locales object, and pass it to `setConfig`. This makes setting locale using `i18n="de"` possible.

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

    i18n: locales.de, // sets the language globally [optional]
    locales: locales // required if setting the language using the i18n attribute

  });
}])
```

#### Functions

Pikaday has several events you can bind callbacks to: `onSelect`, `onOpen`, `onClose`, `onDraw`, and `disableDayFn`. Callbacks can take two optional parameters:

option        | value
------------- | -------------
`pikaday`     | Object: Pikaday
date          | Object: Date

Example:
```HTML
<!-- controller as syntax -->
<input pikaday="ctrl.myPicker" on-select="ctrl.onPikadaySelect(pikaday)">

<!-- scope syntax -->
<input pikaday="myPicker" on-select="onPikadaySelect(pikaday)">

<!-- passing date to filter fn -->
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

#### Moment.js
If you load [Moment.js](http://momentjs.com/) in your HTML, Pikaday will use it automatically to parse input dates and format the pickers output. __If you are using Moment.js anywhere in your document, you must* specify the__ `format` __option, either in the global config or as an attribute.__
<sub>__*__ Otherwise Moment.js will use some rather counter intuitive  [ISO8601](http://en.wikipedia.org/wiki/ISO_8601) compliant defaults `"YYYY-MM-DDTHH:mm:ssZ"`.</sub>

<sub>___Caveat:___ Whilst it's possible to specify some fancy output formats with Moment, it may have a detrimental effect on the users ability to enter a date in the input field, as Moment.js will expect the input to conform to the supplied format string. See [Moment's docs](http://momentjs.com/docs/#/parsing/string/) for clarification of some of the issues regarding date string parsing.</sub>

#### Changelog

v2.0.0: WARNING: BREAKING CHANGES

 - Clarified naming of module and provider :
 - Updated to support all Pikaday config options, functions and callbacks
 - Any option can now be added via `pikadayConfigProvider`
 - Added coercion tests `npm install; npm test`
 - Removed all defaults (directive will only apply attributes that are present)
 - Added multiple locale selection
 - Updated README.md



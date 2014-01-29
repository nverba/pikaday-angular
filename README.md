__angular-pikaday__ is an AngularJS directive wraper that aims to make using __Pikaday__ with __Angular__ as simple as possible, exposing Pikaday's configurable features as HTML attributes, handled by the directive.

Tested and working with [Pikaday Release version 1.2.0](https://github.com/dbushell/Pikaday/releases/tag/1.2.0)

__Pikaday__ [source code & documentation](https://github.com/dbushell/Pikaday)

__angular-pikaday__ [working examples & documentation](http://nverba.github.io/angular-pikaday/)

```
'use strict';

app.directive('pikaday', function() {
  return {
    restrict: 'A',
    scope: {
      pikaday: '=',
    },
    link: function (scope, elem, attrs) {

      var picker = new Pikaday({

        field: elem[0],
        trigger: document.getElementById(attrs.triggerId),
        bound: attrs.bound !== 'false',
        position: attrs.position || '',
        format: attrs.format || 'ddd MMM D YYYY', // Requires Moment.js for custom formatting
        defaultDate: new Date(attrs.defaultDate),
        setDefaultDate: attrs.setDefaultDate === 'true',
        firstDay: attrs.firstDay ? parseInt(attrs.firstDay) : 0,
        minDate: new Date(attrs.minDate),
        maxDate: new Date(attrs.maxDate),
        yearRange: attrs.yearRange ? JSON.parse(attrs.yearRange) : 10, // Accepts int (10) or 2 elem array ([1992, 1998]) as strings
        isRTL: attrs.isRTL === 'true',
        i18n: {
          previousMonth : 'Previous Month',
          nextMonth     : 'Next Month',
          months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
          weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },
        yearSuffix: attrs.yearSuffix || '',
        showMonthAfterYear: attrs.showMonthAfterYear === 'true',

        onSelect: function () {
          setTimeout(function(){
            scope.$apply();
          });
        }
      });
      scope.pikaday = picker;
    }
  };
});

```

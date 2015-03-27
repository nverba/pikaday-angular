(function () { 'use strict';

  angular.module('pikaday', []);
  angular.module('pikaday').provider('pikadayConfig', function pikadayProviderFn() {

    var config = {};

    this.$get = function() {
      return config;
    };

    this.setConfig = function setConfig(configs) {
      config = configs;
    };
  });
  angular.module('pikaday').directive('pikaday', ['pikadayConfig', pikadayDirectiveFn]);

  function pikadayDirectiveFn(pikaday) {

    return {

      restrict: 'A',
      scope: {
        pikaday: '=', onSelect: '&', onOpen: '&', onClose: '&', onDraw: '&', disableDayFn: '&'
      },
      link: function (scope, elem, attrs) {

        var config = { field: elem[0] };

        // Decorate config with attributes

        angular.forEach(attrs.$attr, function (elementAttribute) {

          var attr = attrs.$normalize(elementAttribute); // ToCamelcase()

          switch (attr) {

            // Booleans, Integers & Arrays

            case "setDefaultDate":
            case "bound":
            case "reposition":
            case "disableWeekends":
            case "showWeekNumber":
            case "isRTL":
            case "showMonthAfterYear":
            case "firstDay":
            case "yearRange":
            case "numberOfMonths":
            case "mainCalendar":

              config[attr] = scope.$eval(attrs[attr]);
              break;

            // Functions

            case "onSelect":
            case "onOpen":
            case "onClose":
            case "onDraw":
            case "disableDayFn":

              config[attr] = function () {
                scope[attr]({ pikaday: this });
              };
              break;

            // Strings

            case "format":
            case "reposition":
            case "theme":
            case "yearSuffix":

              config[attr] = attrs[attr];
              break;

            // Dates

            case "minDate":
            case "maxDate":
            case "defaultDate":

              config[attr] = new Date(attrs[attr]);
              break;

            // Elements

            case "trigger":
            case "container":

              config[attr] = document.getElementById(attrs[attr]);

          }
        });

        scope.pikaday = new Pikaday(config);
      }
    };
  }
})();

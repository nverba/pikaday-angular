(function () { 'use strict';

  angular.module('pikaday', [])
    .provider('pikadayConfig', function pikadayProviderFn() {

      var config = {};

      this.$get = function() {
        return config;
      };

      this.setConfig = function setConfig(configs) {
        config = configs;
      };
    })
    .directive('pikaday', ['pikadayConfig', pikadayDirectiveFn]);

  function pikadayDirectiveFn(pikadayConfig) {

    return {

      restrict: 'A',
      scope: {
        pikaday: '=', onSelect: '&', onOpen: '&', onClose: '&', onDraw: '&', disableDayFn: '&'
      },
      link: function (scope, elem, attrs) {

        // Init confog Object

        var config = { field: elem[0] };

        // Decorate config with globals

        angular.forEach(pikadayConfig, function (value, key) {
          config[key] = value;
        });

        // Decorate/overide config with inline attributes

        angular.forEach(attrs.$attr, function (dashAttr) {
          var attr = attrs.$normalize(dashAttr); // normalize = ToCamelcase()
          applyConfig(attr, attrs[attr]);
        });

        function applyConfig (attr, value) {
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

              config[attr] = scope.$eval(value);
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

              config[attr] = value;
              break;

            // Dates

            case "minDate":
            case "maxDate":
            case "defaultDate":

              config[attr] = new Date(value);
              break;

            // Elements

            case "trigger":
            case "container":

              config[attr] = document.getElementById(value);
              break;

            // Translations

            case "i18n":

                console.log(pikadayConfig.locales[value]);

              config[attr] = pikadayConfig.locales[value];

          }
        }

        scope.pikaday = new Pikaday(config);
      }
    };
  }
})();

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular', 'pikaday'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('angular'), require('pikaday'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.angular, root.Pikaday);
  }
}(this, function (angular, Pikaday) {

  angular.module('pikaday', [])
    .provider('pikadayConfig', function pikadayProviderFn() {

      // Create provider with getter and setter methods, allows setting of global configs

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

        // Init config Object

        var config = { field: elem[0], onSelect: function () {
          setTimeout(function(){
            scope.$apply();
          });
        }};

        // Decorate config with globals

        angular.forEach(pikadayConfig, function (value, key) {
          config[key] = value;
        });

        // Decorate/Overide config with inline attributes

        angular.forEach(attrs.$attr, function (dashAttr) {
          var attr = attrs.$normalize(dashAttr); // normalize = ToCamelCase()
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

              config[attr] = function (date) {
                setTimeout(function(){
                  scope.$apply();
                });
                return scope[attr]({ pikaday: this, date: date });
              };
              break;

            // Strings

            case "format":
            case "position":
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

              config[attr] = pikadayConfig.locales[value];

          }
        }

        // instantiate pikaday with config, bind to scope, add destroy event callback

        var picker = new Pikaday(config);
        scope.pikaday = picker;
        scope.$on('$destroy', function () {
          picker.destroy();
        });
      }
    };
  }

}));

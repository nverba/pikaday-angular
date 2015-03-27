describe('directive: pikaday', function() {

  beforeEach(module('pikaday'));
  beforeEach(module(function(pikadayConfigProvider) {}));

  // INLINE

  describe('inline', function() {

    var element, scope, provider;

    beforeEach(inject(function($rootScope, $compile) {

      scope    = $rootScope.$new();
      element  = '<input pikaday="myPickerObject" number-of-months="2" >';
      compiled = $compile(element)(scope);

      scope.$digest();

    }));

    describe('attribute', function() {

      it("number-of-months should be applied", function() {
        assert.equal(scope.myPickerObject._o.numberOfMonths, 2);
      });
    });

  });

 // PROVIDER

  describe('provider', function() {

    var element, scope;

    var config = {

      locales: {

        de: {
          previousMonth : 'Vorheriger Monat',
          nextMonth     : 'Nächster Monat',
          months        : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
          weekdays      : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
          weekdaysShort : ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."]
        }
      },

      disableWeekends: true
    };

    beforeEach(inject(function($rootScope, $compile, pikadayConfig) {

      angular.extend(pikadayConfig, config);

      scope    = $rootScope.$new();
      element  = '<input pikaday="myPickerObject">';
      compiled = $compile(element)(scope);

      scope.$digest();

    }));

    describe('config', function() {

      it("should disable weekends", function() {
        assert.equal(scope.myPickerObject._o.disableWeekends, true);
      });
    });

  });
});

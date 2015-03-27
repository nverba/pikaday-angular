describe('directive: pikaday', function() {
  var element, scope;

  beforeEach(module('pikaday'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<input pikaday="myPickerObject" number-of-months="2" >';

    element = $compile(element)(scope);
    scope.$digest();

  }));

  describe('inline attribute', function() {

    it("number-of-months should be applied", function() {
      assert.equal(scope.myPickerObject._o.numberOfMonths, 2);
    });
  });
});

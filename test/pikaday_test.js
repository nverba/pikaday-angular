describe('directive: pikaday', function() {
  var element, scope;

  beforeEach(module('pikaday'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<input pikaday="myPickerObject">';

    element = $compile(element)(scope);
    scope.$digest();

  }));


  describe('with the first given value', function() {
    it("should compute the size to create other values", function() {
      var isolated = element.isolateScope();
      assert.equal(-1, [1,2,3].indexOf(5));
    });
  });
});

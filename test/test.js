describe('directive: pikaday', function() {
  var element, scope;

  beforeEach(module('pikaday'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<input pikaday="myPickerObject">';

    element = $compile(element)(scope);
    scope.$digest();
  }));
});

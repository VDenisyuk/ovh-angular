var factoryApp = angular.module('factoryApp', ['ngRoute']);

factoryApp.factory('Factories', function ($http) {
	return $http.get('factory.min.json');
});

factoryApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html'
      }).
      when('/factory', {
        templateUrl: 'partials/factoryList.html',
        controller: 'FactoryCtrl'
      }).
      when('/factory/:factoryId', {
        templateUrl: function(urlattr){
              return 'partials/factory/' + urlattr.factoryId + '.html';
            },
        controller: 'CalcCtrl'
      }).
      when('/products', {
        templateUrl: 'partials/productList.html',
        controller: 'ProductCtrl'
      }).
      when('/product/:productId', {
        templateUrl: function(urlattr){
              return 'partials/product/' + urlattr.productId + '.html';
            },
        controller: 'CalcCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

//регулятор бонусов
function setBonus(val, callbtn){
	if ( callbtn.hasClass("btn-warning") ) { val = -val;}
	callbtn.toggleClass("btn-default").toggleClass("btn-warning");
	callbtn.closest('form').find('#Bonus').val(parseFloat(callbtn.closest('form').find('#Bonus').val()) + val + '%');
	callbtn.closest('form').find('#Bonus2').val(parseFloat(callbtn.closest('form').find('#Bonus2').val()) + val + '%');
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//разделитель разрядов
function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
	return val;
};
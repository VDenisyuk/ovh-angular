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
        controller: 'ProductionCtrl'
      }).
      when('/factory/:factoryId', {
        templateUrl: function(urlattr){
                console.log('Go to factory unit partials/factory/' + urlattr.factoryId + '.html');
                return 'partials/factory/' + urlattr.factoryId + '.html';
            },
        controller: 'CalcCtrl'
      }).
      when('/products', {
        templateUrl: 'partials/productList.html',
        controller: 'FactoryCtrl'
      }).
      when('/product/:productId', {
        templateUrl: function(urlattr){
                console.log('Go to product partials/product/' + urlattr.productId + '.html');
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
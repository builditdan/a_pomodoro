(function() {
     
  
  function config($stateProvider, $locationProvider) {
     
    $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
     
      $stateProvider
      .state('landing', {
        url: '/',
        controller: 'controller as myController',
        templateUrl: '/templates/landing.html'

      })

  
}
  
  angular
         .module('aPomodoro', ['ui.router'])
         .config(config);
  
    
})();
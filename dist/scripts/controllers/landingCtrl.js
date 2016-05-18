(function() {
  function landingCtrl($scope) {
   
    alert("controller");
  }
  
  angular
    .module('aPomodoro')
    .controller('landingCtrl',['$scope', landingCtrl]);
})();

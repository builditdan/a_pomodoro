(function() {
  function landingCtrl($scope) {
    $scope.radioValue="25:00"
    $scope.timerValue = "25:00";
  }
  
  angular
    .module('aPomodoro')
    .controller('landingCtrl',['$scope', landingCtrl]);
})();

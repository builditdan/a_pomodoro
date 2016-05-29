(function() {
  
  function taskController($scope, myTask) {

    $scope.taskList = myTask.all;
    $scope.deleteTask = myTask.delete;
    $scope.addTask = myTask.add;
    $scope.deleteAllTasks = myTask.deleteAll;
    myTask.signInAnonymously;
  }

  angular
  .module('aPomodoro')
  .controller('taskController', ['$scope','myTask', taskController])
    
})();

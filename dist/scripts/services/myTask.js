(function() {
  
  function myTask($firebaseArray, $firebaseObject, $firebaseAuth) {
    var myTask = {};

    function addTask(item) {
      tasks.$add({ task: item }).then(function(firebaseRef) {
        var id = firebaseRef.key();
        tasks.$indexFor(id); // returns location in the array
      });
    };
    
    
    function deleteAllTasks() {
      result = confirm("Want to delete all tasks?");
      if (result) {
        firebaseRef.remove();
      }
    }

    
    function deleteTask(elem) {
      result = confirm("Want to delete?");
      if (result) {
        tasks.$remove(elem);
      }
    }

    
    var firebaseRef = new Firebase("https://project-2801774550174553817.firebaseio.com/");
    var tasks = $firebaseArray(firebaseRef);
    
    
   
    return {
       all: tasks,
       add: addTask,
       delete: deleteTask,
       deleteAll: deleteAllTasks, 
       fbRef: firebaseRef
    }
  }
  
  angular
  .module('aPomodoro')
  .factory('myTask', ['$firebaseArray', '$firebaseObject', '$firebaseAuth', myTask])
    
})();


(function() {
  
  function myTask($firebaseArray, $firebaseObject, $firebaseAuth) {
    var myTask = {};

    function addTask(item) {
      tasks.$add({ task: item, dateAdded: Date() }).then(function(firebaseRef) {
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

    //function signInA() {
     
  //  }
    
    var firebaseRef = new Firebase("https://project-2455511480279771792.firebaseio.com/");
   
//    
//    // Create a callback to handle the result of the authentication
//    function authHandler(error, authData) {
//      if (error) {
//        console.log("Login Failed!", error);
//      } else {
//        console.log("Authenticated successfully with payload:", authData);
//      }
//    }
//    
//    firebaseRef.authAnonymously(authHandler);
//    
//    firebaseRef.auth(null).onAuthStateChanged(function(user) {
//  if (user) {
//    // User is signed in.
//    var isAnonymous = user.isAnonymous;
//    var uid = user.uid;
//    // ...
//    consle.log("It worked now authenticated");
//  } else {
//    console.log("User was logged out");
//    // User is signed out.
//    // ...
//  }
//  // ...
//});
    
    
    
    var tasks = $firebaseArray(firebaseRef);
    
    
   
    return {
       all: tasks,
       add: addTask,
       delete: deleteTask,
       deleteAll: deleteAllTasks,
       //signInAnonymously: signInA,
       fbRef: firebaseRef
    }
  }
  
  angular
  .module('aPomodoro')
  .factory('myTask', ['$firebaseArray', '$firebaseObject', '$firebaseAuth', myTask])
    
})();



function controller($scope, dateFilter,$interval) {
  
    var theTimerId;
    
    this.formatTime = function(tValue) {
      timeValue = tValue.toString(); 
      if ( !/:/.test( timeValue ) ) { timeValue += ':00'; }
      return timeValue.replace(/^\d{1}:/, '0$&').replace(/:\d{1}$/, '$&0' );
    }
  
    this.setTimerMsg = function(timerComplete, msg) {
      //alert ("Timer Cnt msg:" + timerCnt);
      workSession = $scope.timerIndex % 2;
      if (timerComplete) {
        if (workSession) {
          msg.text("Begin your Session!");
        } else {
          msg.text("Time for a Break!");
        }
      } else {
        if (workSession) {
          msg.text("Working Session!");
        } else {
          msg.text("Taking a Break!");
        }
      }

    }
    
    this.timerDuration = function() {

      const WORK_SESSION = 25,
          BREAK_SESSION_1 = 10,
          BREAK_SESSION_2 = 30,
          LAST_EVENT = 8;

      tDuration = null;
      workSession = $scope.timerIndex % 2;
      
      if ($scope.timerIndex == LAST_EVENT) {
        tDuration = BREAK_SESSION_2
      } else if (workSession) {
        tDuration = WORK_SESSION
      } else {
        tDuration = BREAK_SESSION_1
      }
      //alert ("Timer Cnt:" + timerCnt + "Session:" + workSession + "Duration:" + tDuration);

      return tDuration;
    };
    
    this.stopTheTimer = function(id) {
      $interval.cancel(id);
    };

    this.updateTime = function(stopTime, btn, msg, id) {

      currentTime = new Date()
      diffTime = stopTime - currentTime
      if (diffTime <= 0) {
        $scope.myController.stopTheTimer(id);
        alert("Timer Completed");
        btn.text("Start");
        $scope.myController.setTimerMsg(true, msg);
        return $scope.myController.formatTime($scope.myController.timerDuration($scope.timerIndex));

      }
      return dateFilter(diffTime, "m:ss");
    };
      
    this.startTheTimer = function(stopTime, theTimer, btn, msg) {

      theTimerid = $interval(function() {
        $scope.timerValue = $scope.myController.updateTime(stopTime, btn, msg, theTimerid);
      }, 500);


      $scope.$watch(theTimer, function() {
        $scope.timerValue = $scope.myController.updateTime(stopTime, btn, msg, theTimerid);
      });

      return theTimerid;

    };

  }

  function myTimer($interval,dateFilter,$document) {
  
    function link(scope, element, attrs) {
      var stopTime,
          timerId;
      
      //scope.startTheTimer = attrs.startTheTimer;
      scope.timerIndex = 1;
      scope.timerValue = "25:00";
      scope.startTimer = function(event) {
        currentTime = new Date();
        msg = element.find("h3");
        btn = element.find("button");
        duration = scope.myController.timerDuration();
        stopTime = new Date(currentTime.getTime() + duration*600)
       
        if (btn.text() === "Cancel") {
          scope.myController.stopTheTimer(timerId);
          alert("Cancelled Timer");
          scope.timerIndex -= 1;
          scope.timerValue = scope.myController.formatTime(scope.myController.timerDuration(scope.timerIndex));
          btn.text("Start");
          scope.myController.setTimerMsg(true, msg);
        }
        else {
          btn.text("Cancel");
          scope.myController.setTimerMsg(false, msg);
          scope.timerIndex += 1;
          timerId = scope.myController.startTheTimer(stopTime, attrs.myTimer, btn, msg);
        };
      };
          
      element.on('$destroy', function() {
        $interval.cancel(timerId);
      });

  }

  return {
    link: link,
    template: `<img id="pomodoro" src="assets/images/apple.jpg" alt="pomodoro timer">
                <h1 id="timer-countdown" ng-model="timerIndex">{{timerValue}}</h1>
                <button id="start-button" ng-click="startTimer()">Start</button>
                <h3 id="timer-message">Begin your Session!</h3>`
  };
      
      
}

angular.module("aPomodoro")
.controller("controller", ['$scope', 'dateFilter', '$interval', controller])
.directive('myTimer', ['$interval','dateFilter', myTimer]);




    
 
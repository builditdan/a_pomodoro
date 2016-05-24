  function myTimer($interval,dateFilter,$document) {
    
    
    function controller($scope) {
  
      
    var theTimerId;
    var mySound = new buzz.sound("/assets/sounds/ding2.mp3", {
    //  formats: ['mp3'],
      preload: true
    });
    formatTime = function(tValue) {
      timeValue = tValue.toString(); 
      if ( !/:/.test( timeValue ) ) { timeValue += ':00'; }
      return timeValue.replace(/^\d{1}:/, '0$&').replace(/:\d{1}$/, '$&0' );
    }
  
    setTimerMsg = function(timerComplete, msg) {
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
    
    timerDuration = function() {

      const WORK_SESSION = 2,
          BREAK_SESSION_1 = 1,
          BREAK_SESSION_2 = 3,
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
    
    stopTheTimer = function(id) {
      $interval.cancel(id);
    };

    updateTime = function(stopTime, btn, msg, id) {

      currentTime = new Date()
      diffTime = stopTime - currentTime
      if (diffTime <= 0) {
        mySound.setVolume(90);
        mySound.play();    
        stopTheTimer(id);
        btn.text("Start");
        setTimerMsg(true, msg);
        $scope.current = 0;
        return formatTime(timerDuration($scope.timerIndex));

      }
      $scope.current += 1;
      return dateFilter(diffTime, "m:ss");
    };
      
    startTheTimer = function(stopTime, theTimer, btn, msg) {
     
      theTimerid = $interval(function() {
        $scope.timerValue = updateTime(stopTime, btn, msg, theTimerid);
      }, 500);


      $scope.$watch(theTimer, function() {
        $scope.timerValue = updateTime(stopTime, btn, msg, theTimerid);
      });

      return theTimerid;

    };

  }
    
    
    
  function link(scope, element, attrs) {
    var stopTime,
        timerId;

    //scope.startTheTimer = attrs.startTheTimer;
    scope.timerIndex = 1;
    scope.timerValue = "25:00";
    scope.max = (25 * 60) * 2;
    scope.current = 0;

    scope.startTimer = function(event) {
      currentTime = new Date();
      msg = element.find("h3");
      btn = element.find("button");
      duration = timerDuration();
      scope.max = (duration * 60) * 2;
      stopTime = new Date(currentTime.getTime() + duration*60000)

      if (btn.text() === "Cancel") {
        stopTheTimer(timerId);
        scope.timerIndex -= 1;
        scope.timerValue = formatTime(timerDuration(scope.timerIndex));
        btn.text("Start");
        setTimerMsg(true, msg);
        scope.current = 0;

      }
      else {
        btn.text("Cancel");
        setTimerMsg(false, msg);
        scope.timerIndex += 1;
        timerId = startTheTimer(stopTime, attrs.myTimer, btn, msg);
      };
    };

    element.on('$destroy', function() {
      $interval.cancel(timerId);
    });

  }

  return {
    link: link,
    controller: controller,
    template: `<img id="pomodoro" src="assets/images/apple.jpg" alt="pomodoro timer">
               <round-progress id="progress-bar"
                  max="max"
                  current="current" 
                  color="red"
                  bgcolor="#eaeaea"
                  radius="100"
                  stroke="20"
                  semi="true"
                  rounded="true"
                  clockwise="false"
                  responsive="false"
                  duration="800"
                  animation="easeInOutQuart"
                  animation-delay="0">
              </round-progress>
              <h1 id="timer-countdown" ng-model="timerIndex">{{timerValue}}</h1>
              <button id="start-button" ng-click="startTimer()">Start</button>
              <h2 id="timer-message">Begin your Session!</h2>`
  };
      
      
}

angular.module("aPomodoro")
.directive('myTimer', ['$interval','dateFilter', myTimer]);



    
 
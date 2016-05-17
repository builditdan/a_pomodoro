
(function() {

  function myTimer($interval,dateFilter) {
    
    //function controller($scope) {
      // scope.startTime available here because of link function
    
      var theTimerId,
          currentRadioValue;
      
  
      var stopTheTimer = function() {
        $interval.cancel(theTimerid);
      };
      
      var updateTime = function(stopTime, btn) {
        currentTime = new Date()
        diffTime = stopTime - currentTime
        if (diffTime <= 0) {
          stopTheTimer(btn, theTimerid);
          alert("Stopped Timer");
          btn.text("Start");
          return currentRadioValue;
          
        }
        return dateFilter(diffTime, "m:ss");
      };
      
      var startTheTimer = function(stopTime, btn, theScope, theTimer) {
        alert('Starting Timer');
        currentRadioValue = theScope.radioValue;

        theTimerid = $interval(function() {
          theScope.timerValue = updateTime(stopTime, btn);
        }, 500);
        

        theScope.$watch(theTimer, function() {
          theScope.timerValue = updateTime(stopTime, btn);
        });
        
        return theTimerid;
        
      };

    //}
    
    function link(scope,element, attrs) {
      var stopTime,
          timerId;

      //scope.startTheTimer = attrs.startTheTimer;
      
      scope.startTimer = function(event) {
        currentTime = new Date(); 
        duration = parseInt(scope.radioValue);
        stopTime = new Date(currentTime.getTime() + duration*60000)
        btn = element.find("button");
        if (btn.text() === "Stop") {
          stopTheTimer();
          alert("Stopped Timer");
          scope.timerValue = scope.radioValue;
          btn.text("Start");
        }
        else {
          btn.text("Stop");
          timerId = startTheTimer(stopTime, btn, scope, attrs.myTimer);
        };
      };
          
      element.on('$destroy', function() {
        $interval.cancel(timerId);
        alert("destroy");
      });

  }

  return {
    link: link,
    //controller, 
    template: `<img id="pomodoro" src="assets/images/apple.jpg" alt="pomodoro timer">
                <h1 id="timer-countdown">{{timerValue}}</h1>
                <div id="timer-selection">
                <input type="radio" name="timer_type" ng-model="radioValue" ng-click="timerValue = radioValue" value="25:00"> 25 Minutes task timer<br>
                <input type="radio" name="timer_type" ng-model="radioValue" ng-click="timerValue = radioValue" value="01:00"> 5 minute task timer<br>
                <input type="radio" name="timer_type" ng-model="radioValue" ng-click="timerValue = radioValue" value="30:00"> 30 minute task timer<br>
                </div>
                <button id="start-button" ng-click="startTimer()">Start</button>`
  };
      
      
}
    
  angular
    .module('aPomodoro')
    .directive('myTimer', ['$interval','dateFilter', myTimer]);

})();









(function() {
  function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function highlight(element) {
    element.animate(
      [
        // keyframes
        { color: "red"},
        {color: "black" }
      ],
      {
        // timing options
        duration: 900,
        iterations: 1,
      },
    );
  }

  var initApplication = function() {
    document.getElementById('bobblehead_solver').onreset = function(e) {
      document.getElementById('bobble_win').innerHTML = '';
      document.getElementById('bobble_treasures').innerHTML = '';
    };
    document.getElementById('bobblehead_solver').onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var attempt_count = parseInt(document.getElementById('attempt_count').value);
      var bobble_count = parseInt(document.getElementById('bobble_count').value);
      var won = 0;
      var treasures = 0;
      var verbose = document.getElementById('verbose').checked;
      var output = [];

      for (var i = 0; i < attempt_count; i++) {
        var sixes = 0;
        for (var j = 0; j < bobble_count; j++) {
          var result = rollDie();
          if (verbose) {
            output.push(result);
          }
          treasures += ((result % 2) == 0) ? 1 : 0;
          sixes += (result == 6) ? 1 : 0;
        }
        if (verbose && (i != attempt_count - 1)) {
          output.push(" | ");
        }
        won += (sixes == 7) ? 1 : 0;
      }

      document.getElementById('bobble_win').innerHTML = (won > 0 ? 'Yes (' + won + ' times!)' : 'No');
      if (verbose && (attempt_count * bobble_count) <= 1000) {
        document.getElementById('bobble_treasures').innerHTML = (
          treasures.toString() + '<br/>' +
          '<code>' + output.join('') + '</code>'
        );
      } else if (verbose && (attempt_count * bobble_count) > 1000) {
        document.getElementById('bobble_treasures').innerHTML = (
          treasures.toString() + '<br/>' +
          '<code>Too many flips to display all results!</code>'
        );
      } else {
        document.getElementById('bobble_treasures').innerHTML = treasures.toString();
      }
      highlight(document.getElementById('bobble_win'));
      highlight(document.getElementById('bobble_treasures'));
    }
  };

  if (document.readyState === 'complete') {
    initApplication();
  } else {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        initApplication();
      }
    }
  }
})();

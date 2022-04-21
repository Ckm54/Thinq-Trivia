let myApp = () => {
    let api = 'https://opentdb.com/api.php?amount=1';
    let bool, categories, category, chosen, choices, correct, query;
    let solo = true;
    let turn = 1;
    let counter = 0,
    player1Score = 0,
    player2Score = 0;
    const apiCategory = 'https://opentdb.com/api_category.php';
    function htmlEntities(str) {
        String(str).replace(/&[#039]*;/g, "'").replace(/&[amp]*;/g, '&').replace(/&[quote]*;/g, '"');
    }
    function getCategories() {
        $.getJSON(apiCategory, function (data) {
        categories = data.trivia_categories;
        $.each(categories, function (i) {
            $('#category').append('<li class="animate js-category">' + data.trivia_categories[i].name + '</li>');
        });
        closeCategories();
        });
    };
    function closeCategories() {
        $('li.js-category').on('click', function () {
          chosen = $(this).text();
          $('#toggle').prop('checked', false);
          $('dropdown > label').html(chosen);
          category = categories.filter(function (obj) {
            return obj.name == chosen;
          });
          if (chosen === 'Random') {
            api = 'https://opentdb.com/api.php?amount=1';
          } else if (chosen !== 'Random') {
            category = category[0].id;
            api = 'https://opentdb.com/api.php?amount=1&category=' + category;
          }
        });
      };
      function shuffle(arr) {
        let i = arr.length,
        temp,rand;
        while (0 !== i) {
          rand = Math.floor(Math.random() * i);
          i -= 1;
          temp = arr[i];
          arr[i] = arr[rand];
          arr[rand] = temp;
        }
        return arr;
      };
      function chooseTeams() {
        $('#solo').on('click', function () {
          solo = true;
          $('#intro').fadeOut('fast');
          $('#player2-score').hide();
          $('#turn').hide();
          $('#instructions').fadeOut('fast');
          fetch();
          $('#board').fadeIn(2000);
        });
        $('#teams').on('click', function () {
          $('#player2-score').show();
          $('#turn').html('Player One Turn');
          $('#intro').fadeOut('fast');
          $('#instructions').fadeOut('fast');
          fetch();
          $('#board').fadeIn(2000);
          solo = false;
        });
      };
      function fetch() {
        $.getJSON(api, function (data) {
          //console.log(data);
          $('#results').empty();
          $('#fetch').prop("disabled", true);
          let trivia = data.results[0];
          trivia.type === 'multiple' ? bool = false : bool = true;
          choices = trivia.incorrect_answers;
          choices.push(trivia.correct_answer);
          correct = htmlEntities(trivia.correct_answer);
          query = trivia.question;
          $('#query').html(query);
          //shuffle choices if question type is multiple choice
          if (!bool) {
            shuffle(choices);
          }
          $.each(choices, function (i) {
            let choice = choices[i];
            $('#results').append('<li class="choice">' + choice + '</li>');
          });
          response();
        });
      };
      function gameOver() {
        $('#new').fadeIn('fast');
        $('#fetch').prop('disabled', true);
        $('#gameOver').fadeIn('fast');
        if (solo) {
          $('#winner').html('You\'ve scored ' + player1Score + ' out of 10');
        } else if (solo !== true) {
          if (player2Score > player1Score) {
            $('#winner').html('Player Two Wins!');
          } else if (player2Score === player1Score) {
            $('#winner').html('Draw!');
          } else if (player2Score < player1Score) {
            $('#winner').html('Player One Wins!');
          }
        }
        newGame();
      };
      function intro(){
        getCategories();
        chooseTeams();
      };
      function newGame() {
        $('#new').on('click', function () {
          counter = 0;
          player1Score = 0;
          player2Score = 0;
          turn = 1;
          $('#new').fadeOut('fast');
          $('#board').hide();
          $('#query').empty();
          $('#results').empty();
          $('#player1-score span').html(player1Score);
          $('#player2-score span').html(player2Score);
          $('#turn').empty();
          $('#answer').empty();
          $('#intro').fadeIn('fast');
          $('#gameOver').hide();
        });
      };
      function next() {
        $('#fetch').on('click', function () {
          $('#answer').empty();
          fetch();
          if (solo !== true && turn % 2 === 0) {
            $('#turn').html('Player Two Turn');
          } else if (solo !== true && turn % 2 > 0) {
            $('#turn').html('Player One Turn');
          }
        });
      };
      function response() {
        $('.choice').on('click', function () {
          counter += 1;
          let answer = $(this).text();
          let $answer = $('#answer');
          // Return correct answer
          $('.choice').filter(function () {
            return $(this).text() == correct;
          }).addClass('correct');
          $('.choice').prop("disabled", true);
          $('#fetch').prop("disabled", false);
          if (answer == correct && solo) {
            player1Score += 1;
            $answer.html('Correct!');
            $('#player1-score span').html(player1Score);
          } else if (turn % 2 !== 0 && answer == correct) {
            player1Score += 1;
            $answer.html('Correct!');
            $('#player1-score span').html(player1Score);
          } else if (turn % 2 === 0 && answer == correct) {
            player2Score += 1;
            $answer.html('Correct!');
            $('#player2-score span').html(player2Score);
          } else {
            $(this).addClass('incorrect');
            $answer.html('Incorrect');
          }
          if (solo !== true) {
            turn += 1;
          }
          if (counter >= 10) {
            gameOver();
          }
        });
      };
      next();
    document.addEventListener("DOMContentLoaded", function () {
        intro();
        $('.sk-circle').fadeOut('fast');
    });

}

myApp()
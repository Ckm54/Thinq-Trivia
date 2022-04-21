let myApp = () => {
    let api = 'https://opentdb.com/api.php?amount=1';
    let bool, categories, category, chosen, choices, correct, query;
    let solo = true;
    let turn = 1;
    let counter = 0,
    player1Score = 0,
    player2Score = 0;
    const apiCategory = 'https://opentdb.com/api_category.php';
    const htmlEntities = str => String(str).replace(/&[#039]*;/g, "'").replace(/&[amp]*;/g, '&').replace(/&[quote]*;/g, '"');
    const getCategories = () => {
        $.getJSON(apiCategory, function (data) {
        categories = data.trivia_categories;
        $.each(categories, function (i) {
            $('#category').append('<li class="animate js-category">' + data.trivia_categories[i].name + '</li>');
        });
        closeCategories();
        });
    };
    var closeCategories = () => {
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

}

myApp()
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

}

myApp()
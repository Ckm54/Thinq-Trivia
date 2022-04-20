let myApp = () => {
    const categoriesList = document.getElementById("categories")
    const apiUrl = 'https://opentdb.com/api.php?amount=1';
    const categoryUrl = "https://opentdb.com/api_category.php";

    function getCategories() {
        fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            const categories = data.trivia_categories
            categories.forEach(category => {
                const itemContainer = document.createElement("li")
                itemContainer.setAttribute("class", "animate js-category")
                itemContainer.innerText = category.name
                categoriesList.append(itemContainer)
            })
        })
    }
    getCategories()

}

myApp()
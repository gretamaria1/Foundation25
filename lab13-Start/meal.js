//1- Link to get a random meal
let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php'

//2- Link to lookup a specific meal with an id
let mealURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

//3- Link to search for meals using a keyword
let searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

const mealsElement = document.getElementById('meals');
const favorites = document.querySelector('.favorites');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.querySelector('#search');

async function getRandomMeal() 
{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    
    const randomData = await resp.json();
    
    const randomMeal = randomData.meals[0];
    console.log(randomMeal);

    mealsElement.innerHTML = '';
    addMeal(randomMeal, true);

}

const addMeal = (mealData, random = false) => {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML =    `<div class="meal-header">
                            ${random?'<span class="random">Meal of the Day</span>':""}
                            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                        </div>
                        <div class="meal-body">
                            <h3>${mealData.strMeal}</h3>
                            <button class="fav-btn">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>`;

    let favoriteButton = meal.querySelector('.fav-btn');
    favoriteButton.addEventListener('click', () => {
        if (favoriteButton.classList.contains('active'))
        {
            favoriteButton.classList.remove('active');
            removeMealFromLocalStorage(mealData.idMeal);
        }
        else
        {
            favoriteButton.classList.add('active');
            addMealToLocalStorage(mealData.idMeal);
        }
        updateFavoriteMeals();
    })    

    mealsElement.appendChild(meal);

    const mealHeader = meal.querySelector ('.meal-header');
    mealHeader.addEventListener('click', () => {
        console.log('clicked');
})
}


function addMealToLocalStorage(mealId)
{
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealId', JSON.stringify([...mealIds,mealId]));
}

function removeMealFromLocalStorage(mealId)
{
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealId', JSON.stringify(
        mealIds.filter(id => id !=mealId)
    ));
}

function getMealsFromLocalStorage()
{
    const mealIds = JSON.parse(localStorage.getItem('mealId'));

    return mealIds === null ? [] : mealIds;
}

const updateFavoriteMeals = () => {
    favorites.innerHTML = '';
    const mealIds = getMealsFromLocalStorage();
    console.log(mealIds);

    let meals = [];
    mealIds.forEach(async (meal) => {
        let tmpMeal = await getMealById(meal);
        meals.push(tmpMeal);

        addMealToFavorites(tmpMeal);
    })
}

const getMealById = async (id) => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const mealData = await resp.json();
    const meal = mealData.meals[0];
    console.log(meal);

    return meal;
}

const addMealToFavorites = (meal) => {
    const favoriteMeal = document.createElement('li');
    favoriteMeal.innerHTML = `
                            <img id="fav-img" 
                                src="${meal.strMealThumb}" 
                                alt="${meal.strMeal}">
                            <span>${meal.strMeal}</span>
                            <button class="clear">
                            <i class="fas fa-window-close"></i>
                            </button>`;
    const clearButton = favoriteMeal.querySelector('.clear');
    clearButton.addEventListener('click', () => {
        removeMealFromLocalStorage(meal.idMeal);
        updateFavoriteMeals();
    })
    favorites.appendChild(favoriteMeal);

    const favImg = favoriteMeal.querySelector ('#fav-img');
    favImg.addEventListener('click', () => {
        console.log('clicked');
    })
}

getRandomMeal();
updateFavoriteMeals();

searchBtn.addEventListener('click', () => {
    const searchWord = searchTerm.value;
    console.log(searchWord);

    searchForMeal(searchWord);
});

searchTerm.addEventListener('input', () => {
    const searchWord = searchTerm.value;
    console.log(searchWord);

    searchForMeal(searchWord);
});


//Displaying the searched meals
const searchForMeal = async (word) => {
    const searchResults = await getMealsBySearch(word);
    console.log(searchResults);

    mealsElement.innerHTML = '';
    if(searchResults)
        searchResults.forEach((meal) =>addMeal(meal));
}

//Searching the meals
const getMealsBySearch = async (word) => {
    const resp = await fetch(searchURL + word);
    const mealData = await resp.json();
    const output = mealData.meals;
    //console.log(output);

    return output;
}
  
const OpenMealDetailsPage = () => {
window.open('details.html');
}
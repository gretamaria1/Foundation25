//1- Link to get a random meal
//https://www.themealdb.com/api/json/v1/1/random.php

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=

const mealsElement = document.getElementById('meals');
const favorites = document.querySelector('.favorites');
getRandomMeal();

async function getRandomMeal() 
{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    
    const randomData = await resp.json();
    
    const randomMeal = randomData.meals[0];
    console.log(randomMeal);

    mealsElement.innerHTML = '';
    addMeal(randomMeal);

}

function addMeal(mealData)
{
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML =    `<div class="meal-header">
                            <span class="random">Meal of the Day</span>
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

    updateFavoriteMeals();
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
}


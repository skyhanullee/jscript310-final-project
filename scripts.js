// ---------------------------------------------------------------------------
// 1. Your project must be [interactive] (i.e. must have event listeners).  
// The user must be able to interact with the document with the mouse or keyboard and have the [document change / update].
// 2. Your project must include [4 of the 6] following features (but may include more):
// ---------------------------------------------------------------------------

// [ ] One or more [Classes] (must use static methods and/or prototype methods)

// [ ] Write [testable code], use [Jasmine] unit tests

// [x] One or more [timing functions]

// [x] One or more [fetch requests] to a 3rd party [API] -> themealdb

// [x] Sets, updates, or changes [local storage]

// [x] Contains [form fields], [validates] those fields -> search form


$(document).ready(function() {
  const API_KEY = '1';
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/';
  const RANDOM_MEAL_URL = `https://www.themealdb.com/api/json/v1/1/random.php`;
  let searchRecipeName = '';
  let searchNumberOfResults = 0;
  let searchHistory = { recipe: [] };
  let url  = '';
  let isPaused = false;
  
  // // import recipe class from recipe.js
  // $.getScript("recipe.js", () => {
  //   console.log("recipe.js load success");
  // });

  // display random meals on top of page
  const randomMealContainer = $('#random-meal-container');
  createRandomMeal(randomMealContainer);

  // loop through random meals every 10 seconds
  randomMealLoop($('#random-meal-container'), 2000);

  $('#recipe-form').submit((e) => {
    e.preventDefault();

    // get the input search from user
    searchRecipeName = $('#recipe').val();
    searchNumberOfResults = $('#number-of-recipes').val();
    url = `${BASE_URL}${API_KEY}/search.php?s=${searchRecipeName}`;

    // empty current results and write number of results for search input
    $('#results-container').empty();
    $('#results-container').append(`<h2>First ${searchNumberOfResults} Results For: ${searchRecipeName}</h2>`);

    // fetch recipe data from the API
    const resultsElement = document.getElementById('results-container');
    fetchRecipe(url, searchNumberOfResults, resultsElement); 

    // save to search local storage
    saveSearchToLocalStorage(searchRecipeName);

    // random meal will stop looping
    isPaused = true;

    // reset form after submit
    $('#recipe-form')[0].reset();
    $('#search-modal-container').empty();
  });

  /**
   * 
   * @param {string} url - The URL to fetch the recipe data
   * @param {number} numOfResults - Number of results to show on the page, specified by the user
   * @param {string} searchRecipeLocation - Element to append the recipe results
   */
  function fetchRecipe(url, numOfResults, searchRecipeLocation) {
    // Fetch recipe for search and add top 5 results to page
    fetch(url)
    .then((data) => {
        return data.json();
    })

    .then((responseJson) => {
        console.log(url);
          for (let i = 0; i < numOfResults; i++) {
            const recipeResult = responseJson.meals[i];
            createResultrecipe(recipeResult, searchRecipeLocation);
            createModal(recipeResult);
            console.log(recipeResult);
          }
    })

    .catch((error) => {
      console.log(error)
      if(error == `TypeError: Cannot read properties of null (reading '0')`) {
        createErrorMessage(`There are 0 results that contain "${searchRecipeName}"`);
      }
    });
  }

  /**
   * 
   * @param {Object} recipeResult - Recipe data from the API
   * @param {string} appendLocation - Element to append the recipe results
   */
  function createResultrecipe(recipeResult, appendLocation) {
    // set recipe variables
    const recipeImage = recipeResult.strMealThumb;
    const recipeTitle = recipeResult.strMeal;
    const recipeArea = recipeResult.strArea;
    const recipeCategory = recipeResult.strCategory;
    const recipeId = recipeResult.idMeal;
    
    // create recipe HTML elements
    const newRecipe = document.createElement('section');
    const newRecipeImage = document.createElement('img');
    const newRecipeBody = document.createElement('div');
    const newRow = document.createElement('div');
    const newCol = document.createElement('div');
    const newRecipeTitle = document.createElement('h3');
    const newRecipeArea = document.createElement('div');
    const newRecipeCategory = document.createElement('div');
    const lineBreak = document.createElement('hr');

    // set id to HTML elements
    newRecipe.setAttribute('id', `recipe-result-${recipeId}`);
    newRecipeImage.setAttribute('id', `recipe-image-${recipeId}`);
    newRecipeBody.setAttribute('id', `recipe-body-${recipeId}`);
    newRecipeTitle.setAttribute('id', `recipe-title-${recipeId}`);
    newRecipeArea.setAttribute('id', `recipe-area-${recipeId}`);
    newRecipeCategory.setAttribute('id', `recipe-category-${recipeId}`);

    // set content from API
    newRecipeImage.setAttribute('src', recipeImage);
    newRecipeTitle.textContent = recipeTitle;
    newRecipeArea.textContent = recipeArea;
    newRecipeCategory.textContent = recipeCategory;

    // bootstrap styling for recipe results
    newRecipe.setAttribute('class', 'card mx-auto mb-4 rounded shadow');
    newRecipeImage.setAttribute('class', 'col-lg-3 p-0');
    newRecipeTitle.setAttribute('class', 'my-3');
    newRow.setAttribute('class', 'row');
    newCol.setAttribute('class', 'col-md-12 py-3');
    newRecipeBody.setAttribute('class', 'col-md-9 w-100 m-2 d-inlineblock text-center');
    lineBreak.setAttribute('class', 'divider my-2');
    newRecipeArea.setAttribute('class', 'badge badge-light p-2 col-sm-2 text-center');
    newRecipeCategory.setAttribute('class', 'badge badge-light p-2 col-sm-2 text-center');

    // append to element specified when called
    appendLocation.append(newRecipe);

    // append recipe elements
    newRecipe.append(newRecipeImage, newRecipeBody);
    newRecipeBody.append(newRow);
    newRow.append(newCol);
    newCol.append(newRecipeTitle, lineBreak);
    newCol.append(newRecipeArea, newRecipeCategory, document.createElement('br'));
  }

  /**
   * 
   * @param {Object} recipeResult - Recipe data form the API
   */
  function createModal(recipeResult) {

    // get and set title and instructions for modal
    const recipeTitle = recipeResult.strMeal;
    const recipeInstructions = recipeResult.strInstructions;
    const recipeId = recipeResult.idMeal;
    const newRecipeInstructions = document.createElement('p');
    newRecipeInstructions.setAttribute('id', 'recipe-instructions');
    newRecipeInstructions.textContent = recipeInstructions;

    // create modal
    const modal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalTitle = document.createElement('h4');
    const modalBody = document.createElement('h4');
    const modalFooter = document.createElement('h4');

    // set modal attributes
    modal.setAttribute('id', `recipe-modal-${recipeId}`);
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'recipe-modal-center-title');
    modal.setAttribute('aria-hidden', 'true');
    modalDialog.setAttribute('class', 'modal-dialog');
    modalDialog.setAttribute('role', 'document');
    modalTitle.setAttribute('id', 'recipe-modal-long-title');

    // bootstrap styling for modal
    modal.setAttribute('class', 'modal fade ');
    modalDialog.setAttribute('class', 'modal-dialog modal-dialog-centered');
    modalContent.setAttribute('class', 'modal-content');
    modalHeader.setAttribute('class', 'modal-header');
    modalTitle.setAttribute('class', 'modal-title');
    modalBody.setAttribute('class', 'modal-body');
    modalFooter.setAttribute('class', 'modal-footer');

    // set modal content from API
    modalTitle.textContent = recipeTitle;
    modalBody.textContent = recipeInstructions;

    // create modal button
    const modalButton = document.createElement('button');

    // set modal button attributes
    modalButton.setAttribute('id', 'modal-button');
    modalButton.setAttribute('class', 'btn btn-info my-1');
    modalButton.setAttribute('data-toggle', 'modal');
    modalButton.setAttribute('data-target', `#recipe-modal-${recipeId}`);
    modalButton.textContent = 'More Details';

    // append modal button to recipe-body
    const recipeBody = document.getElementById(`recipe-body-${recipeId}`).firstChild;
    recipeBody.firstChild.append(modalButton);

    // add modal html into modal-container in the body
    document.getElementById('modal-container').append(modal);
    modal.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalHeader.append(modalTitle);
  }

  /**
   * 
   * @param {string} message - A message to show on the page when function is called
   */
  function createErrorMessage(message) {
    // create error element
    const messageElement = document.createElement('h3');

    // set id name
    messageElement.setAttribute('id', 'error-message');

    // bootstrap styling
    messageElement.setAttribute('class', 'text-center');

    // set message text to element
    messageElement.textContent = message;

    // append in results-container
    document.getElementById('results-container').append(messageElement);
  }

  /**
   * 
   * @param {string} searchData - The search term user has input when searching on the form
   */
  function saveSearchToLocalStorage(searchData) {
    // get history from local storage
    if(localStorage.getItem('history')) {
      searchHistory = JSON.parse(localStorage.getItem('history'));
    }

    // if search is not blank, add search to history array
    if(searchData != "") {
      searchHistory.recipe.push(searchData);
      localStorage.setItem('history', JSON.stringify(searchHistory));
    }
    else {
      console.log('input is empty');
    }

    console.log(searchHistory);

    // TODO: Limit number of search history items to avoid overfilling local storage
  }

  /**
   * 
   * @param {string} appendLocation - Element to append the recipe
   */
  function createRandomMeal(appendLocation) {
    const randomMealId = fetchRecipe(RANDOM_MEAL_URL, 1, appendLocation);
  }

  /**
   * 
   * @param {string} appendLocation - Element to append the recipe
   * @param {number} intervalTime - (In milliseconds) How often to call for new random meal
   */
  function randomMealLoop(appendLocation, intervalTime) {
    setInterval(function() {
      if(!isPaused) {
        // empty the random-meal-container
        $('#random-meal-container').empty();
        $('#random-meal-container').text('Random Meal: ');

        // fetch and append a new random meal
        createRandomMeal(appendLocation);
      }

    }, intervalTime);
    }
});

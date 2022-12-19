// ---------------------------------------------------------------------------
// 1. Your project must be [interactive] (i.e. must have event listeners).  
// The user must be able to interact with the document with the mouse or keyboard and have the [document change / update].

// 2. Your project must include [4 of the 6] following features (but may include more):
// ---------------------------------------------------------------------------
// [*] One or more [Classes] (must use static methods and/or prototype methods)


// [*] Write [testable code], use [Jasmine] unit tests


// [ ] One or more [timing functions]


// [x] One or more [fetch requests] to a 3rd party [API] -> themealdb


// [X] Sets, updates, or changes [local storage]


// [x] Contains [form fields], [validates] those fields -> search form

$(document).ready(function() {
  const API_KEY = '1';
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/';
  const NUM_RESULTS = 5;
  let recipeName = '';
  let searchHistory = { recipe: [] };
  
  // 
  $.getScript("recipe.js", () => {
    console.log("recipe.js load success");
  });


  $('#recipe-form').submit((e) => {
    e.preventDefault();
    console.log("jquery submit worked");

    // get the input search from user
    recipeName = $('#recipe').val();
    const url = `${BASE_URL}${API_KEY}/search.php?s=${recipeName}`;
    // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=curry`;

    // show "First 5 Results For:" and the search input
    $('#recipe-container').empty();
    $('#recipe-container').append(`<h2>First 5 Results For: ${recipeName}</h2>`);

    // fetch recipe data from the API
    fetchRecipe(url); 


    // save to search local storage
    saveSearchToLocalStorage(recipeName);

    // reset form after submit
    $('#recipe-form')[0].reset();
    $('#modal-container').empty();

  });

  function fetchRecipe(url) {
    console.log(`recipe name is ${recipeName}`);
    // Fetch recipe for search and add top 5 results to page
    fetch(url)
    .then((data) => {
        // console.log(data.json());
        return data.json();
    })

    .then((responseJson) => {
        // console.log(responseJson);
        console.log(url);

        // const recipeResults = responseJson.meals[0];
        // console.log(recipeResults);
            for (let i = 0; i < NUM_RESULTS; i++) {
              const recipeResults = responseJson.meals[i];
              createResultrecipe(recipeResults);
              console.log(recipeResults);
            }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  function createResultrecipe(recipeResult) {
    // set recipe variables
    const recipeImage = recipeResult.strMealThumb;
    const recipeTitle = recipeResult.strMeal;
    const recipeArea = recipeResult.strArea;
    const recipeCategory = recipeResult.strCategory;
    const recipeInstructions = recipeResult.strInstructions;
    
    // create recipe HTML elements
    const newRecipe = document.createElement('section');
    const newRecipeImage = document.createElement('img');
    const newRecipeBody = document.createElement('div');
    const newRow = document.createElement('div');
    const newCol = document.createElement('div');
    const newRecipeTitle = document.createElement('h3');
    const newRecipeArea = document.createElement('p');
    const newRecipeCategory = document.createElement('p');
    const newRecipeInstructions = document.createElement('p');

    // set id to HTML elements
    newRecipe.setAttribute('id', 'recipe-result');
    newRecipeImage.setAttribute('id', 'recipe-image');
    newRecipeBody.setAttribute('id', 'recipe-body');
    newRecipeTitle.setAttribute('id', 'recipe-title');
    newRecipeArea.setAttribute('id', 'recipe-area');
    newRecipeCategory.setAttribute('id', 'recipe-category');
    newRecipeInstructions.setAttribute('id', 'recipe-instructions');

    // set content from API
    newRecipeImage.setAttribute('src', recipeImage);
    newRecipeTitle.textContent = recipeTitle;
    newRecipeArea.textContent = recipeArea;
    newRecipeCategory.textContent = recipeCategory;
    newRecipeInstructions.textContent = recipeInstructions;

    // bootstrap styling for recipe results
    newRecipe.setAttribute('class', 'card mx-auto my-5 rounded');
    newRecipeImage.setAttribute('class', 'col-lg-3 p-0');
    newRecipeTitle.setAttribute('class', 'my-3');
    newRow.setAttribute('class', 'row');
    newCol.setAttribute('class', 'col-sm-8 my-auto');
    newRecipeBody.setAttribute('class', 'col-sm-8 w-100 d-inlineblock text-center');

    // get main container where elements will be appended
    document.getElementById('recipe-container').append(newRecipe);

    // append recipe elements
    newRecipe.append(newRecipeImage, newRecipeBody);
    newRecipeBody.append(newRow);
    newRow.append(newCol);
    // newCol.append(newRecipeTitle, newRecipeArea, newRecipeCategory, recipeInstructions);
    newCol.append(newRecipeTitle, newRecipeArea, newRecipeCategory);

    // create modal for recipe
    createModal(recipeTitle, recipeInstructions, newRow);

    // const newRecipe = new Recipe(recipeImage, recipeTitle, recipeArea, recipeCategory, recipeInstructions);
    // console.log(newRecipe);
    // newRecipe.logToConsole();
  }

  function createModal(title, instructions, appendLocation) {
    // create modal
    const modal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalTitle = document.createElement('h4');
    const modalBody = document.createElement('h4');
    const modalFooter = document.createElement('h4');

    // set modal attributes
    modal.setAttribute('id', `recipe-modal-${title}`);
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'recipe-modal-center-title');
    modal.setAttribute('aria-hidden', 'true');
    modalDialog.setAttribute('class', 'modal-dialog');
    modalDialog.setAttribute('role', 'document');
    modalTitle.setAttribute('id', 'recipe-modal-long-title');

    // bootstrap styling for modal
    modal.setAttribute('class', 'modal fade');
    modalDialog.setAttribute('class', 'modal-dialog modal-dialog-centered mw-100 w-75');
    modalContent.setAttribute('class', 'modal-content');
    modalHeader.setAttribute('class', 'modal-header');
    modalTitle.setAttribute('class', 'modal-title');
    modalBody.setAttribute('class', 'modal-body');
    modalFooter.setAttribute('class', 'modal-footer');

    // set modal content from API
    modalTitle.textContent = title;
    modalBody.textContent = instructions;

    // create modal button
    const modalButton = document.createElement('button');

    // set modal button attributes
    modalButton.setAttribute('class', 'btn btn-info h-50 mx-auto my-auto');
    modalButton.setAttribute('data-toggle', 'modal');
    modalButton.setAttribute('data-target', `#recipe-modal-${title}`);
    modalButton.textContent = 'More Details';

    // append modal button to recipe-body
    appendLocation.append(modalButton);

    // add modal html into modal-container in the body
    document.getElementById('modal-container').append(modal);
    modal.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalHeader.append(modalTitle);
  }

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

});

// ---------------------------------------------------------------------------
// 1. Your project must be [interactive] (i.e. must have event listeners).  
// The user must be able to interact with the document with the mouse or keyboard and have the [document change / update].

// 2. Your project must include [4 of the 6] following features (but may include more):
// ---------------------------------------------------------------------------
// [*] One or more [Classes] (must use static methods and/or prototype methods)


// [*] Write [testable code], use [Jasmine] unit tests


// [ ] One or more [timing functions]


// [x] One or more [fetch requests] to a 3rd party [API] -> themealdb


// [*] Sets, updates, or changes [local storage]


// [x] Contains [form fields], [validates] those fields -> search form

$(document).ready(function() {
  const API_KEY = `1`;
  const BASE_URL = `https://www.themealdb.com/api/json/v1/`;
  const NUM_RESULTS = 5;
  let recipeName = '';
  
  $.getScript("recipe.js", () => {
    console.log("load complete");
  });


  $('#recipe-form').submit((e) => {
    e.preventDefault();
    console.log("jquery submit worked");

    recipeName = $('#recipe').val();
    const url = `${BASE_URL}${API_KEY}/search.php?s=${recipeName}`;
    // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=curry`;


    fetchRecipe(url);
    // createResultrecipe(recipeResult);
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
    // Set recipe variables
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
    const newRecipeTitle = document.createElement('h4');
    const newRecipeArea = document.createElement('p');
    const newRecipeCategory = document.createElement('p');
    const newRecipeInstructions = document.createElement('p');

    // assign id to HTML elements
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

    // bootstrap styling
    newRecipe.setAttribute('class', 'card mx-auto');
    newRecipeImage.setAttribute('class', 'col-lg-3');
    newRow.setAttribute('class', 'row');
    newCol.setAttribute('class', 'col-sm-12 my-auto');
    newRecipeBody.setAttribute('class', 'w-100 d-inlineblock text-center');

    // create modal
    const modal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalTitle = document.createElement('h4');
    const modalBody = document.createElement('h4');
    const modalFooter = document.createElement('h4');

    // assign modal components
    modal.setAttribute('class', 'modal');
    modalDialog.setAttribute('class', 'modal-dialog');
    modalContent.setAttribute('class', 'modal-content');
    modalHeader.setAttribute('class', 'modal-header');
    modalTitle.setAttribute('class', 'modal-title');
    modalBody.setAttribute('class', 'modal-body');
    modalFooter.setAttribute('class', 'modal-footer');

    // get main container where elements will be appended
    document.getElementById('recipe-container').append(newRecipe);

    // append recipe elements
    newRecipe.append(newRecipeImage, newRecipeBody);
    newRecipeBody.append(newRow);
    newRow.append(newCol);
    // newCol.append(newRecipeTitle, newRecipeArea, newRecipeCategory, recipeInstructions);
    newCol.append(newRecipeTitle, newRecipeArea, newRecipeCategory);

    // TODO: append modal



    // const newRecipe = new Recipe(recipeImage, recipeTitle, recipeArea, recipeCategory, recipeInstructions);
    // console.log(newRecipe);
    // newRecipe.logToConsole();
  }

});





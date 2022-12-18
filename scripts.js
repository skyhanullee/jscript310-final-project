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
  $.getScript("recipe.js", () => {
    console.log("load complete");
  });
});




const formElement = document.getElementById('recipe-form');
const recipeElement = document.getElementById('recipe');


const API_KEY = '1';

const BASE_URL = 'www.themealdb.com/api/json/v1/'

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const recipeName = recipeElement.value;

    // const url = `${BASE_URL}${API_KEY}/search.php?s=${recipeName}`;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=sushi`;
    

    // Fetch recipe for search and add top 5 results to page
    fetch(url)
        .then((data) => {
            // console.log(data.json());
            return data.json();
        })

        .then((responseJson) => {
            // console.log(responseJson);
            console.log(url);

            const recipeResults = responseJson.meals[0];
            console.log(recipeResults);


            if(recipeResults.idMeal != null) {
                createResultrecipe(recipeResults);
                console.log(recipeResults.strMeal);
            }

            // if (responseJson.num_results > 0) {
            //     console.log(bookResults[0]);
            //     for (let i = 0; i < 5; i++) {
            //         // createBookResult(bookResults[i]);
            //     }
            // }
            // else {
            //     console.log('Number of results is 0');
            //     const resultElement = document.createElement('h3');
            //     resultElement.textContent = 'No results, try a different date';
            //     document.getElementById('recipes-container').appendChild(errorElement);
            // }

            // if (responseJson.status == 'ERROR') {
            //     console.log('Error status');
            // }
        })
});

function createResultrecipe(recipeResult) {
    // ```
    // <section id="recipe">
    //     <img id="recipe-image" src="https://bootdey.com/img/Content/avatar/avatar1.png"></img>
    //     <div class="recipe-body">
    //         <div class="row">
    //             <div class="col-sm-9">
    //                 <h4 class="recipe-title">Title</h4>
    //                 <p class="info">Recipe info</p>
    //                 <p class="description">Recipe description</p>
    //             </div>
    //             <!-- <div class="col-sm-3 text-align-center">
    //                 <p class="value3 mt-sm">$9, 700</p>
    //                 <p class="fs-mini text-muted">PER WEEK</p><a class="btn btn-primary btn-info btn-sm" href="#">Learn More</a>
    //             </div> -->
    //         </div>
    //     </div>
    // </section>
    // ```

    // Set recipe variables
    const recipeImage = recipeResult.strMealThumb;
    const recipeTitle = recipeResult.strMeal;
    const recipeArea = recipeResult.strArea;
    const recipeCategory = recipeResult.strCategory;
    const recipeInstructions = recipeResult.strInstructions;
    
    // create recipe HTML elements
    const searchRecipe = document.createElement('section');
    const searchRecipeImage = document.createElement('img');
    const searchRecipeBody = document.createElement('div');
    const row = document.createElement('div');
    const col = document.createElement('div');
    const searchRecipeTitle = document.createElement('h4');
    const searchRecipeInfo = document.createElement('p');
    const searchRecipeInstructions = document.createElement('p');

    // assign id to HTML elements
    searchRecipe.setAttribute('id', 'recipe-result');
    searchRecipeImage.setAttribute('id', 'recipe-image');
    searchRecipeBody.setAttribute('id', 'recipe-body');
    searchRecipeTitle.setAttribute('id', 'recipe-title');
    searchRecipeInfo.setAttribute('id', 'recipe-info');
    searchRecipeInstructions.setAttribute('id', 'recipe-instructions');

    // set content from API
    searchRecipeImage.setAttribute('src', recipeImage);
    searchRecipeTitle.textContent = recipeTitle;
    searchRecipeInfo.textContent = `${recipeArea}, ${recipeCategory}`;
    searchRecipeInstructions.textContent = recipeInstructions;

    // bootstrap styling
    recipe.setAttribute('class', 'card');
    row.setAttribute('class', 'row');
    col.setAttribute('class', 'col-sm-9');

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

    const modalExample = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      Launch demo modal
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>


    `;
    

    searchRecipe.append(searchRecipeImage, searchRecipeBody);
    searchRecipeBody.append(row);
    row.append(col);
    // col.append(recipeTitle, recipeInfo, recipeInstructions);
    col.append(searchRecipeTitle, searchRecipeInfo);
    col.innerHTML += modalExample;

    document.getElementById('main-container').append(recipe);

    // const newRecipe = new Recipe(recipeImage, recipeTitle, recipeArea, recipeCategory, recipeInstructions);
    // console.log(newRecipe);
    // newRecipe.logToConsole();
}


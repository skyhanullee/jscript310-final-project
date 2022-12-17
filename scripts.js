// ---------------------------------------------------------------------------
// 1. Your project must be [interactive] (i.e. must have event listeners).  
// The user must be able to interact with the document with the mouse or keyboard and have the [document change / update].

// 2. Your project must include [4 of the 6] following features (but may include more):
// ---------------------------------------------------------------------------
// // One or more [Classes] (must use static methods and/or prototype methods)


// // Write [testable code], use [Jasmine] unit tests


// // One or more [timing functions]


// // One or more [fetch requests] to a 3rd party [API]


// // Sets, updates, or changes [local storage]


// // Contains [form fields], [validates] those fields


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
            console.log(data.json());
            // return data.json();
        })

        .then((responseJson) => {
            // console.log(responseJson.json);
            // const recipeResults = responseJson.results.books

            console.log(url);
            // console.log(recipeResults);

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


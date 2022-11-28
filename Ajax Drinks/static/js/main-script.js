window.addEventListener("load", setup);

// Global Variable
var newDrinkButton;

function setup() {
  newDrinkButton = document.getElementById("newDrinkButton");
  // when i click on a country, I am changing the value of the dropdown
  newDrinkButton.addEventListener("click", generateNewDrink);
  generateNewDrink();
}

// when initialization, fetch a random drink and display it
function generateNewDrink() {

  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      displayDrinkInfo(data);
    });
}

function displayDrinkInfo(data) {

    let drink = data.drinks[0];

    document.getElementById("drink-container").src = drink.strDrinkThumb;
    document.getElementById("drink-container").alt = `Picture of ${drink.strDrink}`;
    document.getElementById("drinkName").innerHTML = drink.strDrink;

    if (drink.strAlcoholic === "Alcoholic" )
      document.getElementById("alcoholic").innerHTML = "yes";
    else
      document.getElementById("alcoholic").innerHTML = "no";

    document.getElementById("drinkCategory").innerHTML = drink.strCategory;
    document.getElementById("instructions").innerHTML = drink.strInstructions;

    // generate the ingridient list and measure list
    let keys = Object.keys(drink);
    let ingredientList = [];
    let measureList = [];


    for(let i = 0;i < keys.length;i++){
      if(drink[keys[i]] != null && keys[i].startsWith("strIngredient") )
        ingredientList.push(drink[keys[i]]);
      if(drink[keys[i]] != null && keys[i].startsWith("strMeasure") )
        measureList.push(drink[keys[i]]);
    }

    let ingList = document.getElementById("ingredients");
    let inl = "";
    for(let i = 0; i < ingredientList.length; i++){
      inl += `<li>${ingredientList[i]} - ${measureList[i]}</li>`
    }
    ingList.innerHTML = inl;
    
    // Can use the method below only if I refresh ingList every time!!
    // for(let i = 0; i < ingredientList.length; i++){
    //   var li = document.createElement("li");
    //   li.innerHTML = `${ingredientList[i]} - ${measureList[i]}`;
    //   ingList.appendChild(li);
    // }
}
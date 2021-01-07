import data from "./data.js"
import {
  createTableElements
} from "./main.js";

/*
  ALWAYS USE IMPORTED data ARRAY TO MAKE MANIPULATIONS
  ID for allcities table is #allcities
  ID for singlecity table is #singlecity
/*
/*
* PASS ARRAY TO createTableElements function to fill tables
* first argument - data
* second argument - tableId
* Example createTableElements([{name: "Istanbul"}], "allcities");
*/

/*
    ids for buttons and select
    Population - bigger than 500.000 => #populationBigger
    land area - less than 1000 => #landAreaLess
    Does any city has population less than 100.000? => #isPopulationLess
    Does every city has land area bigger than 100? => #isLandBigger
    city select => #selectcity
*/

/* RESET ACTION */
document.querySelector("#reset").addEventListener("click", () => {
  createTableElements(data, "allcities");
  createTableElements([], "singlecity")
});


// Cities that have population Larger Than 500.000:

document.querySelector("#populationBigger").addEventListener("click", function() {
  const largerThan500K = data.filter((city) => {
    return city.population > 500000;
  });
  createTableElements(largerThan500K, "allcities");
});

//  Cities that have Land Area less Than 1000 :

document.querySelector("#landAreaLess").addEventListener("click", function() {
  const lessThan1000 = data.filter((city) => {
    return city.landArea < 1000;
  });
  createTableElements(lessThan1000, "allcities");
});

// Alert if any city has population less than 100K:

document.querySelector("#isPopulationLess").addEventListener("click", function() {
  const isAnyLess = data.some((city) => {
    return city.population < 100000;
  });

  if (isAnyLess) {
    alert("Yes");
  } else alert("No");
});

// Alert if every city has Land Area larger than 100:

document.querySelector("#isLandBigger").addEventListener("click", function() {
  const isEveryLarger = data.every((city) => {
    return city.landArea > 100;
  });

  if (isEveryLarger) {
    alert("Yes");
  } else alert("No");
});

// Drop-Down List Items:
const dropDownMenu = document.querySelector("#inputGroupSelect01");
const itemsWithValues = dropDownMenu.querySelectorAll("option[value]");
// clear the list items
clearItems();
// create list items for each city:
data.forEach((city, cityIndex) => {
  let optionElement = document.createElement("option");
  optionElement.setAttribute("value", `${cityIndex +1}`);
  optionElement.innerText = city.name;
  dropDownMenu.appendChild(optionElement);
});

// Display List items on the Second Table:
dropDownMenu.addEventListener("change", function(e) {

  const selectedCity = this.options[this.selectedIndex];
  // Prevent console error when "Choose..." is selected:
  if (selectedCity.innerText === "Choose...") {
    return false;
  }
  // find the city object that belongs to the selected item:
  const cityToDisplay = data.find((city) => {
    return city.name === selectedCity.innerText;
  });
  //  create element with the city object:
  createTableElements([cityToDisplay], "singlecity");

});

//function that removes all the items inside the drop-down list:
function clearItems() {
  itemsWithValues.forEach((item) => {
    item.remove();
  });
}

var express = require('express');
var widget = require('./customWidget.js');
var request = require('request-promise');

function Services() {
  this._id = -1;
  this._list_widget = [];
}

/* FUNCTION ADD ITEM START */
Services.prototype.addNewItem = function(config, action, title, input_name, input_holder) {
  // Add a new widget
  this._id += 1;
  this._list_widget.push(new widget(this._id, config, action, title, input_name, input_holder));
}

Services.prototype.addNewItemParameter = async function(config, action, title, input_name, input_holder, url_search, type) {
  // Add a new widget
  this._id += 1;
  var new_elem = new widget(this._id, config, action, title, input_name, input_holder);

  // Get ingredients list
  var ingredients = {
    'mehtod' : 'GET',
    'url': url_search,
    'headers': {
    }
  };

  await request(ingredients, function (error, response) {
    if (type == "ingredient")
      new_elem.setParametersIngredient(JSON.parse(response.body).meals);
    else if (type == "category")
      new_elem.setParametersCategory(JSON.parse(response.body).meals);
    else if (type == "area")
      new_elem.setParametersArea(JSON.parse(response.body).meals);
  });

  this._list_widget.push(new_elem);
}

Services.prototype.deleteItem = function(id) {
  this._list_widget.splice(id);
  this._id -= 1;
}
/* FUNCTION ADD ITEM END */



/* FUNCTION START */
Services.prototype.searchImdb = async function(id, search_movie, type, list_widget) {
  var options = {
    'method': 'GET',
    'url': search_movie,
    'headers': {
    }
  };


  await request(options)
    .then(function (response) {
      if (type == "movies")
        list_widget[id].setMovie(JSON.parse(response).results);
      else if (type == "actor")
        list_widget[id].setPerson(JSON.parse(response).results);
    })
    .catch(function (err) {
      console.log(err);
    })
};

Services.prototype.generateAnimal = async function(id, search_animal, type, list_widget) {
  var options = {
    'method': 'GET',
    'url': search_animal,
    'headers': {
    }
  };

  await request(options)
  .then(function (response) {
    if (type == "shiba")
      list_widget[id].setShiba(JSON.parse(response));
    else if (type == "dog")
      list_widget[id].setDog(JSON.parse(response));
    else
      list_widget[id].setCat(JSON.parse(response));
  })
  .catch(function (err) {
    console.log(err);
  })
};

Services.prototype.searchMeal = async function(id, search_recipe, list_widget) {
  var options = {
    'method': 'GET',
    'url': search_recipe,
    'headers': {
    }
  };

  await request(options)
  .then(function (response) {
    list_widget[id].setFood(JSON.parse(response).meals);
  })
  .catch(function (err) {
    console.log(err);
  })
};
/* FUNCTION END */

module.exports = Services;

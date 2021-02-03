var express = require('express');

function CustomWidget(id, type, action, title, input_name, input_holder) {
    this._id = id;
    this._type = type;
    this._data = [];
    this._parameters = [];
    this._images = [];
    this._open = false;

    this._action = action;
    this._title = title;
    this._input_name = input_name;
    this._input_holder = input_holder;
};

/* STANDARD FUNCTION*/
CustomWidget.prototype.triggerDisplay = function() {
  this._open = !this._open;
}

/* CUSTOM FUNCTION */
CustomWidget.prototype.setMovie = function(search_result) {
  for (const res of search_result) {
    this._data.push(res.title);
  }
  this._open = true;
};

CustomWidget.prototype.setPerson = function(search_result) {
  for (const res of search_result) {
    this._data.push(res.full_name);
  }
  this._open = true;
};

CustomWidget.prototype.setShiba = function(search_result) {
  this._data.push(search_result[0]);
  this._open = true;
};

CustomWidget.prototype.setDog = function(search_result) {
  this._data.push(search_result.message);
  this._open = true;
};

CustomWidget.prototype.setCat = function(search_result) {
  this._data.push(search_result[0].url);
  this._open = true;
};

CustomWidget.prototype.setFood = function(search_result) {
  for (const res of search_result) {
    this._data.push(res.strMeal);
    this._images.push(res.strMealThumb);
  }
  this._open = true;
};

CustomWidget.prototype.setParametersIngredient = function(search_result) {
  for (const res of search_result) {
    this._parameters.push(res.strIngredient);
  }
};

CustomWidget.prototype.setParametersCategory = function(search_result) {
  for (const res of search_result) {
    this._parameters.push(res.strCategory);
  }
};

CustomWidget.prototype.setParametersArea = function(search_result) {
  for (const res of search_result) {
    this._parameters.push(res.strArea);
  }
};

module.exports = CustomWidget;

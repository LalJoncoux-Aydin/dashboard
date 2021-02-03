var express = require('express');
var router = express.Router();
var service_source = require('../models/services.js');
var user_source = require("../models/user.js");
let about = require('../controllers/about.controller');
var user = new user_source();
var service = new service_source();

/* STANDARD ROUTES START */
router.get('/', function(req, res, next) {
  res.render('login', {error: user._error_occured});
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post("/create_user", function (req,res, next) {
  user.create(req, res);
  res.redirect('/home');
});

router.post("/login_user", function(req, res, next) {
  user.login(req, res);
  res.redirect('/home');
});

router.get('/home', function(req, res, next) {
  if (user._is_connected == true) {
    res.render('home', {list_widget: service._list_widget});
  } else {
    res.redirect('/');
  }
});

router.get('/settings', function(req, res, next) {
  res.render('settings');
});

router.get('/about.json', (req, res) => res.json(about(req, res)));

router.get('/logout', function(req, res, next) {
  user._is_connected = false;
  user._username = undefined;
  user._password = undefined;
  res.redirect('/');
});
/* STANDARD ROUTES END */


/* CRUD TO WIDGET START */
router.get('/delete_widget/:id', async function(req, res, next) {
  service.deleteItem(req.params.id);
  res.redirect('/home');
});

router.get('/open_widget/:id', async function(req, res, next) {
  service._list_widget[req.params.id].triggerDisplay();
  res.redirect('/home');
});
/* CRUD TO WIDGET END */


/* VIDEOS AND MOVIES SCOPE START */
// ------ IMDB GET MOVIES ------ //
router.get('/imdb_movies', function(req, res, next) {
  service.addNewItem("imdb_movies", "/search_movies", "Search a movie title or director", "searchMovie", "Search a movie");
  res.redirect('/home');
});

router.get('/search_movies/:id', async function(req, res, next) {
  await service.searchImdb(req.params.id, 'https://imdb.hriks.com/movie/?search=' + req.query.searchMovie, "movies", service._list_widget);
  res.redirect('/home');
});

// ------ IMDB GET PERSON ------ //
router.get('/imdb_person', function(req, res, next) {
  service.addNewItem("imdb_person", "/search_person", "Search an actor or a director", "searchPerson", "Search a person");
  res.redirect('/home');
});

router.get('/search_person/:id', async function(req, res, next) {
  await service.searchImdb(req.params.id, 'https://imdb.hriks.com/person?search=' + req.query.searchPerson, "actor", service._list_widget);
  res.redirect('/home');
})
/* VIDEOS AND MOVIES SCOPE END */


/* ANIMAL SCOPE START */
// ------ RANDOM CHIBA ------ //
router.get('/shiba', function(req, res, next) {
  service.addNewItem("shiba", "/search_shiba", "Generate a shiba", null, null);
  res.redirect('/home');
});

router.get('/search_shiba/:id', async function(req, res, next) {
  await service.generateAnimal(req.params.id, 'http://shibe.online/api/shibes', "shiba", service._list_widget);
  res.redirect('/home');
})

// ------ RANDOM DOG ------ //
router.get('/dog', function(req, res, next) {
  service.addNewItem("dog", "/search_dog", "Generate a dog", null, null);
  res.redirect('/home');
});

router.get('/search_dog/:id', async function(req, res, next) {
  await service.generateAnimal(req.params.id, 'https://dog.ceo/api/breeds/image/random', "dog", service._list_widget);
  res.redirect('/home');
})

// ------ RANDOM CAT ------ //
router.get('/cat', function(req, res, next) {
  service.addNewItem("cat", "/search_cat", "Generate a cat", null, null);
  res.redirect('/home');
});

router.get('/search_cat/:id', async function(req, res, next) {
  await service.generateAnimal(req.params.id, 'https://api.thecatapi.com/v1/images/search', "cat", service._list_widget);
  res.redirect('/home');
})
/* ANIMAL SCOPE END */


/* MEAL SCOPE START */
// ------ RANDOM MEAL ------ //
router.get('/mealrandom', function(req, res, next) {
  service.addNewItem("foodrandom", "/search_mealrandom", "Generate a recipe", null, null);
  res.redirect('/home');
});

router.get('/search_mealrandom/:id', async function(req, res, next) {
  await service.searchMeal(req.params.id, 'https://www.themealdb.com/api/json/v1/1/random.php', service._list_widget);
  res.redirect('/home');
});

// ------ GET MEAL BY NAME ------ //
router.get('/mealbyname', function(req, res, next) {
  service.addNewItem("foodbyname", "/search_mealbyname", "Search a recipe by it's name", "searchRecipe", "Search a recipe");
  res.redirect('/home');
});

router.get('/search_mealbyname/:id', async function(req, res, next) {
  await service.searchMeal(req.params.id, 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + req.query.searchRecipe, service._list_widget);
  res.redirect('/home');
});

// ------ GET MEAL BY INGREDIENT  ------ //
router.get('/mealbyingredient', async function(req, res, next) {
  await service.addNewItemParameter("foodbyingredient", "/search_mealbyingredient", "Search a recipe by it's ingredients", "searchIngredient", null, 'https://www.themealdb.com/api/json/v1/1/list.php?i=list', "ingredient");
  res.redirect('/home');
});

router.get('/search_mealbyingredient/:id', async function(req, res, next) {
  await service.searchMeal(req.params.id, 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + req.query.searchIngredient, service._list_widget);
  res.redirect('/home');
});

// ------ GET MEAL BY CATEGORY  ------ //
router.get('/mealbycategory', async function(req, res, next) {
  await service.addNewItemParameter("foodbycategory", "/search_mealbycategory", "Search a recipe by it's category", "searchCategory", null, 'https://www.themealdb.com/api/json/v1/1/list.php?c=list', "category");
  res.redirect('/home');
});

router.get('/search_mealbycategory/:id', async function(req, res, next) {
  await service.searchMeal(req.params.id, 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + req.query.searchCategory, service._list_widget);
  res.redirect('/home');
});

// ------ GET MEAL BY AREA  ------ //
router.get('/mealbyarea', async function(req, res, next) {
  await service.addNewItemParameter("foodbyarea", "/search_mealbyarea", "Search a recipe by it's area", "searchArea", null, 'https://www.themealdb.com/api/json/v1/1/list.php?a=list', "area");
  res.redirect('/home');
});

router.get('/search_mealbyarea/:id', async function(req, res, next) {
  await service.searchMeal(req.params.id, 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + req.query.searchArea, service._list_widget);
  res.redirect('/home');
});
/* MEAL SCOPE END */


module.exports = router;

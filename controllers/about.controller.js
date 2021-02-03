let app = require('../app');
let moment = require('moment');
let os = require("os");
require('dotenv').config();

function about(req, res) {
    return ({
        client: {
            host: req.connection.remoteAddress,
        },
        server: {
            current_time: Math.floor(new Date() / 1000).valueOf().toString(),
            "services": [{
                "name": "Imdb",
                "widgets": [{
                    "name": "search_movie",
                    "description": "Search movie name on Imdb",
                    "params": [{
                        "name": "movie_name",
                        "type": "string"
                    }]
                }, {
                    "name": "search_actor",
                    "description": "Search actor name on Imdb",
                    "params": [{
                        "name": "actor_name",
                        "type": "string"
                    }]
                }]
            }, {
                "name": "shiba",
                "widgets": [{
                    "name": "generate_shiba",
                    "description": "Display random shiba picture",
                    "params": [{}]
                }]
            }, {
                "name": "dog",
                "widgets": [{
                    "name": "generate_dog",
                    "description": "Display random dog picture",
                    "params": [{}]
                }]
            }, {
                "name": "cat",
                "widgets": [{
                    "name": "generate_cat",
                    "description": "Display random cat picture",
                    "params": [{}]
                }]
            }, {
                "name": "food",
                "widgets":  [{
                    "name": "generate_recipe",
                    "description": "Generate a random recipe",
                    "params": [{}]
                }, {
                    "name": "search_recipe_name",
                    "description": "Search for a recipe by it's name",
                    "params": [{
                        "name": "recipe_name",
                        "type": "string"
                    }]
                }, {
                    "name": "search_recipe_ingredients",
                    "description": "Search for a recipe by it's ingredients",
                    "params": [{
                        "name": "recipe_ingredients",
                        "type": "string"
                    }]
                }, {
                    "name": "search_recipe_category",
                    "description": "Search for a recipe by it's category",
                    "params": [{
                        "name": "recipe_category",
                        "type": "string"
                    }]
                }, {
                    "name": "search_recipe_area",
                    "description": "Search for a recipe by it's area",
                    "params": [{
                        "name": "recipe_area",
                        "type": "string"
                    }]
                }]
            }
            ]
        }
    });
}

module.exports = about;
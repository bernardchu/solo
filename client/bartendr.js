angular.module('bartendr', [])
.factory('Drinks', function($http) {
  var getDrinks = function() {
    return $http({
      method: 'GET',
      url: '/drinks'
    })
    .then(function(res){
      return res.data;
    });
  };
  return {
    getDrinks: getDrinks
  };
})
.factory('Ingredients',function($http) {
  var getIngredients = function() {
    return $http({
      method: 'GET',
      url: '/ingredients'
    })
    .then(function(res){
      console.log(res);
      return res.data;
    });
  };
  return {
    getIngredients: getIngredients
  };
})
.controller('DrinkController', function($scope, Drinks) {
  Drinks.getDrinks()
    .then(function(drinks) {
      $scope.drinks = drinks;
    });
})
.controller('IngredientController',function($scope, Ingredients) {
  Ingredients.getIngredients()
    .then(function(ingredients) {
      $scope.ingredients = ingredients;
    });
    console.log
});

/* --------------Old jQuery version */


// var app = {
//   init: function() {
//     this.getStock();
//     this.getDrinks();
//     this.getIngredients();
//   },
//   toggleIngredient: function() {
//     var ing = $('.allIngredients option:selected').val();
//     $.ajax({
//       type: "POST",
//       url: '/ingredients',
//       data: ing,
//       success: function(res) {
//         app.getStock();
//         app.getDrinks();
//       }
//     });
//   },
//   newIngredient: function() {
//     var ing = prompt('What is the new ingredient\'s name?');
//     if (ing) {
//       $.ajax({
//         type: "POST",
//         url: '/ingredients/new',
//         data: ing,
//         success: function(res) {
//           console.log(res);
//           app.getIngredients();
//         }
//       });
//     }
//   },
//   getStock: function() {
//     $.ajax({
//       type: "GET",
//       url: '/ingredients/stock',
//       success: function(res) {
//         app.populateStock(res);
//       }
//     });
//   },
//   getIngredients: function() {
//     $.ajax({
//       type: "GET",
//       url: '/ingredients/all',
//       success: function(res) {
//         app.populateIngredients(res);
//       }
//     });
//   },
//   getDrinks: function() {
//     $.ajax({
//       type: "GET",
//       url: '/drinks',
//       success: function(res) {
//         app.populateDrinks(res);
//       }
//     });
//   },
//   populateStock: function(data) {
//     $('#ingredients').children().remove();
//     for (var i = 0; i < data.length; i++) {
//       var ing = '<li>' + data[i].name + '</li>'
//       $('#ingredients').append(ing);
//     }
//   },
//   populateIngredients: function(data) {
//     $('.allIngredients').children().remove();
//     for (var i = 0; i < data.length; i++) {
//       var ing = '<option value="' + data[i].name + '">' + data[i].name + '</option>'
//       $('.allIngredients').append(ing);
//     }
//   },
//   populateDrinks: function(data) {
//     $('#drinks').children().remove();
//     for (var i = 0; i < data.length; i++) {
//       var drink = '<li class="drink" onclick=app.toggleInstructions($(this))>' + data[i].name + '</li>';
//       var instructions = '<li class="instructions">' + data[i].instructions + '</li>';
//       $('#drinks').append(drink);
//       $('#drinks').append(instructions);
//     }
//   },
//   toggleInstructions: function(el) {
//     el.next().slideToggle();
//   },
//   newRecipe: function() {
//     var ingredients = $('#recipe').val();
//     if (!ingredients) {
//       alert('Recipe should contain at least one ingredient.');
//       return;
//     }
//     console.log(ingredients);
//     var postData = {
//       name: $("#drinkName").val(),
//       ingredients: ingredients,
//       instructions: $("#instructions").val()
//     };
//     $.ajax({
//       type: "POST",
//       url: '/drinks',
//       data: postData,
//       success: function(res) {
//         console.log(res);
//         app.getDrinks();
//       }
//     });
//   }
// }
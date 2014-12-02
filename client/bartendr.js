angular.module('bartendr', ['ngMaterial'])
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

  var postDrink = function($scope) {
    if (!$scope.recipeIngredients) {
      alert('Recipe should contain at least one ingredient.');
      return;
    }
    if (!$scope.instructions) {
      alert('Please provide instructions for your recipe.');
      return;
    }
    if (!$scope.drinkName) {
      alert('Please name your drink.');
      return;
    }
    var data = {
      instructions: $scope.instructions,
      name: $scope.drinkName,
      ingredients: $scope.recipeIngredients
    };
    return $http({
      method: 'POST',
      url: '/drinks',
      data: data
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    getDrinks: getDrinks,
    postDrink: postDrink
  };
})
.factory('Ingredients',function($http) {
  var getIngredients = function() {
    return $http({
      method: 'GET',
      url: '/ingredients'
    })
    .then(function(res){
      return res.data;
    });
  };

  var toggleIngredient = function($scope) {
    var ing = $scope.toggle;
    return $http({
      method: 'POST',
      url: '/ingredients',
      data: { ingredient:ing }
    })
    .then(function(res){
      return res.data;
    });
  };

  var newIngredient = function() {
    var ing = prompt('What is the new ingredient\'s name?');
    if (ing) {
      return $http({
        method: 'POST',
        url: '/ingredients/new',
        data: { ingredient:ing }
      })
      .then(function(res){
        return res.data;
      });
    }
  };

  var nextIngredient = function() {
    return $http({
      method: 'GET',
      url: '/ingredients/next'
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    getIngredients: getIngredients,
    toggleIngredient: toggleIngredient,
    newIngredient: newIngredient,
    nextIngredient: nextIngredient
  };
})
.controller('DrinkController', function($rootScope, $scope, Drinks) {
  Drinks.getDrinks()
    .then(function(drinks) {
      $rootScope.drinks = drinks;
    });
  $scope.toggleInstructions = function(element) {
    $scope.instructionsDisplay = element.instructions;
  };
  $scope.instructionsDisplay = 'Instructions will display here.'
})
.controller('IngredientController',function($rootScope, $scope, Ingredients, Drinks) {
  Ingredients.getIngredients()
    .then(function(ingredients) {
      $scope.ingredients = ingredients;
    });
  $scope.toggleIngredient = function(){
    Ingredients.toggleIngredient($scope)
      .then(function(ingredients) {
        $scope.ingredients = ingredients;
        Drinks.getDrinks()
          .then(function(drinks) {
            $rootScope.drinks = drinks;
          });
      });
  };
  $scope.newIngredient = function(){
    Ingredients.newIngredient()
      .then(function(ingredients) {
        $scope.ingredients = ingredients;
      });
  };
})
.controller('RecipeController', function($rootScope, $scope, Ingredients, Drinks) {
  Ingredients.getIngredients()
    .then(function(ingredients) {
      $scope.ingredients = ingredients;
    });
  $scope.newRecipe = function() {
    Drinks.postDrink($scope)
      .then(function(drinks) {
        console.log(drinks);
        $rootScope.drinks = drinks;
      });
  };
})
.controller('NextIngredientController', function($rootScope, $scope, Ingredients) {
  Ingredients.nextIngredient()
    .then(function(ingredients) {
      $rootScope.nextIngredient = ingredients;
    });
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
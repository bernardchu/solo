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
      $rootScope.ingredients = ingredients;
    });
  $scope.toggleIngredient = function(){
    Ingredients.toggleIngredient($scope)
      .then(function(ingredients) {
        $rootScope.ingredients = ingredients;
        Drinks.getDrinks()
          .then(function(drinks) {
            $rootScope.drinks = drinks;
            Ingredients.nextIngredient()
              .then(function(ingredients) {
                $rootScope.nextIngredient = ingredients;
              });
          });
      });
  };
  $scope.newIngredient = function(){
    Ingredients.newIngredient()
      .then(function(ingredients) {
        $rootScope.ingredients = ingredients;
      });
  };
})
.controller('RecipeController', function($rootScope, $scope, Ingredients, Drinks) {
  Ingredients.getIngredients()
    .then(function(ingredients) {
      $rootScope.ingredients = ingredients;
    });
  $scope.newRecipe = function() {
    Drinks.postDrink($scope)
      .then(function(drinks) {
        console.log(drinks);
        $rootScope.drinks = drinks;
        Ingredients.nextIngredient()
          .then(function(ingredients) {
            $rootScope.nextIngredient = ingredients;
          });
      });
  };
})
.controller('NextIngredientController', function($rootScope, $scope, Ingredients) {
  Ingredients.nextIngredient()
    .then(function(ingredients) {
      $rootScope.nextIngredient = ingredients;
    });
});

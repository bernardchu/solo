var app = {
  init: function() {
    this.getStock();
    this.getDrinks();
    this.getIngredients();
  },
  toggleIngredient: function() {
    var ing = $('.allIngredients option:selected').val();
    $.ajax({
      type: "POST",
      url: '/ingredients',
      data: ing,
      success: function(res) {
        app.getStock();
        app.getDrinks();
      }
    });
  },
  newIngredient: function() {
    var ing = prompt('What is the new ingredient\'s name?');
    if (ing) {
      $.ajax({
        type: "POST",
        url: '/ingredients/new',
        data: ing,
        success: function(res) {
          console.log(res);
          app.getIngredients();
        }
      });
    }
  },
  getStock: function() {
    $.ajax({
      type: "GET",
      url: '/ingredients/stock',
      success: function(res) {
        app.populateStock(res);
      }
    });
  },
  getIngredients: function() {
    $.ajax({
      type: "GET",
      url: '/ingredients/all',
      success: function(res) {
        app.populateIngredients(res);
      }
    });
  },
  getDrinks: function() {
    $.ajax({
      type: "GET",
      url: '/drinks',
      success: function(res) {
        app.populateDrinks(res);
      }
    });
  },
  populateStock: function(data) {
    $('#ingredients').children().remove();
    for (var i = 0; i < data.length; i++) {
      var ing = '<li>' + data[i].name + '</li>'
      $('#ingredients').append(ing);
    }
  },
  populateIngredients: function(data) {
    $('.allIngredients').children().remove();
    for (var i = 0; i < data.length; i++) {
      var ing = '<option value="' + data[i].name + '">' + data[i].name + '</option>'
      $('.allIngredients').append(ing);
    }
  },
  populateDrinks: function(data) {
    $('#drinks').children().remove();
    for (var i = 0; i < data.length; i++) {
      var drink = '<li>' + data[i].name + '</li>'
      $('#drinks').append(drink);
    }
  },
  newRecipe: function() {
    var ingredients = $('#recipe').val();
    if (!ingredients) {
      alert('Recipe should contain at least one ingredient.');
      return;
    }
    console.log(ingredients);
    var postData = {
      ingredients: ingredients,
      instructions: $("#instructions").val()
    };
    $.ajax({
      type: "POST",
      url: '/drinks',
      data: postData,
      success: function(res) {
        console.log(res);
        app.getDrinks();
      }
    });
  }
}
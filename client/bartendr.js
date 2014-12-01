var app = {
  init: function() {
    this.getStock();
    this.getDrinks();
    this.getIngredients();
  },
  postIngredients: function() {
    var ing = $('#allIngredients option:selected').val();
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
    $('#allIngredients').children().remove();
    for (var i = 0; i < data.length; i++) {
      var ing = '<option value="' + data[i].name + '">' + data[i].name + '</option>'
      $('#allIngredients').append(ing);
    }
  },
  populateDrinks: function(data) {
    $('#drinks').children().remove();
    for (var i = 0; i < data.length; i++) {
      var drink = '<li>' + data[i].name + '</li>'
      $('#drinks').append(drink);
    }
  },
}
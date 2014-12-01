var app = {
  init: function() {
    this.getIngredients();
    this.getDrinks();
  },
  postIngredients: function() {
    var ing = $('#inStock option:selected').val();
    $.ajax({
      type: "POST",
      url: '/ingredients',
      data: ing,
      success: function(res) {
        app.init();
      }
    });
  },
  getIngredients: function() {
    $.ajax({
      type: "GET",
      url: '/ingredients',
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
  populateIngredients: function(data) {
    $('#ingredients').children().remove();
    for (var i = 0; i < data.length; i++) {
      var ing = '<li>' + data[i].name + '</li>'
      $('#ingredients').append(ing);
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
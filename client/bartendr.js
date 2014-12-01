var app = {
  init: function() {
    this.getIngredients();
  },
  postIngredients: function() {
    var ing = $('#inStock option:selected').val();
    $.ajax({
      type: "POST",
      url: '/ingredients',
      data: ing,
      success: function(res) {
        console.log(res);
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
  populateIngredients: function(data) {
    for (var i = 0; i < data.length; i++) {
      var ing = '<li>' + data[i].name + '</li>'
      $('#ingredients').append(ing);
    }
  }
}
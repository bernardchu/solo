var app = {
  init: function() {
    
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
  }
}
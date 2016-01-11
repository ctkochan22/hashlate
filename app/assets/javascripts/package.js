$(document).ready(function(){

  $('.api_form').on('submit', function(event){
    var $form = $(event.target)
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/hash',
      data: $form.serialize(),
      dataType: 'html'
    }).done(function(response){
      console.log(response);
      $('#api-container').html(response);
    });//done

    var api = "https://congress.api.sunlightfoundation.com/bills?congress=113&apikey=f5da3fb0d7b64be8b718f83d2be029e5"

    $.ajax({
      type: 'GET',
      url: api
    }).done(function(response){
      console.log(response['results'][1]['last_version']['urls']['xml'])
    });
  }); //'$form'

  click_for_path();

  $('#close-btn').on('click', function(event){
    event.preventDefault();
    $('#path-display').empty();
    $('#path-container').hide();
  })
});//$document ready


function click_for_path() {
  $('#api-container').on('click', 'p', function(event){
    event.preventDefault();
    var path = $(this).attr("data-path");
    var path_html = "<pre id='path-show'>" + path + "</pre>";
    console.log(path_html);

    $('#path-display').html(path_html);
    $('#path-container').show();
  });
};




// ### UN-USED FUNCTIONS ##
// #hashify -- RECURSIVE -- one package
function hashify(obj_package, base_path){
  var full_html = "";
  var counter = 0;

  // ARRAY
  if (Array.isArray(obj_package)) {
    console.log("Caught Array");

    full_html += "<p data-path='" + base_path + "'>[</p>";
    for (var i = 0; i < obj_package.length; i++) {
      var new_base_path = base_path + "[" + i.toString() + "]";
      var new_html_item = hashify(obj_package[i], new_base_path);
      var full_html_item;

      if (i === (obj_package.length - 1)) {
        full_html_item = "<p data-path='" + new_base_path + "'>" + new_html_item + "</p>";
      } else {
        full_html_item = "<p data-path='" + new_base_path + "'>" + new_html_item + ",</p>";
      };
      full_html += full_html_item;
    }; //for loop

    full_html += "<p data-path='" + base_path + "'>]</p>";
    return full_html;

  //OBJECT
  } else if (typeof obj_package === 'object') {
    console.log("Caught Object");
    full_html += "<p data-path='" + base_path + "'>{</p>";
    var object_html = "";

    for (var key in obj_package){
      // ** need to do something with key
      var new_base_path = base_path + "[" + key + "]";
      var new_html_item = hashify(obj_package[key], new_base_path);
      var full_html_item = "<p data-path='" + new_base_path + "'>" + key + ": " + new_html_item + ",</p>";
      object_html += full_html_item;
    };
    object_html = object_html.slice(0, -5) + object_html.slice(-4);
    full_html += object_html;
    full_html += "<p data-path='" + base_path + "'>}</p>";
    return full_html;

  //SINGLE ELEMENT
  } else {
    console.log("Caught Single Element");

    if (typeof obj_package === "number") {
      return obj_package.toString();
    } else if (typeof obj_package === "string") {
      return obj_package;
    } else if (typeof obj_package === "boolean") {
      return obj_package.toString();
    } else if (typeof obj_package === "undefined") {
      return "UNDEFINED";
    } else {
      //ERROR CASE
      return "ERROR: Fatal Failure";
    };

  };
}; //


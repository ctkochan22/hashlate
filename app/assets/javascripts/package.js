$(document).ready(function(){

  $('form').on('submit', function(event){
    event.preventDefault();
    console.log("Form Firing:");
    var input = $(package).val();

    this.reset();

    $.ajax({
      type: 'GET',
      url: input
    }).done(function(response){
      console.log("Response Received");
      // var html_package = hashify(response,"");
      // console.log(html_package);
      // $('#api-container').html(html_package);


      hashify_append(response, "", '#api-container');

    });//done
  }); //'$form'
});//$document ready


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


// #hashify -- recursive -- multiple packages **DOESNT FIX ***
// function hashify_append(obj_package, base_path, container){
//   var full_html ="";
//   $('#api-container').empty();

//   // ARRAY
//   if (Array.isArray(obj_package)) {
//     console.log("Caught Array");

//     var pre_array_html ="";
//     pre_array_html = "<p data-path='" + base_path + "'>[</p>";
//     $(container).append(pre_array_html);

//     for (var i = 0; i < obj_package.length; i++) {
//       var new_base_path = base_path + "[" + i.toString() + "]";
//       var new_html_item = hashify(obj_package[i], new_base_path);
//       var full_html_item;

//       if (i === (obj_package.length - 1)) {
//         full_html_item = "<p data-path='" + new_base_path + "'>" + new_html_item + "</p>";
//       } else {
//         full_html_item = "<p data-path='" + new_base_path + "'>" + new_html_item + ",</p>";
//       };
//       // full_html += full_html_item;
//       $(container).append(full_html_item);
//     }; //for loop

//     pre_array_html = "<p data-path='" + base_path + "'>]</p>";

//     $(container).append(pre_array_html);

//     return;

//   //OBJECT
//   } else if (typeof obj_package === 'object') {
//     console.log("Caught Object");

//     var pre_object_html;
//     pre_object_html = "<p data-path='" + base_path + "'>{</p>";
//     $(container).append(pre_object_html);

//     var object_html = "";
//     for (var key in obj_package){
//       // ** need to do something with key
//       var new_base_path = base_path + "[" + key + "]";
//       var new_html_item = hashify(obj_package[key], new_base_path);
//       var full_html_item = "<p data-path='" + new_base_path + "'>" + key + ": " + new_html_item + ",</p>";
//       object_html += full_html_item;
//     };
//     object_html = object_html.slice(0, -5) + object_html.slice(-4);

//     $(container).append(object_html);
//     pre_object_html = "<p data-path='" + base_path + "'>}</p>";
//     $(container).append(pre_object_html);

//     return;

//   //SINGLE ELEMENT
//   } else {
//     console.log("Caught Single Element");

//     if (typeof obj_package === "number") {
//       $(container).append(obj_package.toString());
//     } else if (typeof obj_package === "string") {
//       $(container).append(obj_package);
//     } else if (typeof obj_package === "boolean") {
//       $(container).append(obj_package.toString());
//     } else if (typeof obj_package === "undefined") {
//       return "UNDEFINED";
//     } else {
//       //ERROR CASE
//       return "ERROR: Fatal Failure";
//     };

//   };
// }; //




//Function turns link into string
function xml_to_string(input){
    $.ajax({
      type: 'GET',
      url: input
    }).done(function(response){
      console.log(response);
      var xmlText = new XMLSerializer().serializeToString(response);
      var xmlTextNode = document.createTextNode(xmlText);
      console.log(xmlTextNode);
      $('#api-container').html(xmlTextNode);
    });
}
$(document).ready(function(){

  $('form').on('submit', function(event){
    event.preventDefault();
    console.log("Form Firing:");
    var input = $(package).val();

    $.ajax({
      type: 'GET',
      url: input
    }).done(function(response){

    });//done
  }); //'$form'
});//$document ready









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
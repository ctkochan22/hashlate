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
      $('#api-container').html(response);
    });//done
  }); //'$form'

  click_for_path();
  close_path();
  reload_page();
  click_about();
  close_about();

});//$document ready


//FUNCTIONS
function click_for_path() {
  $('#api-container').on('click', 'p', function(event){
    event.preventDefault();

    var target = "<p>" + $(this).html() + "</p";
    $('#target-element').html(target);
    var path = $(this).attr("data-path");
    var path_html = "<pre id='path-show'>" + path + "</pre>";

    $('#path-display').html(path_html);
    $('#path-container').show();
  });
};

function close_path() {
  $('#close-btn').on('click', function(event){
    event.preventDefault();
    $('#path-display').empty();
    $('#path-container').hide();
  });
};

function reload_page(){
  $('#logo').on('click', function(event){
    location.reload();
  });
};


function click_about() {
  $('#about-link').on('click', function(event){
    event.preventDefault();
    $('#about').toggle();
  });
};

function close_about() {
  $('#about-close').on('click', function(event){
    event.preventDefault();
    $('#about').hide();
  });
};
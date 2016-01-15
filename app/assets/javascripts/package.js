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

});//$document ready


function click_for_path() {
  $('#api-container').on('click', 'p', function(event){
    event.preventDefault();

    var target = "<p>" + $(this).html() + "</p";
    $('#target-element').html(target);

    var path = $(this).attr("data-path");
    var path_html = "<pre id='path-show'>" + path + "</pre>";
    console.log(path_html);

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



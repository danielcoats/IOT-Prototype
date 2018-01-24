$(document).ready(function() {
  // Add device counts to filters.
  var filters = $('.device-filters .list-group-item');
  filters.each(function(){
    var tab = $(this).attr('data-tab');
    var num_room = $('[data-room=' + tab + ']').length;
    var num_type = $('[data-type=' + tab + ']').length;
    if (num_room) {
      $(this).children('.badge').text(num_room);
    } else {
      $(this).children('.badge').text(num_type);
    }
  });

  // Add total device count to 'All' filters.
  var num_all = $('[data-room]').length;
  $('[data-tab=all] .badge').text(num_all);

  // Initialise switches.
  $("[name='lock-switch']").bootstrapSwitch({
    onText: '<i class="fa fa-fw fa-lock"></i>',
    offText: '<i class="fa fa-fw fa-unlock-alt"></i>'
  });
  $("[name='entry-camera-switch']").bootstrapSwitch();
  $("[name='kitchen-camera-switch']").bootstrapSwitch();
  $("[name='lounge-camera-switch']").bootstrapSwitch();
  $("[name='switch']").bootstrapSwitch();

  // When switch in devices list is changed, change modal switch and vice versa.
  $('input').on('switchChange.bootstrapSwitch', function(event, state) {
    var name = $(this).attr('name');
    if (name != 'switch') {
      $("[name='" + name + "']" ).bootstrapSwitch('state', state);
    }
  });

  // When door is locked, change front door image and kitchen images.
  $('input').on('switchChange.bootstrapSwitch', function(event, state) {
    var name = $(this).attr('name');
    if (name == 'lock-switch') {
      if (state) {
        $('#kitchenCameraModal img.kitchen').show();
        $('#kitchenCameraModal img.kitchen-workman').hide();
        $('#entryCameraModal img.entry').hide();
        $('#entryCameraModal img.entry-workman').show();
      } else {
        $('#kitchenCameraModal img.kitchen').hide();
        $('#kitchenCameraModal img.kitchen-workman').show();
        $('#entryCameraModal img.entry').show();
        $('#entryCameraModal img.entry-workman').hide();
      }
    }
  });

  // When Camera turned off, black out screen.
  $('.camera-switch').on('switchChange.bootstrapSwitch', function(event, state) {
    if ($(this).attr('name') == 'entry-camera-switch') {
      if (state) {
        $('#entryCameraModal .overlay').hide();
      } else {
        $('#entryCameraModal .overlay').show();
        $('#entryCameraModal .play-button').show();
      }
    } else if ($(this).attr('name') == 'lounge-camera-switch') {
      if (state) {
        $('#loungeCameraModal .overlay').hide();
      } else {
        $('#loungeCameraModal .overlay').show();
        $('#loungeCameraModal .play-button').show();
      }
    } else if ($(this).attr('name') == 'kitchen-camera-switch') {
      if (state) {
        $('#kitchenCameraModal .overlay').hide();
      } else {
        $('#kitchenCameraModal .overlay').show();
        $('#kitchenCameraModal .play-button').show();
      }
    }
  });

  // Dashboard camera toggle.
  $('#select-camera').change(function() {
    var camera = $('#select-camera :selected').val();
    $('.camera-feeds .video-feed').hide();
    $('.play-button').show(); // Pause video when changing camera.
    $('.camera-feeds .video-feed[data-image=' + camera + ']').show();
  });

  // Room/Type toggle.
  $('.device-toggle .btn').click(function() {
    var tab_id = $(this).attr('data-tab');
    $('.device-toggle .btn').removeClass('active');
    $('.device-filters').hide();
    $(this).addClass('active');
    $("#" + tab_id).show();
  });

  // Room tabs.
  $('#room-list .list-group-item').click(function(){
    var room = $(this).attr('data-tab');
    $('#room-list .list-group-item').removeClass('active');
    $('#type-list .list-group-item').removeClass('active');
    $('.devices a').hide();
    $(this).addClass('active');
    if (room == 'all') {
      $('.devices a').show();
    } else {
      $('.devices a[data-room=' + room + ']').show();
    }
    $('.device-toolbar h4').text($(this).text().slice(0,-2));
  });

  // Types tabs.
  $('#type-list .list-group-item').click(function(){
    var type = $(this).attr('data-tab');
    $('#type-list .list-group-item').removeClass('active');
    $('#room-list .list-group-item').removeClass('active');
    $('.devices a').hide();
    $(this).addClass('active');
    if (type == 'all') {
      $('.devices a').show();
    } else {
      $('.devices a[data-type=' + type + ']').show();
    }
    $('.device-toolbar h4').text($(this).text().slice(0,-2));
  });

  // Play video.
  $('.video-feed').click(function(){
    var button = $(this).find('.play-button');
    $(button).toggle();
  });
});

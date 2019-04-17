var prevId;

$(".activity-square").on("click", function() {


    $(this).css({
      'background-color': '#33CCFF',
      'transition-duration' : '.5s',
      'transition-property' : 'background-color'
    });
    $(this).find('img').attr('src', 'images/activityIcons/' + $(this).attr('id') + '-white.png');
    $(this).find('p').css({
      'color' : 'white',
    });


  if (prevId) {
    $("#" + prevId).css({
      'background-color' : 'white'
    });
    $('#' + prevId + " > img").attr('src', 'images/activityIcons/' + prevId + '.png');
    $('#' + prevId + " > p").css({
      'color' : '#242B33'
    });
  }

  prevId = $(this).attr('id');
});

var prevId;

$(".activity-square").on("click", function() {
  $(this).css({
    'background-color': 'white'
  });
  if (prevId) {
    $("#" + prevId).css({
      'background-color' : '#333c48'
    })
  }

  prevId = $(this).attr('id');
});

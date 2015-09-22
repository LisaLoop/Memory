   
$(document).ready(function(){

  var $lastClicked = null;
  // var $lastClickedId;
  // shuffle function
  $("#reset").on("click", function shuffle(event){
      var parent = $("#shuffle");
      var divs = parent.children();
      while (divs.length) {
          parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
  });
  //toggles between hide and show image
  $(".piece").on("click", function(){
    var clicked = this;
    // flip the piece
    $(clicked).find('div').toggleClass('show hidden');

    // if $lastClicked is null, that means this was the first turn
    // so assign $lastClicked to $(clicked)
    if ($lastClicked === null) {
      $lastClicked = $(clicked);
    }
    // if this is the second turn, we'll go into this code block...
    else {
      var $lastClicked_temp = $lastClicked;
      var $clicked_temp = $(clicked);
      // grab the class that represents the piece's image
      // (first class in the list of classes)
      var _this = $clicked_temp.find('div').first().attr('class').split(' ')[0];
      var last = $lastClicked.find('div').first().attr('class').split(' ')[0];
      var samePiece = ($clicked_temp.attr('id') === $lastClicked.attr('id'));

      if (_this === last && !samePiece) {
        console.log('match!');
      }
      else {
        console.log('no match!');
        window.setTimeout(function(){
          $clicked_temp.find('div').toggleClass('show hidden');
          $($lastClicked_temp).find('div').toggleClass('show hidden');
        },1000);
      }
      $lastClicked = null;
    }

  });

})

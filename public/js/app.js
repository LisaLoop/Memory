function isMatch($lastClicked, $justClicked, $id, $prevId) {
 /* jc - 
    Nice & sound logic and implementation of the Matching game.
    - I'm not seeing any ajax calls within app.js, which was a requirement.
    - Try to keep unused code out of production versions of your code (line 38)
    - Your comments are good, but I'd like to see comments throughout this file.
    - Line 28 never executed
    - Your solution for the timeout delay with the card mismatches is fine; 
      I'd recommend looking into toggling transitions with css instead, as it takes
      less code and it would look nice and smooth
    - Excellent formatting and indentation :)
 */
  var prevVal;
  var currentVal;
  var sameCardClicked = false;
  if ($lastClicked === undefined) {
    prevVal = undefined;
  } else {
    prevVal = $lastClicked;
  }
  currentVal = $justClicked;
  if ($prevId !== undefined){
    if($prevId === $id){
      sameCardClicked = true;
    }
  }

  var match = ((!sameCardClicked) && (prevVal === currentVal));


  if (match) {
    // stay flipped
    alert("match!");
  } else {
    // hide clicked elements 
    $(this).f.toggleClass("hideImg");    
  }

}

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
        /* jc - consider changing this code (lines 79 to 82) to use a transition effect from flipped to hidden */
        window.setTimeout(function(){
          $clicked_temp.find('div').toggleClass('show hidden');
          $($lastClicked_temp).find('div').toggleClass('show hidden');
        },1000);
      }
      $lastClicked = null;
    }

  });

})

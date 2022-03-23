$(document).ready(function () {
  $("#btn").on('click', function () {
    console.log("REGULAR FUNCTION:", this); //The this keyword is a reference to the button
  });

  // Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.
  $("textarea").on('input', function (e) {
    const max = 140;
    const txtLength = $(this).val().length;
    let charCountDown = max - txtLength;

    const charCountDisplay = $(this).next().children(".counter");
    if (charCountDown < 0) {
      $(charCountDisplay).css("color", "red").html(charCountDown);
    } else {
      $(charCountDisplay).css("color", "#545149").html(charCountDown);
    }
  });
}); 
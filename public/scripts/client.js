/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function prevents XSS with escaping
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetObj) {
  console.log('Tweet Object', tweetObj);
  const $tweet = $(`
    <article class="tweet">
        <header>
          <img src="/images/profile-pic.png" />
          <span id="name">${tweetObj.user.name}</span>
          <span id="handle">${tweetObj.user.handle}</span>
        </header>
        <p class="tweetObj">${escape(tweetObj.content.text)}</span>
        <footer>
          <span class="days-ago">${timeago.format(tweetObj.created_at)}</span>
          <div id="icons">
            <!-- flag icon -->
            <i class="fa-solid fa-flag"></i>
            <!-- re-tweet arrow icon -->
            <i class="fa-solid fa-retweet"></i>
            <!-- heart icon -->
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer >
      </article >
  `);
  return $tweet;
};
// const $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
// return ($tweet); // to see what it looks like

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const result = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(result);
  }
};
// to add it to the page so we can make sure it's got all the right elements, classes, etc.

const formValidation = function () {
  const tweetText = $('#tweet-text').val();

  // delete previous errors
  $('.error').remove();

  // User can't enter blank text
  if (!tweetText) {
    // Old js alert
    // alert('Error. Tweet is empty.');
    $("#errorEmpty").slideDown();
    return false;
  }
  if (tweetText.length > 140) {
    // alert('Ne pas de over 140 characters.');
    $("#errorLengthTooLong").slideDown();
    return false;
  }
  // Hide error messages if they've been corrected
  $("#errorEmpty").slideUp();
  $("#errorLengthTooLong").slideUp();
  return true;
};






// A $( document ).ready() block.
$(document).ready(function () {
  console.log("Document is now ready!");
  //and sends ajax post to server
  const submitHandler = function (event) {
    // prevent default submit behavior
    event.preventDefault();

    if (formValidation()) {
      // Serialize the form data
      const tweetTextSerialized = $(event.target).serialize();

      // Use the jQuery library to submit a POST request that sends the serialized data to the server
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweetTextSerialized
      })
        .then(res => {
          console.log("AJAX post result:", res);
          // Reset the tweet text area to blank after submit
          $('#tweet-text').val('');
          loadTweets();
        })
        .catch(err => console.log(err));
    }
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      // dataType: 'json', // added data type
    })
      .then((req, res) => {
        console.log("AJAX GET /tweets request:", req, "GET / tweets response:", res);
        renderTweets(req);
      })
      .catch(err => console.log(err));
  };
  loadTweets();

  // Add an event listener for submit
  $('#tweet-form').on('submit', submitHandler);

}); // $(document).ready(function () {
// test





;

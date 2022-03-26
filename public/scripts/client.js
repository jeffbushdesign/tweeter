/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

const createTweetElement = function (tweetObj) {
  console.log('Tweet Object', tweetObj);
  const $tweet = $(`
    <article class="tweet">
        <header>
          <img src="/images/profile-pic.png" />
          <span id="name">${tweetObj.user.name}</span>
          <span id="handle">${tweetObj.user.handle}</span>
        </header>
        <span class="tweet">${tweetObj.content.text}</span>
        <footer>
          <span class="days-ago">10 days ago</span>
          <div id="icons">
            <!-- flag icon -->
            <i class="fa-solid fa-flag"></i>
            <!-- re-tweet arrow icon -->
            <i class="fa-solid fa-retweet"></i>
            <!-- heart icon -->
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
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






// A $( document ).ready() block.
$(document).ready(function () {
  console.log("Document is now ready!");
  //and sends ajax post to server
  const submitHandler = function (event) {
    // prevent default submit behavior
    event.preventDefault();
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







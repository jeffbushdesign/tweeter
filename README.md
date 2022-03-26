# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express back-end skills.

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script>
$(function() {
  const $button = $('#load-more-posts');
  $button.on('click', function () {
    console.log('Button clicked, performing ajax call...');
    $.ajax('more-posts.html', { method: 'GET' })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
      $button.replaceWith(morePostsHtml);
    });
  });
});
</script>

$.ajax({
url: "https://app.asana.com/-/api/0.1/workspaces/",
type: 'GET',
dataType: 'json', // added data type
success: function(res) {
console.log(res);
alert(res);
}
});

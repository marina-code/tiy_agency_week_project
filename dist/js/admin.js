'use strict';

$(document).ready(function () {

	// Gets contents from tinyMCE Editor
	//tinyMCE.get('blogTextArea').getContent()

	var CreateBlog = function () {

		function init(e) {
			e.preventDefault();

			getBlogContents();
		}

		function getBlogContents() {
			var blogTitle = $('#blogTitle').val();
			var blogContent = tinyMCE.get('blogTextArea').getContent();

			var isValidData = validateInputs(blogTitle, blogContent);

			if (isValidData) {
				postData(blogTitle, blogContent);
			}
		}

		function validateInputs(title, content) {
			title = _.trim(title);
			content = _.trim(content);

			if (title === '' || typeof title === 'undefined' || content === '' || typeof content === 'undefined') {
				// No, warn the user and return false
				alert('Please check you\'ve entered a title and content for your blog and try again.');
				return false;
			}

			return true;
		}

		function postData(title, content) {
			console.log(title);
			console.log(content);

			$.ajax({
				method: 'POST',
				headers: { "X_CSRF_TOKEN": localStorage.getItem('token') },
				data: { title: title, description: content },
				url: 'https://tiyagencyweek.herokuapp.com/blogs/create',
				success: function success() {
					alert('Your new blog post has been saved');
					window.location.href = "blog.html";
				},
				error: function error(err) {
					console.log("Error! Message: " + e.responseText);
				},
				complete: function complete() {
					console.log("All done!");
				}
			});
		}

		function checkUserLoginStatus() {
			// Is the user logged in?
			if (!localStorage.getItem('token')) {
				// No, redirect to hom page
				window.location.href = "index.html";
			} else {
				// Yes, remove page overlay
				$('#adminOverlay').remove();
			}
		}

		return {
			init: init,
			checkUserLogin: checkUserLoginStatus
		};
	}();

	// Check if user is logged in
	CreateBlog.checkUserLogin();

	// Create Blog form listener
	$('#formBlog').on('submit', CreateBlog.init);
});
document.getElementById('submitPost').addEventListener('click', function() {
    var title = document.getElementById('postTitle').value;
    var body = document.getElementById('postBody').value;

    var data = {
        "title": title,
        "body": body
    };

    fetch('/submit_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert(data.message);
            var modal = new bootstrap.Modal(document.getElementById('newPostModal'));
            modal.hide();
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
});

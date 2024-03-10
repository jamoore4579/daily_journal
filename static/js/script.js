document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("newPostModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
        document.getElementById("modalTitle").innerText = "New Post";
        document.getElementById("postId").value = "";
        document.getElementById("postTitle").value = "";
        document.getElementById("postBody").value = "";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById('submitPost').addEventListener('click', function () {
        var postId = document.getElementById("postId").value;
        var title = document.getElementById('postTitle').value;
        var body = document.getElementById('postBody').value;

        var data = {
            "title": title,
            "body": body
        };

        var url = postId ? '/edit_post/' + postId : '/submit_post';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    modal.style.display = "none";
                    fetchJournalEntries();
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            });
    });

    function fetchJournalEntries() {
        fetch('/get_posts')
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    var journalEntriesSection = document.getElementById('journalEntries');
                    journalEntriesSection.innerHTML = '';
    
                    data.posts.forEach(post => {
                        var entry = document.createElement('div');
                        entry.classList.add('card', 'mb-3');
                        entry.innerHTML = `
                            <div class="card-body">
                                <p class="card-text">${post.body}</p>
                                <button class="edit-btn" data-post-body="${post.body}">Edit</button>
                            </div>
                        `;
                        journalEntriesSection.appendChild(entry);
                    });
    
                    var editButtons = document.getElementsByClassName("edit-btn");
                    Array.from(editButtons).forEach(function(button) {
                        button.addEventListener('click', function() {
                            var postBody = button.getAttribute("data-post-body");
                            // Now you have the post body to work with
                        });
                    });
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while fetching journal entries.");
            });
    }
    

    window.onload = fetchJournalEntries;
});

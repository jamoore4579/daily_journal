// Update the event listener for the submit button
document.getElementById('submitPost').addEventListener('click', function() {
    var title = document.getElementById('postTitle').value;
    var body = document.getElementById('postBody').value;
    
    console.log(title)
    console.log(body)

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
            fetchJournalEntries(); // Call function to fetch and display journal entries
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
});

// Function to fetch and display journal entries
function fetchJournalEntries() {
    fetch('/get_posts')
    .then(response => response.json())
    .then(data => {
        var journalEntriesSection = document.getElementById('journalEntries');
        journalEntriesSection.innerHTML = ''; // Clear existing entries

        data.posts.forEach(post => {
            var entry = document.createElement('div');
            entry.classList.add('card', 'mb-3');
            entry.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                </div>
            `;
            journalEntriesSection.appendChild(entry);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while fetching journal entries.");
    });
}

// Call fetchJournalEntries function when the page loads
window.onload = fetchJournalEntries;

async function newFormHandler(event) {
    event.preventDefault();

    // get the movie title and genre from the form
    const title = document.querySelector('input[name="movie-title"]').value;
    const genre_name = document.querySelector('textarea[name="genre-name"]').value;

    const response = await fetch(`/api/movies`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        genre_name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  // event Listener for the new post submit button
  document.querySelector('.new-movie-form').addEventListener('submit', newFormHandler);

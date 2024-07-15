document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'db.json'; // Path to your local JSON file
    const filmsList = document.getElementById('films');
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');
  
    // Fetch and display the first movie's details from local JSON file
    fetch(`${baseUrl}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming films are under the "films" key in db.json
        const movies = data.films;
  
        // Display the first movie's details initially
        displayMovieDetails(movies[0]);
  
        // Display films list
        displayFilmsList(movies);
      })
      .catch(error => console.error('Fetch error:', error));
  
    // Display movie details function
    function displayMovieDetails(movie) {
      poster.src = movie.poster;
      title.textContent = movie.title;
      description.textContent = movie.description;
      runtime.textContent = movie.runtime;
      showtime.textContent = movie.showtime;
      availableTickets.textContent = movie.capacity - movie.tickets_sold;
  
      // Add click event to buy ticket button
      buyTicketButton.onclick = () => buyTicket(movie);
    }
  
    // Display films list function
    function displayFilmsList(movies) {
      filmsList.innerHTML = ''; // Clear any existing list items
      movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.classList.add('film', 'item');
        if (movie.capacity - movie.tickets_sold === 0) {
          li.classList.add('sold-out');
        }
        li.onclick = () => displayMovieDetails(movie);
        filmsList.appendChild(li);
      });
    }
  
    // Buy ticket function
    function buyTicket(movie) {
      const available = movie.capacity - movie.tickets_sold;
      if (available > 0) {
        movie.tickets_sold++;
        availableTickets.textContent = available - 1;
      }
      if (available - 1 === 0) {
        buyTicketButton.textContent = 'Sold Out';
        const filmItems = filmsList.querySelectorAll('.item');
        filmItems.forEach(item => {
          if (item.textContent === movie.title) {
            item.classList.add('sold-out');
          }
        });
      }
    }
  });
  
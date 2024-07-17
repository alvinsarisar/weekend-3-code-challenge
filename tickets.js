document.addEventListener('DOMContentLoaded', () => {
    //DECLARING VARIABLES
    const filmsUrl = 'http://localhost:3000/films'; // This  fetchs the  movies data
    const filmsList = document.getElementById('films'); 
    const poster = document.getElementById('poster'); 
    const title = document.getElementById('title'); 
    const description = document.getElementById('description'); 
    const runtime = document.getElementById('runtime'); 
    const showtime = document.getElementById('showtime'); 
    const availableTickets = document.getElementById('available-tickets'); 
    const buyTicketButton = document.getElementById('buy-ticket'); 

    // 1. function to fetch and display the first movie's details
    fetch(`${filmsUrl}/1`)
        .then(response => response.json()) 
        .then(displayMovieDetails); 

    // 2.function to fetch and display the list of all movies
    fetch(filmsUrl)
        .then(response => response.json()) 
        .then(displayFilmsList); 

    // 3.Function to display movie details
    function displayMovieDetails(movie) {
        poster.src = movie.poster; // Set movie poster
        title.textContent = movie.title; // Set movie title
        description.textContent = movie.description; // Set movie description
        runtime.textContent = movie.runtime; // Set movie runtime
        showtime.textContent = movie.showtime; // Set movie showtime
        availableTickets.textContent = movie.capacity - movie.tickets_sold; // Calculate and set available tickets

        // Adding  click event to Buy Ticket button
        buyTicketButton.onclick = () => buyTicket(movie);
    }

    // 4Function to display films list
    function displayFilmsList(movies) {
        filmsList.innerHTML = ''; // Clear existing list items
        movies.forEach(movie => {
            const li = document.createElement('li'); // Create a list item for each movie
            li.textContent = movie.title; // Setting  movie title as list item text
            li.classList.add('film', 'item'); // Adding  classes to list item
            if (movie.capacity - movie.tickets_sold === 0) {
                li.classList.add('sold-out'); // Adding sold-out class if no tickets available
            }
            li.onclick = () => fetch(`${filmsUrl}/${movie.id}`)
                .then(response => response.json()) 
                .then(displayMovieDetails); // Display selected movie details
            filmsList.appendChild(li); // Append list item to films list
        });
    }

    // 5.Function to handle buying a ticket
    function buyTicket(movie) {
        const available = movie.capacity - movie.tickets_sold; // Calculating  available tickets
        if (available > 0) {
            movie.tickets_sold++; // Increase tickets sold count once purchased
            availableTickets.textContent = available - 1; // Update available tickets display by -1
        }
        if (available - 1 === 0) {
            buyTicketButton.textContent = 'Sold Out'; // Update button text when sold out when available tickets is 0
            const filmItems = filmsList.querySelectorAll('.item'); // Get all movie list items
            filmItems.forEach(item => {
                if (item.textContent === movie.title) {
                    item.classList.add('sold-out'); // Marking sold-out movies in the list
                }
            });
        }
    }
});
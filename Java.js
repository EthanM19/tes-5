document.addEventListener('DOMContentLoaded', function() {
    const limit = 3; 
    const apiKey = 'FmG6h5WJZiGSP4rOGrwmEw==H7kT1Kq7F2jmOqyB'; 
    const refreshButton = document.getElementById('refreshButton');
    const accordionButtons = document.querySelectorAll('.accordion-btn'); 
    
    refreshButton.addEventListener('click', fetchJokes);
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling; 
            accordionContent.classList.toggle('active'); 
        });
    });
    
    function fetchJokes() {
        fetch(`https://api.api-ninjas.com/v1/jokes?limit=${limit}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayJokes(data);
        })
        .catch(error => {
            console.error('Error fetching jokes:', error);
        });
    }
    
    function displayJokes(jokes) {
        const jokesContainer = document.getElementById('jokes-container');
        jokesContainer.innerHTML = ''; 
        
        jokes.forEach(joke => {
            const jokeElement = document.createElement('p');
            jokeElement.textContent = joke.joke;
            jokesContainer.appendChild(jokeElement);
        });
    }
    
    fetchJokes();

    const contactLink = document.querySelector('.footer-links ul li a[href="#contactPopup"]');
    contactLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        document.getElementById("contactPopup").style.display = "block";
    });

    document.getElementById("closeBtn").addEventListener('click', function() {
        document.getElementById("contactPopup").style.display = "none";
    });
});
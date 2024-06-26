// JavaScript for handling star ratings
const starsContainers = document.querySelectorAll('.stars');

starsContainers.forEach(starsContainer => {
    const stars = starsContainer.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', setRating);
    });
});

function setRating(e) {
    const clickedStar = e.target;
    const rating = clickedStar.dataset.value;

    const starsContainer = clickedStar.parentNode;
    const stars = starsContainer.querySelectorAll('.star');

    stars.forEach(star => {
        if (star.dataset.value <= rating) {
            star.classList.add('active');
            star.innerHTML = '&#9733;'; // Filled star
        } else {
            star.classList.remove('active');
            star.innerHTML = '&#9734;'; // Empty star
        }
    });

    starsContainer.dataset.rating = rating;
}

// JavaScript for handling form submission
const surveyForm = document.getElementById('surveyForm');

if (surveyForm) {
    surveyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if all questions are answered
        const starsContainers = document.querySelectorAll('.stars');
        let allQuestionsAnswered = true;

        starsContainers.forEach(starsContainer => {
            if (starsContainer.dataset.rating === '0') {
                allQuestionsAnswered = false;
                return;
            }
        });

        if (allQuestionsAnswered) {
            // All questions answered, proceed with form submission
            console.log('Submitting survey...');
            console.log('Survey Submitted...');
            // Redirect to success page or perform other actions after submitting survey
        } else {
            // Not all questions answered, display error message or take appropriate action
            alert('Please answer all questions before submitting.');
        }
    });
}

// Function to handle successful sign-in
function onSignIn(googleUser) {
    // Get user profile information
    const profile = googleUser.getBasicProfile();
    const userName = profile.getName();
    const userEmail = profile.getEmail();

    // Display user information
    document.getElementById('status').innerHTML = `Welcome, ${userName} (${userEmail})`;
}

document.addEventListener('DOMContentLoaded', function() {
    const feedbackLink = document.getElementById('feedbackLink');
    const surveyContainer = document.querySelector('.survey-container');
    const summaryContainer = document.querySelector('.summary-container');
    const surveyForm = document.getElementById('surveyForm');

    // Add event listener for feedback link click
    feedbackLink.addEventListener('click', function(event) {
        event.preventDefault();
        surveyContainer.classList.remove('hidden');
        summaryContainer.classList.add('hidden');
    });

    // Add event listener for form submission
    surveyForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect responses from the form
        const responses = [];
        const questions = document.querySelectorAll('.question');
        questions.forEach(question => {
            const rating = question.querySelector('.stars').getAttribute('data-rating');
            responses.push(parseInt(rating));
        });

        // Calculate the average rating
        const averageRating = responses.reduce((total, rating) => total + rating, 0) / responses.length;

        // Show the summary
        summaryContainer.innerHTML = `
            <h3>Survey Summary</h3>
            <p>Average Rating: ${averageRating.toFixed(2)}</p>
            <!-- You can add more summary details here -->
        `;
        surveyContainer.classList.add('hidden');
        summaryContainer.classList.remove('hidden');
    });
});

function toggleSurveyForm() {
    var surveyForm = document.querySelector('.survey-container');
    surveyForm.classList.toggle('hidden');
}

// Function to display summary when feedback link is clicked
document.getElementById('feedbackLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior of anchor tag
    var summaryContainer = document.querySelector('.summary-container');
    var surveyContainer = document.querySelector('.survey-container');
    if (!summaryContainer.classList.contains('hidden')) {
        summaryContainer.classList.add('hidden'); // Hide summary if already visible
    }
    surveyContainer.classList.add('hidden'); // Hide survey form
    summaryContainer.classList.remove('hidden'); // Show summary
});
function toggleSurveyForm() {
    var surveyForm = document.querySelector('.survey-container');
    var summaryContainer = document.querySelector('.summary-container');
    
    // Hide summary if it's visible
    if (!summaryContainer.classList.contains('hidden')) {
        summaryContainer.classList.add('hidden');
    }
    
    // Toggle the visibility of the survey form
    surveyForm.classList.toggle('hidden');
}

function displayBatch(batch) {
    // Hide survey container
    var surveyContainer = document.querySelector('.survey-container');
    surveyContainer.classList.add('hidden');

    // Show pie graphs container
    var pieGraphsContainer = document.querySelector('.pie-graphs');
    pieGraphsContainer.classList.remove('hidden');

    // Simulate data for pie graphs (replace with actual data)
    var data = {
        labels: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
        datasets: [{
            label: 'Batch ' + batch,
            data: [30, 20, 15, 25, 10], // Example data (replace with actual data)
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Create pie graphs
    for (var i = 0; i < data.labels.length; i++) {
        var canvas = document.createElement('canvas');
        canvas.id = 'pie-graph-' + i;
        pieGraphsContainer.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
                datasets: [{
                    data: [10, 20, 30, 15, 25], // Example data (replace with actual data)
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: data.labels[i],
                    fontSize: 12 // Reduce font size
                },
                legend: {
                    display: false // Hide legend
                }
            }
        });
    }
}

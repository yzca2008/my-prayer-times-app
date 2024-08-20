document.getElementById('prayerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const dateInput = document.getElementById('date').value;
    const [year, month] = dateInput.split('-');
    const location = document.getElementById('location').value;

    const [latitude, longitude] = location.split(',');

    const apiUrl = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'result-card';
            dayElement.innerHTML = `
                <strong>Date:</strong> <span>${day.date.gregorian.date}</span><br>
                <strong>Fajr:</strong> <span>${day.timings.Fajr}</span><br>
                <strong>Dhuhr:</strong> <span>${day.timings.Dhuhr}</span><br>
                <strong>Asr:</strong> <span>${day.timings.Asr}</span><br>
                <strong>Maghrib:</strong> <span>${day.timings.Maghrib}</span><br>
                <strong>Isha:</strong> <span>${day.timings.Isha}</span><br>
            `;
            resultsDiv.appendChild(dayElement);
        });
    } else {
        resultsDiv.innerHTML = 'No data available for the selected location and date.';
    }
}

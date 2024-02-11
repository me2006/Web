<div id="playerMetrics" style="display: grid; grid-template-columns: auto auto; gap: 20px; text-align: left;">
    <!-- Data will be inserted here -->
</div>

<script>
// Function to fetch JSON data from the URL
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to sort JSON object by keys
function sortObjectKeys(object) {
    return Object.keys(object).sort().reduce((sortedObj, key) => {
        sortedObj[key] = object[key];
        return sortedObj;
    }, {});
}

// Function to display data in Markdown format
async function displayData() {
    const url = 'https://game.sitekickremastered.com/metrics/generic?q=online_players,daily_online_players,daily_registrations,total_players,total_chips';
    const jsonData = await fetchData(url);
    const sortedData = sortObjectKeys(jsonData);

    // Replace placeholders with fetched data
    document.getElementById('playerMetrics').innerHTML = `
        <div><b>Players Online</b><br>${sortedData['online_players']}</div>
        <div><b>Total Members</b><br>${sortedData['total_players']}</div>
        <div><b>New Players</b><br>${sortedData['daily_registrations']}</div>
        <div><b>Played Today</b><br>${sortedData['daily_online_players']}</div>
        <div><b>Total Chips</b><br>${sortedData['total_chips']}</div>
    `;
}

// Call function to display data when the page loads
window.onload = displayData;
</script>

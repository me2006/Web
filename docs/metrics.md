<style>
/* Grid cards styling */
.grid.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.card {
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card b {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
}
</style>

<div id="playerMetrics" class="grid cards" markdown>
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
        <div class="card"><b>Players Online</b>${sortedData['online_players']}</div>
        <div class="card"><b>Total Members</b>${sortedData['total_players']}</div>
        <div class="card"><b>New Players</b>${sortedData['daily_registrations']}</div>
        <div class="card"><b>Played Today</b>${sortedData['daily_online_players']}</div>
        <div class="card"><b>Total Chips</b>${sortedData['total_chips']}</div>
    `;
}

// Call function to display data when the page loads
window.onload = displayData;
</script>

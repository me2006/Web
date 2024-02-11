<div class="grid cards" markdown>

-   :fontawesome-solid-user-clock:{ .lg .middle } __Players Online__

    ---

    There are <span id="playersOnline"></span> players online right now!

-   :fontawesome-solid-users:{ .lg .middle } __Total Members__

    ---

    <span id="totalMembers"></span> members have registered since November 29, 2020.

-   :fontawesome-solid-user-plus:{ .lg .middle } __New Players__

    ---

    Today <span id="newPlayers"></span> new players registered.

-   :fontawesome-solid-calendar-check:{ .lg .middle } __Played Today__

    ---

    <span id="playedToday"></span> players logged in today.

-   :fontawesome-solid-arrow-up-right-dots:{ .lg .middle } __Total Chips__

    ---

    There are currently <span id="totalChips"></span> chips in circulation.

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

// Function to display data
async function displayData() {
    const url = 'https://game.sitekickremastered.com/metrics/generic?q=online_players,daily_online_players,daily_registrations,total_players,total_chips';
    const jsonData = await fetchData(url);
    const sortedData = sortObjectKeys(jsonData);

    // Format numbers with commas and make them bold
    const formattedData = {
        'online_players': `<strong>${sortedData['online_players'].toLocaleString()}</strong>`,
        'total_players': `<strong>${sortedData['total_players'].toLocaleString()}</strong>`,
        'daily_registrations': `<strong>${sortedData['daily_registrations'].toLocaleString()}</strong>`,
        'daily_online_players': `<strong>${sortedData['daily_online_players'].toLocaleString()}</strong>`,
        'total_chips': `<strong>${sortedData['total_chips'].toLocaleString()}</strong>`
    };

    // Replace placeholders with fetched data
    document.getElementById('playersOnline').innerHTML = formattedData['online_players'];
    document.getElementById('totalMembers').innerHTML = formattedData['total_players'];
    document.getElementById('newPlayers').innerHTML = formattedData['daily_registrations'];
    document.getElementById('playedToday').innerHTML = formattedData['daily_online_players'];
    document.getElementById('totalChips').innerHTML = formattedData['total_chips'];
}

// Call function to display data when the page loads
window.onload = displayData;
</script>

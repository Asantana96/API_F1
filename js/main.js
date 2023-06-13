const form = document.querySelector('#testDataForm');
const tableBody = document.querySelector('#racerTable tbody');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const season = document.querySelector('#season').value;
    const round = document.querySelector('#round').value;
    await populateTable(season, round);
});

async function populateTable(season, round) {
    try {
        const response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        tableBody.innerHTML = '';

        data.forEach((driver) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${driver.position}</td>
                <td>${driver.Driver.givenName} ${driver.Driver.familyName}</td>
                <td>${driver.points}</td>
                <td>${driver.wins}</td>
                <td>${driver.Constructors[0].name}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.log(error);
    }
}

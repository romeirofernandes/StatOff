(function () {
  const players = [];
  let id = 1;

  // Select all rows from the main statistics table
  const rows = document.querySelectorAll(
    "table.items > tbody > tr:not(.thead)"
  );

  rows.forEach((row) => {
    // Get player name
    const playerCell = row.querySelector("td.hauptlink a[title]");
    const playerName = playerCell ? playerCell.textContent.trim() : "";

    // Get image URL
    const imageElement = row.querySelector("img.bilderrahmen-fixed");
    const imageUrl = imageElement ? imageElement.src : "";

    // Get appearances
    const appearancesLink = row.querySelector(
      'a[href*="/leistungsdaten/spieler"][href*="/saison/"]'
    );
    const appearances = appearancesLink
      ? parseInt(appearancesLink.textContent.trim())
      : 0;

    // Get goals
    const goalsElement = row.querySelector("td.zentriert.hauptlink a");
    const goals = goalsElement ? parseInt(goalsElement.textContent.trim()) : 0;

    // Get assists - specifically target the 6th td.zentriert
    const zentriertCells = row.querySelectorAll("td.zentriert");
    const assists = zentriertCells[5]
      ? parseInt(zentriertCells[5].textContent.trim()) || 0
      : 0;

    // Create player object
    if (playerName) {
      players.push({
        id: id++,
        name: playerName,
        appearances: appearances,
        goals: goals,
        assists: assists,
        imageUrl: imageUrl,
      });
    }
  });

  // Convert to JSON and copy to clipboard
  const json = JSON.stringify(players, null, 2);
  copy(json);
  console.log(json);
  console.log("Data has been copied to clipboard!");
})();

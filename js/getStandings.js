function getStandingsHTML(data, resolve) {
    let leaguesHTML = "";
    let standingsHTML ="";
    leaguesHTML += `
    <div class="col m3 l4"></div>
      <div class="col s12 m6 l4">
        <div class="card">
          <div class="white card-image waves-effect waves-block waves-light">
            <img class="responsive-img" alt="${data.competition.name}" src="img/league/${data.competition.code}.png" style="height:100%" />
          </div>
          <hr>
          <div class="card-content center-align">
            <span class="truncate"><b>${data.competition.name}</b></span>
            <p>${data.competition.area.name}</p>
            <p>${(data.season.startDate).substr(0,4)}/${(data.season.endDate).substr(0,4)}</p>            
          </div>
        </div>
      </div>
    <div class="col m3 l4"></div>
    `;

    data.standings[0].table.forEach(dataTeam => {
      let urlTeamImage = dataTeam.team.crestUrl;
      if (urlTeamImage == null || urlTeamImage == '') {
        urlTeamImage = 'img/league/no.png';
      } else {
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
      }
      standingsHTML += `
              <tr>
              <td>${dataTeam.position}<br />&nbsp;</td>
              <td>
                <a href="./team.html?id=${dataTeam.team.id}">
                <img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" style="height:30px">
                </a>
              </td>
              <td>
                <a href="./team.html?id=${dataTeam.team.id}">
                  ${dataTeam.team.name}
                </a><br />&nbsp;
              </td>
              <td>${dataTeam.playedGames}<br />&nbsp;</td>
              <td>${dataTeam.won}<br />&nbsp;</td>
              <td>${dataTeam.draw}<br />&nbsp;</td>
              <td>${dataTeam.lost}<br />&nbsp;</td>
              <td>${dataTeam.goalsFor}<br />&nbsp;</td>
              <td>${dataTeam.goalsAgainst}<br />&nbsp;</td>
              <td>${dataTeam.goalDifference}<br />&nbsp;</td>
              <td>${dataTeam.points}<br />&nbsp;</td>
              </tr>
            `;
    });
    
    document.getElementById("leagues").innerHTML = leaguesHTML;
    document.getElementById("standings").innerHTML = standingsHTML;
    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
    resolve(data);
}
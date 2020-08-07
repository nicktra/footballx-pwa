function getCompetitionsHTML(data) {
    let competitionsHTML = "";
    data.competitions.forEach(function(league) {
        if ([2019,2002,2003,2021,2014,2015].includes(league.id)) {
            competitionsHTML += `
                <div class="col s6 m4">
                <div class="card hoverable">
                  <a href="./standing.html?id=${league.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="img/league/${league.code}.png" alt="${league.area.name}" style="width:100% />
                    </div>
                  </a>
                  <div class="card-content">
                    <hr/>
                    <span class="truncate center-align"><b>${league.name}</b></span>
                    <p class="center-align">${league.area.name}</p>
                  </div>
                </div>
              </div>
                `;
        }
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("leagues").innerHTML = competitionsHTML;
}
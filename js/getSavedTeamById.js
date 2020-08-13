function getSavedTeamByIdHTML(data, resolve) {
    let squadHTML = "";
    let teamHTML = "";
    let coachHTML = "";

    let logoTeam = data.crestUrl;
    if (logoTeam == null || logoTeam == '') {
        logoTeam = 'img/league/no.png';
    } else {
        logoTeam = logoTeam.replace(/^http:\/\//i, 'https://');
    }

    teamHTML += `
        <div class="container">
            <div class="col s12">
            <div class="card-panel white">
                <div class="row">
                    <div class="col s12 m6 center">                    
                        <img alt="${data.name}" src="${logoTeam}" class="responsive-img">
                    </div>
                    <div class="col s12 m6">
                    <span class="black-text">                        
                        <hr>
                        <span class="truncate"><b>${data.name}</b></span>
                        <a href="${data.website}" target="_blank">  
                            <p class="truncate">${data.website}</p>
                        </a>
                        <hr>
                        <p><i class="tiny material-icons">account_balance</i> ${data.founded}</p>
                        <p><i class="tiny material-icons">flag</i> ${data.venue}</p>
                        <p><i class="tiny material-icons">person</i> ${data.clubColors}</p>
                        <p><i class="tiny material-icons">location_on</i> ${data.address}</p>
                        <p><i class="tiny material-icons">phone</i> ${data.phone}</p>
                        <p><i class="tiny material-icons">email</i> ${data.email}</p> 
                    </span>
                </div>
            </div>
            </div>
            </div>
        </div>
        <div class="col m3"></div>
    `;

    data.squad.forEach(dataSquad => {
        if(dataSquad.role == "PLAYER") {
            squadHTML += `
                <li class="collection-item">
                    <div class="left-align"><i class="material-icons">person</i>
                    ${dataSquad.name}</div>
                    <div class="right-align">${dataSquad.position}</div>
                </li>
            `;
        }
        else if (dataSquad.role == "COACH") {
            coachHTML += `
                <li class="collection-item">
                    <i class="material-icons">person</i>
                    ${dataSquad.name}
                </li>
            `;
        }
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("coach").innerHTML = coachHTML;
    document.getElementById("squad").innerHTML = squadHTML;
    document.getElementById("team").innerHTML = teamHTML;

    resolve(data);
}
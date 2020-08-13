const base_url = "https://api.football-data.org/v2/";
const api_token = '7868d4aa3c9d4fc88be12ac7ba17612f';

let fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token,
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getCompetitions() {
  if ('caches' in window) {
    caches.match(`${base_url}competitions?plan=TIER_ONE`).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          getCompetitionsHTML(data);
        })
      }
    })
  }

  fetchApi(`${base_url}competitions?plan=TIER_ONE`)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      getCompetitionsHTML(data);
    })
    .catch(error);
}

function getStandings() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ("caches" in window) {
      caches.match(`${base_url}competitions/${idParam}/standings?standingType=TOTAL`).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            getStandingsHTML(data, resolve);
          });
        }
      });
    }

    fetchApi(`${base_url}competitions/${idParam}/standings?standingType=TOTAL`)
      .then(status)
      .then(json)
      .then(function(data) {
        getStandingsHTML(data, resolve);
      });
  });
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ("caches" in window) {
      caches.match(`${base_url}teams/${idParam}`).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            getTeamHTML(data, resolve);
          });
        }
      });
    }

    fetchApi(`${base_url}teams/${idParam}`)
      .then(status)
      .then(json)
      .then(function(data) {
        getTeamHTML(data, resolve);
      });
  });
}

function getSavedTeam() {
  getAll().then(function(teams) {
    console.log(teams);
    getSavedTeamHTML(teams);
  });
}

function getSavedTeamById() {
  getById(id).then(function(data) {
    console.log(data);
    getSavedTeamByIdHTML(data, resolve);
  });
}
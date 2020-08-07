var dbPromised = idb.open("footballx", 1, function(upgradeDb) {
  var teamObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamObjectStore.createIndex("name", "name", { unique: false });
});

function saveFavTeam(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Success save Team.");
      M.toast({html: `Club ${team.name} Save Success, Check Favourite Team.`});
    }).catch(function() {
      M.toast({html: 'Fail Save Team'});
    });
}

function deleteFavTeam(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Success delete Team.");
      M.toast({html: `Success delete Team from Favourite`});
    }).catch(function() {
      M.toast({html: 'Fail delete Team'});
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function checkFav(id) {
  return new Promise(function (resolve, reject) {
      dbPromised
          .then(function (db) {
              let tx = db.transaction("teams", "readonly");
              let store = tx.objectStore("teams");
              return store.get(id);
          }).then(function (favorite) {
              if (favorite !== undefined) {
                  resolve(true);
              } else {
                  // reject(new Error("Favourite not Found"));
                  console.log("Favourite Team not Found");
              }
          });
  });
}
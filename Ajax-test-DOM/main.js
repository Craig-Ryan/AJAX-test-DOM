const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", baseURL + type + "/");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

function getTableHeaders(obj) {
  var tableHeaders = [];

  Object.keys(obj).forEach(function (key) {
    tableHeaders.push(`<td>${key}</td>`);
  });

  return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
  var tableRows = [];
  var el = document.getElementById("data"); /*grabs the data and stores in el*/
  el.innerHTML =
    ""; /*Allows each new button clicked to reset instead of piling returns together*/
  getData(type, function (data) {
    // console.dir(data); /*shows the object in the console*/ removed when making the data.results var
    data = data.results;
    var tableHeaders = getTableHeaders(data[0]);

    data.forEach(function (item) {
        var dataRow = [];

        Object.keys(item).forEach(function(key){
            var rowData = item[key].toString();
            var truncatedData = rowData.substring(0, 15);
            dataRow.push(`<td>${truncatedData}</td>`);
        });

        tableRows.push(`<tr>${dataRow}</tr>`);
      // Object.keys(item).forEach(function(key) {
      //     console.log(key);
      // })
      // /*document.getElementById("data") -removed to ad el variable*/el.innerHTML += "<p>" + item.name + "</p>";/*item shows 1 item rather than 10 on screen*/ /*+= allows items in object to be ordered 1-10. <p></p> sets each item on a new line.
      /*previously =>/*data.results;/*allows the result object to show up for the user*/
    });

    el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
  });
}

let qResult;

function sortBy(pName) {
    function compare(a, b) {
        /** This method sucks because it always sorts my columns alphabetically.
         * Certainly this is because the fields are all stored as strings. Why?
         */
        if ( a[pName] < b[pName] ){
          return -1;
        }
        if ( a[pName] > b[pName] ){
          return 1;
        }
        return 0;
      }
    qResult.sort(compare);
    console.log(`sorted on ${pName}`);
    //console.log(qResult);
}
function doReSort(field) {
    sortBy(field);
    document.querySelector("#gt2").innerHTML = tabform1(qResult);
}





function changeSquare(clr){

    return clr;
}


function tabform1(dbres) {
    qResult = dbres
    console.log("geoff");
    let tbl = '<table border="15">';

    let keyss = Object.keys(dbres[0]);
    let con = 0;

    tbl += "<tr>";
    // first, format the table header.
    // each item in the header is a key in the first JSON object
    // each of these is turned into a button that sorts the JSON data on that key
    for (let k of keyss) {
        tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
    }
    tbl += "</tr>";



        let holder =[];
        dbres.forEach(element => {
        //console.log(element);
        tbl += "<tr>";
        con+=1;

        keyss.forEach(k => {
            //console.log(k, element[k]);
            holder.push(element[k]);
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "</tr>";
    });
    tbl += "</table>";


const mat = [];
const rows = keyss.length;
const columns = con;
let spot2=0;

for (let i = 0; i < rows; i++) {
    spot2+=1;
    mat[i]=[];
    for (let j = 0; j < columns; j++) {
    mat[i][j] = holder[spot2];
   // console.log(mat[i][j]);
  }
}



    console.log(mat);
    return tbl;
}




function tabform2(dbres) {
    qResult = dbres
    let tbl = '<table border="15">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";
    // first, format the table header.
    // each item in the header is a key in the first JSON object
    // each of these is turned into a button that sorts the JSON data on that key
    for (let k of keyss) {
        tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
    }
    tbl += "</tr>";
    dbres.forEach(element => {
        //console.log(element);
        tbl += "<tr>";
        keyss.forEach(k => {
            //console.log(k, element[k]);
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}

function tabformPrim(dbres) {
    qResult = dbres
    let tbl = '<table border="15">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";
    // first, format the table header.
    // each item in the header is a key in the first JSON object
    // each of these is turned into a button that sorts the JSON data on that key
    for (let k of keyss) {
        tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
    }
    tbl += "</tr>";
    dbres.forEach(element => {
        //console.log(element);
        tbl += "<tr>";
        keyss.forEach(k => {
            //console.log(k, element[k]);
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}



async function doQueryTest(client, collection, spec, restrict, renderer) {
    let results = await client.db().collection(collection).find(spec, restrict).toArray();
    if (renderer != null) {
    renderer(results)
    }
   }


function doQuery() {
    let portt = document.getElementById("portt").value;
    let user = document.getElementById("user").value;
    let userid = document.getElementById("student").value;
    let usage = document.getElementById("usage").value;
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({'port':portt, 'uname':user, 'studid':userid, 'portuse':usage})
    }
    let uurl = "reserveport"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function (text) {
                console.log(text);
                data = JSON.parse(text);
                console.log(data);
                if (data['error']) {
                    document.querySelector("#gt2").innerHTML = '<span style="background-color:red; width:250px; font-size: 150%;">' + data["error"] +'</span>'
                } else {
                    //document.querySelector("#hdr").innerHTML = "<h1> Lab Status as of " + data["time"] +  "</h1>";
                    document.querySelector("#gt2").innerHTML = tabform1(data["rows"])
                }
            });
        });
}

function doCheck() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "sql1"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform1(data["rows"])
            });
        });
}
function doCheck3() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "sql2"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            console.log(response)

            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform1(data["rows"])
            });
        });
}



function doCheck2() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "mongo1"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log("LOOK HERE!!!!!!");
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform2(data);
            });
        });
}
function doCheck5() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "mongo2"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log("LOOK HERE!!!!!!");
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform2(data);
            });
        });
}
function doCheck6() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "mongo3"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log("LOOK HERE!!!!!!");
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform2(data);
            });
        });
}


function doCheck4() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "sql3"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform1(data["rows"])
            });
        });}

function doMongo1() {
    let params = {
            method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 'port': 1 })
    }
    let uurl = "mongo1"
    console.log("Querying server ....")
    console.log(params)
    fetch(uurl, params)
        .then(function(response) {
            response.text().then(function(text) {
                data = JSON.parse(text);
                console.log(data.length)
                console.log(data);
                document.querySelector("#gt2").innerHTML = tabform1(data)
            });
        });}

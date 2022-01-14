display();

function display() {
  fetch("http://localhost:3000/city").then(
      res => {
          res.json().then(
              data => {
                  if (data.length > 0) {
                      var temp = "";
                      data.forEach((d) => {
                          temp += "<tr>";
                          temp += "<td>" + d.id + "</td>";
                          temp += "<td>" + d.cityName + "</td>";
                          temp += "<td>" + d.country + "</td></tr>";
                      })

                      document.getElementById("tbody").innerHTML = temp;
                  }
              }
          )
      }
  )
}

function deleteRecord() {
    let id = document.getElementById("id").value;
    console.log(id);
    if (id.length != 0) {
        fetch("http://localhost:3000/city/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    else {
        let result = confirm("Are you sure about deleting all records?")
        if (result){
            fetch("http://localhost:3000/city/").then(
                res => {
                    res.json().then(
                        data => {
                            for (let i = 0; i < data.length; i++) {
                                fetch("http://localhost:3000/city/" + data[i].id, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(data)
                                })
                            }
                        }
                    )
                }
            )
        }
    }
}

function insertion() {
    let id = document.getElementById("id").value.trim();
    let cityName = document.getElementById("cityName").value.trim();
    let country = document.getElementById("country").value.trim();
    if (id.length != 0 && cityName.length != 0 && country.length != 0) {
        fetch("http://localhost:3000/city").then(
            res => {
                res.json().then(data => {
                    data.forEach((d) => {
                        if (d.id == id){
                            alert("Duplicated!");
                        }
                    })
                    var city = {
                        "id": id,
                        "cityName": cityName,
                        "country": country,
                    }
            
                    fetch("http://localhost:3000/city", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(city)
                    })
                })
            }
        )
    }
    else {
        alert("Fields cannot be empty!")
    }
}

function editRecord() {
    let newId = document.getElementById("id").value
    if (newId.length != 0) {
        fetch("http://localhost:3000/city/" + newId).then((res) => {
            res.json().then((data) => {
                var newcityName = document.getElementById("cityName").value;
                var newcountry = document.getElementById("country").value;
                if (newcityName != '' && newcountry != '') {
                    let city = {
                        id: newId,
                        cityName: newcityName,
                        country: newcountry,
                        
                    }
                    fetch("http://localhost:3000/city/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(city),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                else if (newcityName != '' && newcountry == '') {
                    let city = {
                        id: newId,
                        cityName: newcityName,
                        country: data.country,
                    }
                    fetch("http://localhost:3000/city/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(city),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                else if (newcityName == '' && newcountry != '') {
                    let city = {
                        id: newId,
                        cityName: data.cityName,
                        country: newcountry,
                    }
                    fetch("http://localhost:3000/city/" + newId, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify(city),
                    }).then((data) => {
                        console.log(data);
                    })
                }
                
            })
        })
    }
    else {
        alert("Please make it clear!")
    }

}

function searchRecord() {
    let id = document.getElementById("id").value
    let cityName = document.getElementById("cityName").value
    let country = document.getElementById("country").value
    if (id.length != 0 && cityName.length == 0 && country.length == 0) {
        fetch("http://localhost:3000/city/" + id).then((data) => {
            data.json().then((d) => {
                var temp = "";
                if (d.id != undefined) {
                    temp += "<tr>";
                    temp += "<td>" + d.id + "</td>";
                    temp += "<td>" + d.cityName + "</td>";
                    temp += "<td>" + d.country + "</td></tr>";
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
    else if (id.length == 0 && cityName.length != 0 && country.length == 0) {
        fetch("http://localhost:3000/city?cityName" + cityName).then((data) => {
            data.json().then((d) => {
                if (d[0] != undefined) {
                    var temp = ""
                    for (var i = 0; i < d.length; i++) {
                        temp += "<tr>"
                        temp += "<td>" + d[i]["id"] + "</td>";
                        temp += "<td>" + d[i]["cityName"] + "</td>";
                        temp += "<td>" + d[i]["country"] + "</td>";
                        temp += "</tr>"
                    }
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })

    }
    else if (id.length == 0 && cityName.length == 0 && country.length != 0) {
        fetch("http://localhost:3000/city?country" + country).then((data) => {
            data.json().then((d) => {
                if (d[0] != undefined) {
                    var temp = ""
                    for (var i = 0; i < d.length; i++) {
                        temp += "<tr>"
                        temp += "<td>" + d[i]["id"] + "</td>";
                        temp += "<td>" + d[i]["cityName"] + "</td>";
                        temp += "<td>" + d[i]["country"] + "</td>";
                        temp += "</tr>"
                    }
                    document.getElementById("tbody").innerHTML = temp;
                }
                else {
                    alert("The information you are searching for does not exist! ")
                }
            })
        })
    }
    else {
        alert("Please make it clear")
    }
}
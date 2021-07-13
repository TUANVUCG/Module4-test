// Show all
window.onload = showAllCity;

function showAllCity() {
    $('#edit').modal('hide');
    $('#create').modal('hide');
    $('#delete').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $.ajax({
        type: "get",
        url: `/cities/list`,
        success: function (data) {
            let content = `<table class="table" style="text-align: center; vertical-align: middle"">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Country</th>
      <th scope="col">Area</th>
      <th scope="col">Population</th>
      <th scope="col">GDP</th>
      <th scope="col">Description</th>
      <th style="width: 250px;">Action</th>
    </tr>
  </thead>`;
            for (let i = 0; i < data.length; i++) {
                content += showCityList(data[i]);
            }
            document.getElementById("cityList").innerHTML = content;
        }
    })
}

function showCityList(city) {
    return `<tr style="vertical-align: middle ; text-align: center" >
      <td>${city.name}</td>
      <td>${city.country.name}</td>
      <td>${city.area}</td>
      <td>${city.population}</td>
      <td>${city.gdp}</td>
      <td>${city.description}</td>
      <td>
      <button style="margin-right: 20px" onClick="edit(this.id)" id="${city.id}" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#edit">
                    Edit
                </button>
                <button style=" margin-left: 20px" onclick="deleteById(this.id)" type="button" class="btn btn-danger" data-bs-toggle="modal"
                        data-bs-target="#delete" id="${city.id}">
                    Delete
                </button>
      </td>
    </tr>`
}

// Create
function createNewCity() {
    let name = $('#name-create').val();
    let country = $('#country-create').val();
    let area = $('#area-create').val();
    let population = $('#population-create').val();
    let gdp = $('#gdp-create').val();
    let description = $('#description-create').val();
    let newCity = {
        name: name,
        country: {
            id: country
        },
        area: area,
        population: population,
        gdp: gdp,
        description: description,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: "/cities",
        success: showAllCity
    })
    event.preventDefault();
}

// Sua


function edit(id) {
    $.ajax({
        type: "get",
        url: "/cities/"+id,
        success: function (data){
                $('#name-edit').val(data.name)
                $('#country-edit').val(data.country.name)
                $('#area-edit').val(data.area)
                $('#population-edit').val(data.population)
                $('#gdp-edit').val(data.gdp)
                $('#description-edit').val(data.description)
                $('#updateButton').click(function (event) {
                    let name = $('#name-edit').val();
                    let country = $('#country-edit').val();
                    let area = $('#area-edit').val();
                    let population = $('#population-edit').val();
                    let gdp = $('#gdp-edit').val();
                    let description = $('#description-edit').val();
                    let updateCity = {
                        name: name,
                        country: {
                            id: country
                        },
                        area: area,
                        population: population,
                        gdp: gdp,
                        description: description,
                    }
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: 'PUT',
                        data: JSON.stringify(updateCity),
                        url: "/cities/" + id,
                        success: showAllCity
                    });
                    event.preventDefault();
                });
            }
    })
}

// Xoa
function deleteById(id) {
    $('#delete-submit').click(function (event) {
        $.ajax({
            type: 'delete',
            url: "/cities/" + id,
            success: showAllCity
        });
        event.preventDefault();
    });
}



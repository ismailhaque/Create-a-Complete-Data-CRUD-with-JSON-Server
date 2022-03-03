// get element
const skill = document.querySelector(`#skills`);
const add_devs = document.querySelector(`#add_devs`);

// get skill
function loadskills () {
    axios.get(`https://my-json-server.typicode.com/ismailhaque/ass-19/skills`).then(skills => {
        
        let skill_list = '';
        skills.data.map(data => {
            skill_list += `<option value="${data.id}">${data.skill}</option>`;
        });
        skill.insertAdjacentHTML(`beforeend`, skill_list)
    });
}

loadskills();

// set data 
add_devs.addEventListener(`submit`, function (e) {
    e.preventDefault();

    // form elements get

    let name = document.querySelector(`#name`);
    let age = document.querySelector(`#age`);
    let location = document.querySelector(`#location`);
    let salary = document.querySelector(`#salary`);
    let gender = document.querySelector(`#add_devs [type="radio"]:checked`);
    let photo = document.querySelector(`#photo`);
    let alert_m = document.querySelector(`#message`)

    if ( name.value == '' || age.value == '' || skill.value == '' || location.value == '' || salary.value == '' || gender.value == '' || photo.value == '') {
        
        alert_m.innerHTML =`<p class="alert alert-danger">All fields are requireds</p>`;

    }else {
        axios.post(`https://my-json-server.typicode.com/ismailhaque/ass-19/developer`, {

            id      : "",
            name    : name.value,
            age     : age.value,
            skill   : skill.value,
            location: location.value,
            income  : salary.value,
            gender  : gender.value,
            image   : photo.value
        }).then(res => {
            getDevelopers();
        })
        alert_m.innerHTML =`<p class="alert alert-success">Data Submit Successful</p>`;

        name.value = '';
        age.value = '';
        skill.value = '';
        location.value = '';
        salary.value = '';
        gender.value = '';
        photo.value = '';
    }
})

// load developer data

const getDevelopers = () => {

    const devs_load = document.querySelector(` #developer_load `);

    let dev_load = '';
    axios.get( `https://my-json-server.typicode.com/ismailhaque/ass-19/developer` ).then( devs => {

        devs.data.map( (data, index) => {

            dev_load +=`
                <tr>
                    <th>${ index + 1 }</th>
                    <th>${ data.name }</th>
                    <th>${ data.age }</th>
                    <th>${ data.skill }</th>
                    <th>${ data.location }</th>
                    <th>${ data.income }</th>
                    <th>${ data.gender }</th>
                    <th>
                        <img style="width: 50px; height: 50px; object-fit: cover;" src="${ data.image }" alt="image">
                    </th>
                    <th>
                        <a href="#" class="btn btn-primary btn-sm" onclick="dataview( ${ data.id })" data-bs-toggle="modal" data-bs-target="#viewdevs"><i class="fa fa-eye"></i></a>
                        <a href="#" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#editdevs"><i class="fa fa-edit"></i></a>
                        <a href="#" class="btn btn-danger btn-sm" onclick="datadelete( ${ data.id })" data-bs-toggle="modal" data-bs-target="#deletedevs"><i class="fa fa-trash"></i></a>
                    </th>
                </tr>
            `;

            devs_load.innerHTML = dev_load;
        });
    })
}
getDevelopers();

// devs view
const dataview = ( id ) => {
    const view_data = document.querySelector(`.view-data`);

    axios.get(`https://my-json-server.typicode.com/ismailhaque/ass-19/developer/${ id }`).then( res => {
        view_data.innerHTML =`<img style="width: 100%; height: 100%;"src="${res.data.image}" alt="image">
              <h3>Name      : ${res.data.name}</h3>
              <h3>Skill     : ${res.data.skill}</h3>
              <h3>Location  : ${res.data.location}</h3>
              <h3>Salary    : ${res.data.income}</h3>
              <h3>Gender    : ${res.data.gender}</h3>
              <h3>Age       : ${res.data.age}</h3>
              `;
    })
}

// // devs delete
// const datadelete = (id) => {

//         axios.delete(`https://my-json-server.typicode.com/ismailhaque/ass-19/developer/${ id }`).then( res => {
//             getDevelopers();
//         })
        
// }
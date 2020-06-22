
let inputSearch = null;
let buttonSearch = null;
let divUsers = null;
let divStatistics = null;
let users = [];
let reslt = [];

let usersMen = null;
let usersWomen = null;
let sumOfAge = null
let averageAges = null;
let totalUsers = null

window.addEventListener("load", async () => {
    mapElements();
    await fetchUsers();
    buttonSearch.addEventListener("click", searchUsers);
    inputSearch.addEventListener("keyup", searchEnter);
});


async function fetchUsers() {
    const res = await fetch(
        "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    );

    const json = await res.json();
    users = json.results.map(({ gender, name, picture, dob }) => {
        return {
            userName: `${name.first} ${name.last}`,
            gender: gender,
            image: picture.large,
            age: dob.age
        }
    })
}

function  searchEnter(event) {
    if (event.key === "Enter") {
        searchUsers();
    }
}


function mapElements() {
    inputSearch = document.querySelector("#input-search");
    buttonSearch = document.querySelector("#button-search");
    divUsers = document.querySelector("#div-users");
    divStatistics = document.querySelector("#div-statistics");
}


function searchUsers() {
    result = []
    divUsers.innerHTML = null;
    users.map(user => {
        if (user.userName.toLowerCase().includes(inputSearch.value.toLowerCase())) {
            result.push(user)
        }
    })
    render();
}


function statistic() {
    usersMen = 0;
    usersWomen = 0;
    sumOfAge = 0
    averageAges = 0;
    totalUsers = 0

    result.map(user => {
        if (user.gender === "male") {
            usersMen += 1;
            sumOfAge += user.age;
        } else {
            usersWomen += 1;
            sumOfAge += user.age;
        }
    })

    totalUsers = usersMen + usersWomen;
    
    if (totalUsers !== 0) {
        averageAges = sumOfAge / totalUsers
    }
    
}


function renderStatics() {
    statisticHTML =  `
        <div class="card text-white bg-info mb-3" style="max-width: 540px;">
        <div class="card-header">Estatísticas</div>
        <div class="card-body">
          <p class="card-text">Sexo masculino: ${usersMen}</p>
          <p class="card-text">Sexo feminino: ${usersWomen}</p>
          <p class="card-text">Soma das idades: ${sumOfAge}</p>
          <p class="card-text">Média das idades: ${Math.round(averageAges)}</p>
        </div>
      </div>
      </div>
    `
    divStatistics.innerHTML = statisticHTML
}


function renderUsers() {
    usersHTML = "<div'>";

    result.map(user => {
        const listUser = `
        <div class="card mb-1 card border-primary mb-1" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${user.image}" 
                        class="card-img rounded-circle image" 
                    >
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${user.userName}</h5>
                        <p class="card-text">Idade: ${user.age}</p>
                    </div>
                </div>
            </div>
        </div>
        
        `
        usersHTML += listUser
    })
    divUsers.innerHTML = usersHTML
}

function mesage() {

    if (totalUsers <= 0) {
        const mesage = `
           <div class="alert alert-info" role="alert">
           Nenhum usuário encontrado
         </div>
        `
        divUsers.innerHTML = mesage
    }
}

function render(){
    statistic()
    renderUsers();
    mesage();
    renderStatics();
}
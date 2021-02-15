var API_BASE_URL = 'https://pure-river-85340.herokuapp.com/'
var BASE_URL = 'https://webhookmanager.netlify.app/'

// var API_BASE_URL = 'http://localhost:8000/'
// var BASE_URL = 'http://localhost:5500/'

document.getElementById("createNew").addEventListener("click", function(event){
    event.preventDefault()
});

const getEndpointListText = (listElement) => (
    listElement.unique_url + ' (' + listElement.request_count + ') ' + listElement.time_to_live
);

async function postData() {
    const response = await fetch(API_BASE_URL + 'endpoints/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

const createNewEndpoint = () => {
    document.getElementById("createNew").disabled = true;
    postData().then(function() {
        loadList();
    }).catch(function() {
        window.location = BASE_URL + 'error.html';
    });
};

const loadList = () => {
    fetch(API_BASE_URL + 'endpoints/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (resp) => resp.json()
    ).then(function(data) {
        addListToHTML(data);
    }).catch(function() {
        window.location = BASE_URL + 'error.html';
    });
};

const addListToHTML = (list) => {

    var ul = document.getElementById("endpointList");
    ul.innerHTML = "";
    var i;
    for (i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        li.setAttribute('id', list[i].unique_url);
        var anchor = document.createElement("a");
        var redirect_url = BASE_URL + 'detail.html?endpoint=' + list[i].unique_url;
        anchor.setAttribute('href', redirect_url);
        anchor.appendChild(document.createTextNode(getEndpointListText(list[i])));
        li.appendChild(anchor);
        ul.appendChild(li);
    }
    document.getElementById("createNew").disabled = false;
}

loadList();

var API_BASE_URL = 'https://pure-river-85340.herokuapp.com/'
var BASE_URL = 'https://webhookmanager.netlify.app/'

// var API_BASE_URL = 'http://localhost:8000/'
// var BASE_URL = 'http://localhost:5500/'

document.getElementById("createNew").addEventListener("click", function(event){
    event.preventDefault()
});

const getEndpointListText = (listElement) => (
    listElement.unique_url + ' (' + listElement.time_to_live + ') '
);

const getCountSpanElement = (listElement) => {
    var spanChild = document.createElement('span');
    spanChild.setAttribute('class', 'badge badge-primary badge-pill');
    spanChild.appendChild(document.createTextNode(listElement.request_count));
    return spanChild;
};

const getAnchorEndpointElement = (listElement) => {
    var anchor = document.createElement("a");
    var redirect_url = BASE_URL + 'detail.html?endpoint=' + listElement.unique_url;
    anchor.setAttribute('href', redirect_url);
    anchor.appendChild(document.createTextNode(getEndpointListText(listElement)));
    return anchor;
};

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
        li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
        li.appendChild(getAnchorEndpointElement(list[i]));
        li.appendChild(getCountSpanElement(list[i]));
        ul.appendChild(li);
    }
    document.getElementById("createNew").disabled = false;
}

loadList();

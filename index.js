var API_BASE_URL = 'https://pure-river-85340.herokuapp.com/'
var BASE_URL = 'https://webhookmanager.netlify.app/'

// var API_BASE_URL = 'http://localhost:8000/'
// var BASE_URL = 'http://localhost:5500/'

const userAction = async () => {
    const response = await fetch(API_BASE_URL + 'endpoints/', {
        method: 'POST',
        // body: {}, // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    loadList();
};

const loadList = async () => {
    const response = await fetch(API_BASE_URL + 'endpoints/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json();
    console.log(myJson);
    addListToHTML(myJson);
};

const addListToHTML = (list) => {

    var ul = document.getElementById("endpointList");
    var i;
    for (i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        li.setAttribute('id', list[i].unique_url);
        var anchor = document.createElement("a");
        var redirect_url = BASE_URL + 'detail.html?endpoint=' + String(list[i].unique_url);
        anchor.setAttribute('href', redirect_url);
        anchor.appendChild(document.createTextNode(list[i].unique_url));
        li.appendChild(anchor);
        ul.appendChild(li);
    }
}

loadList();

// export default userAction;

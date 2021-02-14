const userAction = async () => {
    const response = await fetch('https://pure-river-85340.herokuapp.com/endpoints/', {
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
    const response = await fetch('https://pure-river-85340.herokuapp.com/endpoints/', {
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
        var redirect_url = 'https://webhookmanager.netlify.app/detail.html?endpoint=' + String(list[i].unique_url);
        anchor.setAttribute('href', redirect_url);
        anchor.appendChild(document.createTextNode(list[i].unique_url));
        li.appendChild(anchor);
        ul.appendChild(li);
    }
}

loadList();

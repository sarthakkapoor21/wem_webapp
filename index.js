const userAction = async () => {
    const response = await fetch('http://localhost:8000/endpoints/', {
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
    const response = await fetch('http://localhost:8000/endpoints/', {
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
        var redirect_url = 'http://127.0.0.1:5500/detail.html?endpoint=' + String(list[i].unique_url);
        anchor.setAttribute('href', redirect_url);
        anchor.appendChild(document.createTextNode(list[i].unique_url));
        li.appendChild(anchor);
        ul.appendChild(li);
    }
}

loadList();

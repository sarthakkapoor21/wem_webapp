var API_BASE_URL = 'https://pure-river-85340.herokuapp.com/'
var BASE_URL = 'https://webhookmanager.netlify.app/'

// var API_BASE_URL = 'http://localhost:8000/'
// var BASE_URL = 'http://localhost:5500/'

const getParameterByName = (name) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const loadList = () => {
    var endpointURL = String(getParameterByName('endpoint'));
    var endpointURLHeading = document.getElementById("endpointURL");
    endpointURLHeading.appendChild(document.createTextNode(endpointURL));

    fetch(API_BASE_URL + 'endpoints/' + endpointURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (resp) => resp.json()
    ).then(function(data) {
        addListToHTML(data.request_data);
    }).catch(function() {
        window.location = BASE_URL + 'error.html';
    });
};

const getHeadersOrQueryParamsList = (list) => {
    var unorderedList = document.createElement("ul");
    var j;
    for (j = 0; j < list.length; j++) {
        var listItem = document.createElement("li");
        listItem.setAttribute('id', j);
        listItem.appendChild(document.createTextNode(list[j].key + ': ' + list[j].value));
        unorderedList.appendChild(listItem);
    }
    if (list.length === 0) {
        return document.createTextNode('nil');
    }
    return unorderedList;
};

const addListToHTML = (list) => {
    var ul = document.getElementById("endpointDetailList");
    var i;
    for (i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        li.setAttribute('id', list[i].id);
        var queryParamsHeading = document.createElement("h5");
        queryParamsHeading.appendChild(document.createTextNode('Query Params'));
        li.appendChild(queryParamsHeading);
        li.appendChild(getHeadersOrQueryParamsList(list[i].query_params));
        var headersHeading = document.createElement("h5");
        headersHeading.appendChild(document.createTextNode('Headers'));
        li.appendChild(headersHeading);
        li.appendChild(getHeadersOrQueryParamsList(list[i].headers));
        var rawBodyHeading = document.createElement("h5");
        rawBodyHeading.appendChild(document.createTextNode('Raw Body'));
        li.appendChild(rawBodyHeading);
        rawBody = document.createElement("h5");
        rawBody.appendChild(document.createTextNode(JSON.stringify(list[i].raw_body)));
        li.append(rawBody);
        ul.appendChild(li);
    }
    if (list.length === 0) {
        ul.appendChild(document.createTextNode('NO HITS IN LAST 5 MINUTES'));
    }
};

loadList();

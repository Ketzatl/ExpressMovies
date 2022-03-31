var myHeaders = new Headers();

var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };

fetch('/movies',myInit)
    .then(function(response) {
        return response.json();
    })
    .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    });

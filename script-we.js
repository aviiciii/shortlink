
// wait for submit button to be clicked
document.getElementById("myinput").onclick = function () {
    // get the link from the input
    var link = document.getElementById("linkinput").value;

    let api_url="https://api.short.io/links/lnk_2MDV_9dCPkoujKaJ";
    
    
    // data to be sent to the API
    var data = {
        domain: "link.laavesh.ml",
        originalURL: link,
        allowDuplicates: false,
    };


    // send the data to the API
    fetch(api_url, {
        method: "post",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: "sk_oNHGE7VRdKp0DWJc",
        },
        body: JSON.stringify(data),
    })
    // get the response from the API
    .then(function (response) {
        return response.json();
    })
    // display the shortened link
    .then(function (data) {
        if (data.error) {
            throw data.error;
        }
        // get shortened link
        let url = String(data.shortURL);
        // remove https://
        url =url.replace("https://", "");
        // display shortened link
        console.log(url);
        document.getElementById("message").innerHTML =  url;
    })
    // display error if any
    .catch(function (error) {
        console.log(error);
        document.getElementById("message").innerHTML = error;
    });

    // clear the input fields
    document.getElementById("linkinput").value = "";
};


// Copy the link to the clipboard
document.getElementById("copy").onclick = function () {
    // Get the text field
    var message = document.getElementById("message");

    // get the link
    url = message.innerHTML;
    

    // Copy link to clipboard
    navigator.clipboard.writeText(url);

    // Alert copied to clipboard
    message.innerHTML = "Copied!";
    console.log("Copied!");

    // Change back to link after 800ms
    setTimeout(function () {
        message.innerHTML = url;
    }, 800); 

    

}   
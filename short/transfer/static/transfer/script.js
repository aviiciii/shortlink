

document.addEventListener("DOMContentLoaded", function () {

    // get the submit button
    document.getElementById("myinput").onclick = function () {
        // get the link from the input
        var link = document.getElementById("linkinput").value;
        var csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        var message = document.getElementById("message");


        console.log(csrf)
        // data to be sent to the transfer view
        console.log(link)

        fetch("/transfer", {
            method: "post",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": csrf,
            },
            body: JSON.stringify({
                link: link,
            }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.error) {
                throw data.error;
            }
            // show link updated
            // Get the text field
            
            let url = "we.laavesh.ml";
            message.innerHTML = "Updated!";
            console.log("Updated!");

            // Change back to link after 800ms
            setTimeout(function () {
                message.innerHTML = url;
            }, 800); 
        })


        document.getElementById("linkinput").value = "";
    }

});



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
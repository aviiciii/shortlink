
// wait for submit button to be clicked
document.getElementById("myinput").onclick = function () {
    // get the link from the input
    var link = document.getElementById("linkinput").value;

    // data to be sent to the API
    var data = {
        domain: "link.laavesh.ml",
        originalURL: link,
        allowDuplicates: false,
    };

    // add custom path if it is given
    if (document.getElementById("pathinput").value != "") {
        data.path = document.getElementById("pathinput").value;
    }

    // send the data to the API
    fetch("https://api.short.cm/links/public", {
        method: "post",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: "pk_ynFkEXQHXdWrijOF",
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
    document.getElementById("pathinput").value = "";
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


// change github icon on hover


function hover(element) {
    // get child element
    var child = element.children[0];
    child.setAttribute('src', 'assets/github2.png');
  }
  
  function unhover(element) {
    // get child element
    var child = element.children[0];
    child.setAttribute('src', 'assets/github.png');
  }


// on enter key press click #myinput
document.addEventListener("keyup", function(event) {
    // Check if enter key is pressed
    if (event.key === "Enter") {
        
        event.preventDefault();
        // Click the button
        document.getElementById("myinput").click();

        // remove focus from input fields
        document.getElementById("linkinput").blur();
        document.getElementById("pathinput").blur();
    }
    

});


// dark mode toggle

// get the toggle
const toggle = document.getElementById('dark-mode-toggle');


function toggleDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
}

// when the toggle is clicked
toggle.addEventListener('click', function() {
    // if the toggle is checked
    if (toggle.checked) {
        console.log('checked');
        toggleDarkMode(true);

        // change logo
        document.getElementById("logo").setAttribute('src', 'assets/logo-dark.png');

        // change github icon
        document.getElementById("github-logo").setAttribute('src', 'assets/github-dark.png');

    } else {
        console.log('unchecked');
        toggleDarkMode(false);

        // change logo
        document.getElementById("logo").setAttribute('src', 'assets/logo.png');

        // change github icon
        document.getElementById("github-logo").setAttribute('src', 'assets/github.png');
    }
    
});

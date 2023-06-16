
// wait for submit button to be clicked
document.getElementById("myinput").onclick = function () {
    // get the link from the input
    var link = document.getElementById("linkinput").value;

    // check if the link is empty
    if (link == "" || link == null) {
        // display error message
        url = document.getElementById("message").innerHTML;

        document.getElementById("message").innerHTML = "Url 404 :(";

        setTimeout(function () {
            message.innerHTML = url;
        }, 2000); 
        return;
    }



    // data to be sent to the API
    var data = {
        // domain -- change here if you want to use your own domain
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
            // API key -- change here if you want to use your own API key (public key)
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
    message.innerHTML = "Ctrl + C done :)";
    console.log("Copied!");

    // Change back to link after 800ms
    setTimeout(function () {
        message.innerHTML = url;
    }, 1200); 
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


// dark mode toggle
const toggle = document.getElementById('dark-mode-toggle');

function toggleDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
}

// check preference
const preference = localStorage.getItem('dark-mode');

// if preference is true
if (preference == 'true') {
    // check the toggle
    toggle.checked = true;
    // enable dark mode
    dark();
} else {
    // disable dark mode
    light();
}

// when the toggle is clicked
toggle.addEventListener('click', function() {
    // if the toggle is checked
    if (toggle.checked) {
        console.log('checked');
        dark();
    } else {
        console.log('unchecked');
        light();
    }
    
});


function dark() {

    toggleDarkMode(true);

    // change logo
    document.getElementById("logo").setAttribute('src', 'assets/logo-dark.png');

    // change github icon
    document.getElementById("github-logo").setAttribute('src', 'assets/github-dark.png');

    // change copy-to-clipboard icon
    document.getElementById("copy-to-clipboard").setAttribute('src', 'assets/copy-dark.png');
    
    // save preference
    localStorage.setItem('dark-mode', 'true');
};

function light(){
    toggleDarkMode(false);

    // change logo
    document.getElementById("logo").setAttribute('src', 'assets/logo.png');

    // change github icon
    document.getElementById("github-logo").setAttribute('src', 'assets/github.png');

    // change copy-to-clipboard icon
    document.getElementById("copy-to-clipboard").setAttribute('src', 'assets/copy.png');

    // save preference
    localStorage.setItem('dark-mode', 'false');

}


// preloader
window.addEventListener('load', function() {
    
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    document.querySelector('.preloader').style.display = 'none';

    // change transition effect for dark mode toggle
    document.body.style.transition = 'background-color 0.4s ease-out';
});


// qr code
const qr = document.getElementById('qr-btn');

qr.addEventListener('click', function() {
    // get the link
    url = document.getElementById("message").innerHTML;

    





});



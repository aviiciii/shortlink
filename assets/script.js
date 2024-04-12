DOMAIN = "link.laavesh.xyz";
SHORTIO_API_KEY = "pk_M8NSz2WK3m9gHdH2";

// ---------------- SHORTEN LINK ----------------
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
		domain: DOMAIN,
		originalURL: link,
		allowDuplicates: false,
	};

	// add custom path if it is given
	if (document.getElementById("pathinput").value != "") {
		data.path = document.getElementById("pathinput").value;
	}

	// send the data to the API
	fetch("https://api.short.io/links/public", {
		method: "post",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			authorization: SHORTIO_API_KEY,
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

			// add url to qr code img src
			qrimg = document.getElementById("qr-img");
			qrimg.setAttribute("src", "https://api.qrserver.com/v1/create-qr-code/?size=250x250&qzone=2&bgcolor=f1ede2&data=" + url);

			// remove https://
			url = url.replace("https://", "");
			// display shortened link
			console.log(url);
			document.getElementById("message").innerHTML = url;
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
	url = message.innerHTML;

	// Copy link to clipboard
	navigator.clipboard.writeText(url);

	// Alert copied to clipboard
	message.innerHTML = "Go paste !";
	console.log("Copied!");

	// Change back to link after 800ms
	setTimeout(function () {
		message.innerHTML = url;
	}, 1200);
};

// on enter key press click #myinput
document.addEventListener("keyup", function (event) {
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

// ---------------- PRELOADER ----------------
window.addEventListener("load", function () {
	document.body.style.opacity = "1";
	document.body.style.visibility = "visible";
	document.querySelector(".preloader").style.display = "none";
	// change transition effect for dark mode toggle
	document.body.style.transition = "background-color 0.4s ease-out";
});

// ---------------- GITHUB ICON ----------------

// change github icon on hover
function hover(element) {
	// get child element
	var child = element.children[0];
	child.setAttribute("src", "assets/github2.png");
}

function unhover(element) {
	// get child element
	var child = element.children[0];
	child.setAttribute("src", "assets/github.png");
}

// ---------------- DARK MODE ----------------

// dark mode toggle
const toggle = document.getElementById("dark-mode-toggle");

// check website preference from local storage or system preference
var preference = localStorage.getItem("dark-mode");
if (preference === null) {
	preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// if preference is true
if (preference === true || preference === "true") {
	toggle.checked = true;
	dark();
} else {
	light();
}

// when the toggle is clicked
toggle.addEventListener("click", function () {
	// if the toggle is checked
	if (toggle.checked) {
		console.log("checked");
		dark();
		save_preference();
	} else {
		console.log("unchecked");
		light();
		save_preference();
	}
});

function toggleDarkMode(state) {
	document.documentElement.classList.toggle("dark-mode", state);
}

function dark() {
	toggleDarkMode(true);

	// change assets
	document.getElementById("logo").setAttribute("src", "assets/logo-dark.png");
	document.getElementById("github-logo").setAttribute("src", "assets/github-dark.png");
	document.getElementById("copy-to-clipboard").setAttribute("src", "assets/copy-dark.png");
	document.getElementById("qr").setAttribute("src", "assets/qr-dark.png");
}

function light() {
	toggleDarkMode(false);

	// change assets
	document.getElementById("logo").setAttribute("src", "assets/logo.png");
	document.getElementById("github-logo").setAttribute("src", "assets/github.png");
	document.getElementById("copy-to-clipboard").setAttribute("src", "assets/copy.png");
	document.getElementById("qr").setAttribute("src", "assets/qr.png");
}

// call to save preference
save_preference = () => {
	localStorage.setItem("dark-mode", toggle.checked);
};

// ---------------- QR CODE MODAL ----------------

// Get the modal, button and span
var modal = document.getElementById("myModal");
var btn = document.getElementById("qr-btn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

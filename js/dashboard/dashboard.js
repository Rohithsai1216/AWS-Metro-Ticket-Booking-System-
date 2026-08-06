const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

if (!user) {

    alert("Please Login First");

    window.location.href = "login.html";

}

document.getElementById("welcomeUser").innerHTML = user.name;

document.getElementById("customerId").innerHTML = user.customerId;

function logout() {

    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("customerName");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}
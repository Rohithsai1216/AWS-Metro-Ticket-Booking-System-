const ticket = JSON.parse(sessionStorage.getItem("currentTicket"));

if (!ticket) {

    alert("Ticket Not Found");

    window.location.href = "mytickets.html";

}

// Display Ticket Details

document.getElementById("ticketId").innerHTML = ticket.ticketId;

document.getElementById("name").innerHTML = ticket.name;

document.getElementById("mobile").innerHTML = ticket.mobile;

document.getElementById("source").innerHTML = ticket.source;

document.getElementById("destination").innerHTML = ticket.destination;

document.getElementById("travelDate").innerHTML = ticket.travelDate;

document.getElementById("fare").innerHTML = "₹ " + ticket.fare;

document.getElementById("status").innerHTML = ticket.status;

// Booking Time (optional)

if (ticket.bookingTime) {

    document.getElementById("bookingTime").innerHTML = ticket.bookingTime;

} else {

    document.getElementById("bookingTime").innerHTML =
        new Date().toLocaleString();

}

// Logout

function logout() {

    sessionStorage.clear();

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}
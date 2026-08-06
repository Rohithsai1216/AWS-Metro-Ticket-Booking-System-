const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

if (!user) {

    alert("Please Login First");

    window.location.href = "login.html";

}

document.getElementById("welcomeUser").innerHTML =
    "Welcome, " + user.name;


async function bookTicket() {

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const travelDate = document.getElementById("travelDate").value;

    if (source === "") {

        alert("Select Source Station");
        return;

    }

    if (destination === "") {

        alert("Select Destination Station");
        return;

    }

    if (source === destination) {

        alert("Source and Destination cannot be same.");
        return;

    }

    if (travelDate === "") {

        alert("Select Travel Date");
        return;

    }

    const bookingData = {

        customerId: user.customerId,
        source,
        destination,
        travelDate

    };

    try {

        const response = await fetch(`${API_BASE_URL}/bookTicket`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(bookingData)

        });

        const result = await response.json();

        if (response.ok) {

            const ticket = {

                ticketId: result.ticketId,
                customerId: user.customerId,
                name: user.name,
                mobile: user.mobile,
                source,
                destination,
                travelDate,
                fare: result.fare,
                status: result.status

            };

            sessionStorage.setItem(
                "currentTicket",
                JSON.stringify(ticket)
            );

            alert("Ticket Booked Successfully");

            window.location.href = "ticket.html";

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

}


function logout() {

    sessionStorage.clear();

    window.location.href = "login.html";

}
const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

if (!user) {

    alert("Please Login");

    window.location.href = "login.html";

}

const ticketList = document.getElementById("ticketList");

loadMyTickets();

async function loadMyTickets() {

    try {

        const response = await fetch(`${API_BASE_URL}/myTickets`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customerId: user.customerId
            })

        });

        const result = await response.json();
        console.log(response.status);
        console.log(result);
        if (!response.ok) {

            alert(result.message);
            return;

        }

        const tickets = result.tickets;

        if (!tickets || tickets.length === 0) {

            ticketList.innerHTML = "<h3>No Tickets Booked Yet.</h3>";
            return;

        }

        ticketList.innerHTML = "";

        tickets.forEach(ticket => {

            ticketList.innerHTML += `

            <div class="card" style="margin-bottom:20px; text-align:left;">

                <h3>${ticket.ticketId}</h3>

                <p><strong>Route :</strong>
                ${ticket.source} ➜ ${ticket.destination}</p>

                <p><strong>Travel Date :</strong>
                ${ticket.travelDate}</p>

                <p><strong>Fare :</strong>
                ₹${ticket.fare}</p>

                <p><strong>Status :</strong>
                ${ticket.status}</p>

                <button onclick="viewTicket('${ticket.ticketId}')">
                    View Ticket
                </button>

                <button onclick="cancelTicket('${ticket.ticketId}')">
                    Cancel Ticket
                </button>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load tickets.");

    }

}

async function viewTicket(ticketId) {

    try {

        const response = await fetch(`${API_BASE_URL}/ticket`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ticketId
            })

        });

        const result = await response.json();

        if (response.ok) {

            sessionStorage.setItem(
                "currentTicket",
                JSON.stringify(result.ticket)
            );

            window.location.href = "ticket.html";

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to fetch ticket.");

    }

}

async function cancelTicket(ticketId) {

    if (!confirm("Are you sure you want to cancel this ticket?")) {

        return;

    }

    try {

        const response = await fetch(`${API_BASE_URL}/cancelTicket`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ticketId
            })

        });

        const result = await response.json();

        if (response.ok) {

            alert(result.message);

            loadMyTickets();

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to cancel ticket.");

    }

}

function logout() {

    sessionStorage.clear();

    window.location.href = "login.html";

}
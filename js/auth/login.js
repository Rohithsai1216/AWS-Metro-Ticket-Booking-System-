async function loginCustomer() {

    const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

if (email === "") {
    alert("Enter Email");
    return;
}

if (password === "") {
    alert("Enter Password");
    return;
}

    try {

        const response = await fetch(`${API_BASE_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const result = await response.json();

        if (response.ok) {

            // Store logged-in customer details
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify(result.customer)
            );

            sessionStorage.setItem(
                "customerId",
                result.customer.customerId
            );

            sessionStorage.setItem(
                "customerName",
                result.customer.name
            );

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(result.message);

        }

    }
    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

}
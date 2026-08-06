function toggleRegisterPassword() {

    const password =
    document.getElementById("password");

    const confirm =
    document.getElementById("confirmPassword");

    const type =
    password.type === "password"
        ? "text"
        : "password";

    password.type = type;
    confirm.type = type;

}
async function registerCustomer() {

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (name === "") {
        alert("Enter Full Name");
        return;
    }

    if (mobile.length !== 10) {
        alert("Enter Valid Mobile Number");
        return;
    }

    if (email === "") {
        alert("Enter Email");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain minimum 6 characters");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const customerData = {
        name,
        mobile,
        email,
        password
    };

    try {

        const response = await fetch(`${API_BASE_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(customerData)

        });

        const result = await response.json();

        if (response.ok) {

            alert(
                "Registration Successful!\n\nYour Customer ID is : " +
                result.customerId
            );

            window.location.href = "login.html";

        } else {

            alert(result.message);

        }

    }
    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        /* Add a checkmark or X icon to the list items */
        #passwordRequirements .checked::before {
            content: '\2713'; /* Checkmark symbol */
            color: green;
            margin-right: 5px;
        }

        #passwordRequirements .unchecked::before {
            content: '\2717'; /* X symbol */
            color: red;
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <h2>Password Reset</h2>
    <p>Enter a new password below:</p>

    <input id="txtNewPassword" type="password" placeholder="New Password" onkeyup="validatePassword()" />
    <input id="txtConfirmPassword" type="password" placeholder="Confirm Password" onkeyup="validatePassword()" />

    <div id="passwordRequirements">
        <p>Your new password must meet the following requirements:</p>
        <ul>
            <li id="letter">Contain at least one letter (a-z or A-Z)</li>
            <li id="number">Contain at least one number (0-9)</li>
            <li id="length">Be at least 8 characters long</li>
            <li id="match">Both passwords match</li>
        </ul>
    </div>

    <button id="submitBtn" onclick="submitPassword()" style="margin-top: 10px;">Submit</button>

    <div id="passwordResetMessage" style="margin-top: 10px;"></div>

    <script>
        function submitPassword() {
            var newPassword = document.getElementById("txtNewPassword").value;
            var confirmPassword = document.getElementById("txtConfirmPassword").value;

            if (newPassword !== confirmPassword) {
                document.getElementById("passwordResetMessage").innerText = "Passwords do not match!";
                return;
            }

            if (!validatePassword()) {
                document.getElementById("passwordResetMessage").innerText = "Password does not meet the requirements!";
                return;
            }

            var token = new URLSearchParams(window.location.search).get("token");
            var formData = "password=" + encodeURIComponent(newPassword) + "&vpassword=" + encodeURIComponent(confirmPassword) + "&token=" + encodeURIComponent(token);

            fetch("https://game.sitekickremastered.com/reset_password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to reset password: " + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById("passwordResetMessage").innerText = data;
                // Redirect to the success page
                window.location.href = "https://sitekickremastered.com/account/reset_password_success/";
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("passwordResetMessage").innerText = "An error occurred while resetting the password. Please try again later.";
            });
        }

        function validatePassword() {
            var password = document.getElementById("txtNewPassword").value;
            var hasLetter = /[a-zA-Z]/.test(password);
            var hasNumber = /\d/.test(password);
            var hasValidLength = password.length >= 8;
            var passwordsMatch = password === document.getElementById("txtConfirmPassword").value;
            var bothPasswordsNotEmpty = password.trim() !== "" && document.getElementById("txtConfirmPassword").value.trim() !== "";

            // Update list items based on password requirements
            updateRequirement("letter", hasLetter);
            updateRequirement("number", hasNumber);
            updateRequirement("length", hasValidLength);
            updateRequirement("match", passwordsMatch && bothPasswordsNotEmpty);

            return hasLetter && hasNumber && hasValidLength && passwordsMatch && bothPasswordsNotEmpty;
        }

        function updateRequirement(id, condition) {
            var element = document.getElementById(id);
            element.classList.toggle("checked", condition);
            element.classList.toggle("unchecked", !condition);
        }
    </script>
</body>
</html>

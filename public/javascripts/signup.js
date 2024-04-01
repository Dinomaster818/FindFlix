import dbController from '.../db_controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const forename = document.getElementById('exampleInputFirstName').value;
        const surename = document.getElementById('exampleInputLastName').value;
        const email = document.getElementById('exampleInputEmail1').value;
        const password = document.getElementById('exampleInputPassword1').value;

        // Call the createAccount method with form data
        dbController.createAccount(email, password, `${forename} ${surename}`, (err, userId) => {
            if (err) {
                console.error('Error creating account:', err.message);
                // Handle error
            } else {
                console.log('Account created successfully. User ID:', userId);
                // Redirect user or perform further actions
            }
        });
    });
});

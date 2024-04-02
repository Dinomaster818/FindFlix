document.addEventListener('DOMContentLoaded', function () {
    const deleteAccountLink = document.getElementById('delete-account');

    if (deleteAccountLink) {
        deleteAccountLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default behavior of the link

            // Ask for confirmation before deleting the account
            Swal.fire({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover your account!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // If the user confirms, proceed with account deletion
                    deleteAccount();
                }
            });
        });
    } else {
        console.error('Delete account link not found');
    }
});

function deleteAccount() {
    // Send a request to delete the account
    fetch('/delete-account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: localStorage.getItem('userEmail') // Send the user's email for identification
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
            // Account deleted successfully
            return response.json();
        })
        .then(data => {
            // Show success message and logout
            Swal.fire({
                title: 'Account Deleted',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect to the login page after account deletion
                window.location.href = 'login.html';
            });
        })
        .catch(error => {
            // Show error message
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const deleteAccountLink = document.getElementById('delete-account');

    if (deleteAccountLink) {
        deleteAccountLink.addEventListener('click', function (event) {
            event.preventDefault(); 

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
    // Send a request
    fetch('/delete-account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: localStorage.getItem('userEmail') 
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: 'Account Deleted',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'login.html';
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

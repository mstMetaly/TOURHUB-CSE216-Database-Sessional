var bookingId = bookingId;
console.log("script e :",bookingId);

async function fetchConfirmation() {
    const response = await fetch(`/confirmationInfo/${bookingId}`);
    const confirmInfo = await response.json();

    console.log("confirmInfo ",confirmInfo);

    const confirmContent = document.getElementById("confirmation-content");
    const confirmDiv = document.createElement('div');

    confirmDiv.classList.add('confirmation-message'); // Fixed variable name here

    confirmDiv.innerHTML = `
        <h2>Booking Confirmation</h2>
        <p>Booking ID: ${confirmInfo.BOOKING_ID}</p>
        <p>Name: ${confirmInfo.FULL_NAME}</p>
        <p>PAYMENT ID: ${confirmInfo.TRANSACTION_NO}</p>
        <!-- Add more data as needed -->
        <div class="download-button">
            <a href="/download/${confirmInfo.BOOKING_ID}" class="btn">Download Booking Info</a>
        </div>
    `;

    confirmContent.appendChild(confirmDiv); // Fixed variable name here
}

fetchConfirmation();

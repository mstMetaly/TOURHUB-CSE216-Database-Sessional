async function fetchCancelRequest() {
    const response = await fetch('/fetchCancelRequest');
    const result = await response.json();
  
    const cancelList = document.getElementById('cancel-request');
  
    result.forEach(user => {
      const cancelDiv = document.createElement('div');
      cancelDiv.classList.add('box');
  
      cancelDiv.innerHTML = `
        <p>Booking ID: ${user.BOOKING_ID}</p>
        <p>Name : ${user.NAME}</p>
        <p>Tour ID: ${user.TID}</p>
        <a href="/confirmCancelRequest/${user.BOOKING_ID}" class="btn">Confirm</a>
      `;
  
      cancelList.appendChild(cancelDiv);
    });
  }
  
  fetchCancelRequest();
  
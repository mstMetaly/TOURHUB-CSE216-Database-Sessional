async function fetchSeeAllUserInfo()
{
    const response = await fetch('/fetchSeeAllUser');
    const users = await response.json();

    const userListDiv = document.getElementById('user-list');

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
          <h3>${user.FULL_NAME}</h3>
          <p>BOOKING_ID: ${user.BOOKING_ID}</p>
          <p>TOUR_ID: ${user.TOUR_ID}</p>
          <p>PAYMENT_ID: ${user.PAYMENT_ID}</p>
          <p>Phone: ${user.phone}</p>
          <p>HOTEL_ID: ${user.HOTEL_ID}</p>
          <p>TOTAL_MEMBER: ${user.TOTAL_COUNT}</p>
          <p>MALE: ${user.MALE_COUNT}</p>
          <p>FEMALE: ${user.FEMALE_COUNT}</p>
          <p>CHILD: ${user.CHILD_COUNT}</p>
        `;
        userListDiv.appendChild(userCard);
    });


}

fetchSeeAllUserInfo();
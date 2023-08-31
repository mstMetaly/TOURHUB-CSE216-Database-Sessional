async function fetchHotelRooms(hotel_id)
{

    const response = await fetch(`/fetchHotelRoom/${hotel_id}`);
    const rooms = await response.json();

    rooms.forEach(room => {
        const roomList = document.getElementById("room-list");
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('box');

        roomDiv.innerHTML = 
    `<img src="${room.ROOM_IMAGE}" alt="" />
    <div class="content">
      <h3><i class="fas fa-map-markar-alt"></i>"${room.ROOM_NO}"</h3>
      <p>"${room.ROOM_DETAILS}" </p>
    </div>
  `;

    roomList.appendChild(roomDiv);
    });


}

fetchHotelRooms(hotel_id);

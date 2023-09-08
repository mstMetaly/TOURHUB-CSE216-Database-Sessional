  async function fetchMyProfile()
  {
     const response = await fetch('/fetchAdminProfile');
     const result = await response.json();
 
     const imageDiv = document.getElementById("profile-picture");
     imageDiv.innerHTML = `<img src="${result.PROFILE_PIC}" alt="" />`;
     const profileInfoDiv = document.getElementById("profile-info");
 
     profileInfoDiv.innerHTML=
     `<p>user_name : ${result.NAME} </p>
     <p>gmail: ${result.GMAIL}</p>
     <p>Gender : ${result.GENDER}</p>
     <p>NID : ${result.NID}</p>
     <p>Nationality: ${result.NATIONALITY}</p>
     <p>Address: ${result.ADDRESS}</p>
     `;
     
  };
 
  fetchMyProfile();
   
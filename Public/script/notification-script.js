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


  async function fetchFAQRequest()
  {
    const response = await fetch('/fetchFAQRequest');
    const result = await response.json();

    console.log("fetch e faq :",result);

    const faqList = document.getElementById('faq-request');

    result.forEach(user => {
      const faqDiv = document.createElement('div');
      faqDiv.classList.add('box');
  
      faqDiv.innerHTML = `
       <h2>FAQ ID : ${user.FAQ_ID}</h2>
       <h2>Name : ${user.NAME} </h2>
       <h2>EMAIL : ${user.EMAIL}</h2>
       <h2>PHONE :  ${user.PHONE}</h2>
       <h2>QUESTION :  ${user.QUESTION}</h2>
       <h2>TIME :  ${user.TIME}</h2>
      `;
  
      faqList.appendChild(faqDiv);
    });

  }

  fetchFAQRequest();
  

  async function fetchLogRequest()
  {
    const response = await fetch('/fetchLogRequest');
    const result = await response.json();

    const logList = document.getElementById('log-request');

    result.forEach(user => {
      const logDiv = document.createElement('div');
      logDiv.classList.add('box');
  
      logDiv.innerHTML = `
       <h2>Name : ${user.USER_NAME} </h2>
       <h2>QUESTION :  ${user.ACTIVITY}</h2>
       <h2>TIME :  ${user.TIME}</h2>
      `;
  
      logList.appendChild(logDiv);
    });


  }

  fetchLogRequest();
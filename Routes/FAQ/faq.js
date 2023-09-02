const express = require('express');

const faq_query = require('../../Database/faq_query');

const router = express.Router();

router.get('/faq', async (req, res) => {

    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const userId = req.user.user_id;
        res.render('FAQ/faq.ejs');
    }
});

router.post('/askQuestion', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const formData = req.body;
        const faq_Id = Date.now() + '-' + Math.floor(Math.random() * 1000);
        const currentDate = new Date(); // Get the current date and time
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format it as 'YYYY-MM-DD HH:MI:SS'
        const user_id = req.user.user_id;
        const name = formData.customerName;
        const email = formData.customerEmail;
        const phone = formData.customerPhone;
        const message = formData.customerNote;

        //const selectSql = `INSERT INTO FAQ VALUES FAQ_ID = :faq_id,USER_ID = :user_id,NAME = :name,EMAIL = :email, PHONE = :phone,QUESTION = :message`;
        const selectSql = `INSERT INTO FAQ (FAQ_ID, USER_ID, NAME, EMAIL, PHONE, QUESTION,TIME)
VALUES (:faq_id, :user_id, :name, :email, :phone, :message,TO_DATE(:formattedDate, 'YYYY-MM-DD HH24:MI:SS'))`;

        const selectBindings = {
            faq_Id: faq_Id,
            user_id: user_id,
            name: name,
            email: email,
            phone: phone,
            message: message,
            formattedDate : formattedDate
        };

        try {
            await faq_query.insertFAQ(selectSql, selectBindings);
            //alert("Your query sent successfully! Soon we will reply through your email");
            //res.redirect('/faq');
            res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Pop-up Example</title>
              </head>
              <body>
              <script>
              window.onload = function() {
                  // Show a pop-up message when the page loads
                  alert('Your query has sent successfully!!');
              };
          </script>
              </body>
            </html>
          `);
        }
        catch (err) {
            console.log("Error faq insert e");
        }

    }

});

module.exports = router;

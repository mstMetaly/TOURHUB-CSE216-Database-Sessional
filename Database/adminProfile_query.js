const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 

//get user profile info using gamil
async function getAdminProfileInfo(gmail) {
    const connection=await connectToDatabase();
    try {
        const selectSql = `SELECT * FROM ADMIN_PROFILE_INFO WHERE GMAIL = :gmail`;
        const selectBindings = [gmail];

        const result = await connection.execute(selectSql, selectBindings);

        if (result.rows.length === 0) {
            console.log("Found no admin profile info");
            return null; // User not found
        }
        
        console.log("GetGmailResult:", result.rows);

        return result.rows[0];

    } catch (err) {
        console.error(err);
    }
}


//update admin profile pic 
async function updateProfilePicPath(gmail,relativeFilePath)
{
    // You can save this filePath in the database for the user's profile
    const selectSql = `UPDATE ADMIN_PROFILE_INFO SET PROFILE_PIC = :filePath WHERE GMAIL = :gmail`;

    const selectBindings = {
        gmail: gmail,
        filePath: relativeFilePath
    };

    const contactSql = `UPDATE CONTACT_INFO SET PROFILE_PIC = :filePath WHERE GMAIL = :gmail`;
    const contactBindings = {
        filePath : relativeFilePath,
        gmail : gmail
    };

    try{

        const connection = await connectToDatabase();
        await connection.execute(selectSql,selectBindings);
        await connection.commit();

        //update in contact info table 
        await connection.execute(contactSql,contactBindings);
        await connection.commit();



    }catch(err)
    {
        console.log("admin profile pic file path update e error!",err);
    }
}

//update profile info
async function updateAdminProfile(user_name,nid,address,gender,nationality,phone_no,gmail)
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `UPDATE ADMIN_PROFILE_INFO SET NAME = :user_name,ADDRESS = :address, NID = :nid,  GENDER = :gender, NATIONALITY = :nationality ,PHONE_NO = :phone_no WHERE GMAIL = :gmail`;

        const selectBindings = {
            user_name : user_name,
            address : address,
            nid : nid,
            gender : gender,
            nationality : nationality,
            phone_no : phone_no,
            gmail : gmail
        };

        await connection.execute(selectSql,selectBindings);
        await connection.commit();

        //updating contact info also when user update his info
        const updateSql = `UPDATE CONTACT_INFO SET CONTACT_NAME = :user_name,PHONE_NUMBER = :phone_no WHERE GMAIL = : gmail`;
        const updateBindings = {user_name,phone_no,gmail};

        await connection.execute(updateSql,updateBindings);
        await connection.commit();

    }
    catch(err)
    {
        console.log("admin profile info update e error",err);
    }
}

module.exports = {getAdminProfileInfo,updateProfilePicPath,updateAdminProfile};
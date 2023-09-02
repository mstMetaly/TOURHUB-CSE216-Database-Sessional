const express = require('express');

const router = express.Router();

const gallery_query = require('../../Database/gallery_query');

router.get('/fetchGallery', async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const selectSql = `SELECT * FROM GALLERY`;
        
        let result = [];
        result = await gallery_query.getAllGallery(selectSql);

        if(result == undefined)
        {
            return null;
        }
        else{
            return res.json(result);
        }

    }
});

module.exports = router;
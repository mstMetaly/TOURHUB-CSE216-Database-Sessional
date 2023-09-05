const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const blog_query = require('../../Database/blog_query');

//set up multer storage
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'Public/image/gallery_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });

router.get('/writeBlog',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('Blog/writeBlog.ejs');
    }
});

//routes for submit blog

router.post('/submit-blog',upload.single('blog-image'), async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const formData = req.body;
        const name = formData.name;
        const blog_title  = formData.title ;
        const blog_content = formData.content;

        if (req.file) {
            // Extract only the desired portion of the filePath
            const relativeFilePath = path.relative('Public', req.file.path);

            const selectSql = `INSERT INTO GALLERY(NAME,IMAGE_LINK,BLOG_TITLE,BLOG_CONTENT) VALUES(:name,:image_link,:blog_title,:blog_content)`;
            const selectBindings = {
                name : name,
                image_link : relativeFilePath,
                blog_title : blog_title,
                blog_content : blog_content
            };

            try{
                await blog_query.insertBlog(selectSql,selectBindings);
                res.redirect('/writeBlog');
            }
            catch(err)
            {
                console.log("blog insert e error:",err);
            }
          
        }



    }

});

//routes for see blog
router.get('/seeBlog', async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('Blog/seeBlog.ejs');
    }
});

module.exports = router;














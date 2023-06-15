const { default: axios } = require("axios");

const router = require("express").Router();

router.post("/", async (req, res) => {
    try {
        const FB_PAGE_ID = process.env.FB_PAGE_ID;
        const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
        
        const MESSAGE = encodeURIComponent(req.body.content);
        console.log("Posting on Facebook : " + MESSAGE);

        try {
            
            let url = 'https://graph.facebook.com/' 
            + FB_PAGE_ID
            + '/feed?message=' 
            + MESSAGE
            + '&access_token='
            + FB_ACCESS_TOKEN;

            const result = await axios.post(url);

            // console.log("Facebook Post Result = " + JSON.stringify(result));
        } catch (error) {
            console.error(`Error posting message: ${error}`);
            console.error("ERROR : " + error.message);
        }

        // Respond
        res.status(200).send("OK");

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;
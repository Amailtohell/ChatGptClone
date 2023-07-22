const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");


require("dotenv").config(); // Load environment variables from .env file

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);



const app = express()
app.use(bodyParser.json())
app.use(cors())


const port = 3080
app.post('/', async (req, res) =>{
  
     try {
       const { message } = req.body;
      //  console.log(message, "message")
      //  console.log(message);

       const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${message}`,
         max_tokens: 7,
         temperature: 0.7,
       });

       //  console.log(response); // Log the entire response object

       if (response.data.choices && response.data.choices.length > 0) {
         res.json({
           message: response.data.choices[0].text,
         });
       } else {
         console.log("No completion text found in the response.");
       }
     } catch (error) {
       if (error.response) {
         console.log("API request failed:", error.response.data);
       } else {
         console.log("API request failed:", error.message);
       }
     }
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});

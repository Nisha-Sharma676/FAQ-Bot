const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { AzureOpenAI } = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());


// CORS
app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
}));


// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));


// Azure OpenAI Client
const client = new AzureOpenAI({

    endpoint: process.env.AZURE_OPENAI_ENDPOINT,

    apiKey: process.env.AZURE_OPENAI_KEY,

    apiVersion: process.env.AZURE_OPENAI_API_VERSION,

    deployment: process.env.AZURE_OPENAI_DEPLOYMENT

});


// Debug Azure Configuration
console.log({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION,
    keyExists: !!process.env.AZURE_OPENAI_KEY
});



// Chat API
app.post('/api/chat', async (req, res) => {


    const { message, systemPrompt } = req.body;


    if (!message) {

        return res.status(400).json({
            error: "Message is required"
        });

    }



    try {


        const response = await client.chat.completions.create({


            model: process.env.AZURE_OPENAI_DEPLOYMENT,


            messages: [

                {
                    role: "system",
                    content:
                        systemPrompt ||
                        "You are a helpful FAQ assistant."
                },


                {
                    role: "user",
                    content: message
                }

            ],


            max_completion_tokens: 500

        });



        res.json({

            reply: response.choices[0].message.content

        });



    } catch (error) {


        console.error(
            "Azure OpenAI Error:",
            error
        );


        res.status(500).json({

            error: error.message

        });

    }

});



// Health Check
app.get('/health', (req, res) => {

    res.status(200).json({

        status: "FAQBot is running"

    });

});



// Start Server
app.listen(PORT, () => {

    console.log(
        `FAQBot running on port ${PORT}`
    );

});
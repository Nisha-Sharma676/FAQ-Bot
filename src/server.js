// FAQBot - Azure OpenAI
// Smart FAQ Assistant

const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const systemPrompt = document.getElementById('systemPrompt');


// Azure Backend URL
const API_URL = "https://faqbot-e4e9fgfygvfybuav.uaenorth-01.azurewebsites.net/api/chat";


// Add message to chat
function addMessage(text, type) {

    const msg = document.createElement('div');

    msg.classList.add('message', type);

    msg.innerHTML = marked.parse(text);

    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;

    return msg;
}



// Send message
async function sendMessage() {


    const message = userInput.value.trim();


    if (!message) return;



    // Show user message
    addMessage(message, "user");


    userInput.value = "";

    sendBtn.disabled = true;



    // Loading message
    const loadingMsg = addMessage(
        "Thinking...",
        "loading"
    );



    try {


        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },


            body: JSON.stringify({

                message: message,

                systemPrompt: systemPrompt.value.trim()

            })

        });



        console.log(
            "Status:",
            response.status
        );


        const contentType =
            response.headers.get("content-type");


        console.log(
            "Content-Type:",
            contentType
        );



        // Remove loading
        if (loadingMsg) {

            loadingMsg.remove();

        }



        const data = await response.json();



        if (!response.ok) {


            addMessage(

                data.error ||
                "Server error occurred.",

                "bot"

            );


            return;

        }



        if (data.reply) {


            addMessage(

                data.reply,

                "bot"

            );


        } else {


            addMessage(

                "No response received.",

                "bot"

            );


        }



    } catch(error) {


        console.error(
            "Connection Error:",
            error
        );


        if (loadingMsg) {

            loadingMsg.remove();

        }



        addMessage(

            "Unable to connect with server.",

            "bot"

        );


    }



    sendBtn.disabled = false;


}



// Button click
sendBtn.addEventListener(
    "click",
    sendMessage
);



// Enter key
userInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);
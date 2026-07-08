// FAQBot - Azure OpenAI
// Smart FAQ Assistant

const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const systemPrompt = document.getElementById('systemPrompt');


// Add message to chat
function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.classList.add('message', type);

    // Markdown support
    msg.innerHTML = marked.parse(text);

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    return msg;
}


// Send message to Azure OpenAI
async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;


    // Show user message
    addMessage(message, 'user');

    userInput.value = '';
    sendBtn.disabled = true;


    // Loading message
    const loadingMsg = addMessage(
        "Thinking...",
        "loading"
    );


    try {

        const response = await fetch('/api/chat', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                message: message,

                systemPrompt: systemPrompt.value.trim()

            })

        });


        const data = await response.json();


        // Remove loading
        if (loadingMsg && loadingMsg.parentNode) {
            chatBox.removeChild(loadingMsg);
        }


        if (!response.ok) {

            addMessage(
                data.error || 
                "Server error. Please try again.",
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
                "Sorry, I could not generate a response.",
                "bot"
            );

        }


    } catch (error) {


        console.error(
            "Connection Error:",
            error
        );


        if (loadingMsg && loadingMsg.parentNode) {
            chatBox.removeChild(loadingMsg);
        }


        addMessage(
            "Error connecting to server. Please try again.",
            "bot"
        );

    }


    sendBtn.disabled = false;

}



// Button click
sendBtn.addEventListener(
    'click',
    sendMessage
);


// Enter key
userInput.addEventListener(
    'keypress',
    (e) => {

        if (e.key === 'Enter') {
            sendMessage();
        }

    }
);
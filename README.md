# FAQBot 

Ask it anything. It only answers what you tell it to.

FAQBot is a smart FAQ assistant built using Azure OpenAI. Define a system prompt, set its scope, and get responses limited to that context.

---

## What it does

- Chat interface powered by Azure OpenAI
- Customisable system prompt — define the bot's role and knowledge scope
- Real-time responses through Azure OpenAI API

---

## Stack

- Azure OpenAI (GPT-5.4-mini)
- Node.js + Express
- Vanilla JavaScript frontend

---

## Run it locally

```bash
git clone https://github.com/Nisha-Sharma676/FAQ-Bot
cd FAQ-Bot
npm install
```

Create a `.env` file:

```env
AZURE_OPENAI_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
AZURE_OPENAI_API_VERSION=2024-12-01-preview
```

Start the application:

```bash
npm start
```

Open:

```
http://localhost:3000
```

---

## Get your Azure OpenAI credentials

1. Go to Azure Portal
2. Create an Azure OpenAI resource
<<<<<<< HEAD
3. Go to Azure AI Foundry → Deploy gpt-5.4-mini
4. Copy endpoint and key into `.env`

---
=======
3. Deploy your required GPT model in Azure AI Foundry
4. Copy the endpoint, key, and deployment name into `.env`

---

## Project Structure

```
FAQ-Bot/
│
├── src/
│   └── server.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Environment Variables

The application requires the following environment variables:

```
AZURE_OPENAI_KEY
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_DEPLOYMENT
AZURE_OPENAI_API_VERSION
```

Keep your API keys secure and never commit `.env` files to GitHub.

---

## Features

- AI-powered FAQ chatbot
- Context-based responses
- Custom system instructions
- Azure OpenAI integration
- Simple and responsive chat interface

---

## Deployment

The application can be deployed using platforms like Azure App Service.

Configure the required environment variables in the deployment platform before running the application.

---



import { useState } from 'react';
import axios from 'axios';

const DynamicChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    const PROJECT_ID = 'YOUR_PROJECT_ID';
    const SESSION_ID = 'YOUR_SESSION_ID';
    const DIALOGFLOW_API_KEY = 'YOUR_DIALOGFLOW_API_KEY';

    try {
      // Call DialogFlow API
      const response = await axios.post(
        `https://dialogflow.googleapis.com/v2/projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}:detectIntent`,
        {
          queryInput: {
            text: {
              text: input,
              languageCode: 'en',
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${DIALOGFLOW_API_KEY}`,
          },
        }
      );

      const botResponse = response.data.queryResult.fulfillmentText;

      // Update the state with the user and bot messages
      setMessages([...messages, { text: `You: ${input}`, isUser: true }, { text: `Bot: ${botResponse}`, isUser: false }]);
      setInput(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message to DialogFlow:', error);
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '5px', color: message.isUser ? 'blue' : 'green' }}>
            {message.text}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default DynamicChat;

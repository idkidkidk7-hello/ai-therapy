const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage('You', message);
  userInput.value = '';

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a kind and supportive therapy assistant.' },
        { role: 'user', content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'Sorry, I had trouble responding.';

  addMessage('AI', reply);
}

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msg.style.margin = '10px 0';
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// JavaScript for the messaging app
const app = document.getElementById("app");
const messages = document.getElementById("messages");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");

// Add a message to the messages element
function addMessage(text, className) {
  const message = document.createElement("div");
  message.classList.add("message");
  if (className) {
    message.classList.add(className);
  }
  message.innerHTML = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

// Handle form submission
form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value;
  input.value = "";
  addMessage(text, "user");
  getAnswer(text).then(answer => {
    addMessage(answer, "bot");
  });
});

// Get a verified answer from the internet
async function getAnswer(query) {
  try {
    const apiUrl = "http://api.q&a.com/search";
    const params = { q: query };
    const response = await fetch(apiUrl, { params });
    const data = await response.json();
    return data.answer;
  } catch (error) {
    return "Sorry, I was unable to find an answer to your question.";
  }
}

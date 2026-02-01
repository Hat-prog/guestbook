// Fetch and display
const display = document.getElementById("app");
const form = document.getElementById("form");
const baseURL = "https://guestbook-pyec.onrender.com";

// GET route from the server
async function fetchData() {
  try {
    const response = await fetch(`${baseURL}/messages`);
    if (!response.ok) throw new Error("Failed to fetch messages");
    const messages = await response.json();
    console.log(messages);
    return messages;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Display messages in the DOM
async function displayMessages() {
  display.innerHTML = ""; // Clear existing messages
  const messages = await fetchData();

  messages.forEach((message) => {
    const div = document.createElement("div");
    const userName = document.createElement("p");
    const messageContent = document.createElement("p");

    userName.textContent = message.msg_name;
    messageContent.textContent = message.content;

    div.append(userName, messageContent);
    display.appendChild(div);
  });
}

// Initial display
displayMessages();

// POST route
async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const userInput = Object.fromEntries(formData);
  const userInputJSON = JSON.stringify(userInput);

  try {
    const response = await fetch(`${baseURL}/messages`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: userInputJSON,
    });

    if (!response.ok) throw new Error("Failed to post message");

    form.reset();
    displayMessages(); // Refresh messages without reloading
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

form.addEventListener("submit", handleSubmit);

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (message === "") return;

  // Mostrar mensaje del usuario
  appendMessage("user", message);

  try {
    const response = await fetch("http://127.0.0.1:5000/ia/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    appendMessage("bot", data.msg);
  } catch (error) {
    appendMessage("bot", "Hubo un error al conectarse con el servidor.");
  }

  userInput.value = "";
});

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

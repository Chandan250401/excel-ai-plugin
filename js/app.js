import { askAI } from "./aiService.js";
import { saveSettings } from "./storage.js";
import { getSelectedData } from "./excel.js";

window.saveSettings = function () {
  const provider = document.getElementById("provider").value;
  const apiKey = document.getElementById("apiKey").value;

  localStorage.setItem("AI_PROVIDER", provider);
  localStorage.setItem("AI_API_KEY", apiKey);

  alert("Saved!");
};

window.useSelection = async function () {
  const data = await getSelectedData();
  addMessage("System", JSON.stringify(data));
};

window.sendMessage = async function () {
  const input = document.getElementById("userInput").value;

  const data = await getSelectedData();

  const response = await askAI(input, JSON.stringify(data));

  addMessage("You", input);
  addMessage("AI", response);
};

function addMessage(sender, text) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}:</b> ${text}`;

  chat.appendChild(div);
}
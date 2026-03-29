export function saveSettings(provider, apiKey) {
  localStorage.setItem("AI_PROVIDER", provider);
  localStorage.setItem("AI_API_KEY", apiKey);
}

export function getSettings() {
  return {
    provider: localStorage.getItem("AI_PROVIDER"),
    apiKey: localStorage.getItem("AI_API_KEY")
  };
}
import { getSettings } from "./storage.js";

export async function askAI(prompt, contextData = "") {
  const { provider, apiKey } = getSettings();

  switch (provider) {
    case "openai":
      return await callOpenAI(prompt, contextData, apiKey);

    case "gemini":
      return await callGemini(prompt, contextData, apiKey);

    case "claude":
      return await callClaude(prompt, contextData, apiKey);

    case "grok":
      return await callGrok(prompt, contextData, apiKey);

    case "ollama":
      return await callOllama(prompt, contextData);

    default:
      return "No provider selected";
  }
}


<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:type="TaskPaneApp">

  <Id>12345678-1234-1234-1234-123456789abc</Id>
  <Version>1.0.0.0</Version>
  <ProviderName>YourName</ProviderName>
  <DefaultLocale>en-US</DefaultLocale>

  <Hosts>
    <Host Name="Workbook"/>
  </Hosts>

  <Requirements>
    <Sets DefaultMinVersion="1.1">
      <Set Name="ExcelApi"/>
    </Sets>
  </Requirements>

  <DefaultSettings>
    <SourceLocation DefaultValue="https://localhost:3000/src/ui/taskpane.html"/>
  </DefaultSettings>

  <Permissions>ReadWriteDocument</Permissions>

</OfficeApp>

async function callOpenAI(prompt, context, apiKey) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Excel AI assistant" },
        { role: "user", content: context + "\n" + prompt }
      ]
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response";
}

async function callClaude(prompt, context, apiKey) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [
        { role: "user", content: context + "\n" + prompt }
      ]
    })
  });

  const data = await res.json();
  return data.content?.[0]?.text || "No response";
}

async function callGrok(prompt, context, apiKey) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "grok-1",
      messages: [
        { role: "user", content: context + "\n" + prompt }
      ]
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response";
}

async function callOllama(prompt, context) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: context + "\n" + prompt
    })
  });

  const data = await res.json();
  return data.response || "No response";
}
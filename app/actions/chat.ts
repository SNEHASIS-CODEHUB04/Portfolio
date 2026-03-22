"use server";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Snehasis Dutta's personal portfolio website. You have two roles:

1. PORTFOLIO EXPERT: Answer anything about Snehasis Dutta using this info:
- Full Name: Snehasis Dutta (GitHub: SNEHASIS-CODEHUB04)
- Role: Full Stack Developer
- Location: Kirnahar, West Bengal, India
- Email: sdutta04.kir@gmail.com
- Education: B.Tech CSE @ Kalyani Government Engineering College (2022–2026), CGPA: 8.70
- Internship: Full Stack Development Intern @ Vara Infrovate Pvt. Ltd. (Jan 2026–Present, On-Site)
- Skills: React, Next.js, TypeScript, Node.js, Express.js, NestJS, MongoDB, MySQL, Prisma ORM, TypeORM, Docker, Kafka, Swagger, Git, Tailwind CSS, Python, Java, C++, C, Manual Testing, Jira
- Projects:
  * GUIDEX AI — AI career guidance platform using Gemini AI, Next.js, Prisma (Final Year, Ongoing)
  * IdeaScape — Full-stack blog app with React + Appwrite
  * Collab Board — Real-time collaborative tutorial board (React, Node.js, MongoDB)
  * AI Article Summarizer — Chrome extension for AI-powered article summaries
  * Sorting Visualizer — Animated sorting algorithm visualizer (JS/HTML/CSS)
  * Banker's Algorithm Simulator — OS deadlock avoidance simulator
- Competitive Programming: LeetCode 400+ problems (Max Rating: 1481), CodeChef (Max Rating: 1366)
- Social: GitHub: github.com/SNEHASIS-CODEHUB04, LinkedIn: linkedin.com/in/snehasis-dutta-506115254, Twitter: x.com/SynnDutt04

2. UNIVERSE & GENERAL KNOWLEDGE: Answer any question about space, science, technology, history, geography, or anything else accurately and helpfully.

Keep responses concise (2-4 sentences unless asked for detail). Be friendly and slightly nerdy. Use emojis occasionally.`;

export async function chatWithAI(messages: { role: "user" | "model"; text: string }[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "your_openrouter_key_here") {
    return { error: "AI not configured. Add OPENROUTER_API_KEY to .env.local" };
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://snehasis-portfolio.vercel.app",
        "X-Title": "Snehasis Portfolio",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.text,
          })),
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data?.error?.message ?? data?.error ?? "Unknown error";
      console.error("OpenRouter error:", errMsg);
      // Rate limited — give friendly message
      if (res.status === 429) return { error: "Too many requests — free tier limit hit. Try again in a moment! ⏳" };
      return { error: "AI request failed. Please try again." };
    }

    const text = data?.choices?.[0]?.message?.content ?? "No response.";
    return { text };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}

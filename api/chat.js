import Groq from "groq-sdk";

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // API key is server-side only — never sent to the browser
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error("CRITICAL: GROQ_API_KEY is missing from environment variables.");
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    try {
        const groq = new Groq({ apiKey });
        const { messages, systemPrompt, temperature, max_tokens } = req.body;

        if (!messages || !systemPrompt) {
            return res.status(400).json({ error: 'Missing required parameters: messages or systemPrompt' });
        }

        // Sanitize: only send role + content, no stray fields
        const cleanMessages = messages.map(m => ({
            role: m.role,
            content: m.content
        }));

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...cleanMessages
            ],
            model: "llama-3.3-70b-versatile",
            temperature: temperature ?? 0.3,
            max_tokens: max_tokens ?? 1500,
            top_p: 0.9,
            stream: false,
        });

        const responseContent = completion.choices[0]?.message?.content || "";
        return res.status(200).json({ content: responseContent });

    } catch (error) {
        console.error('Groq API Error:', error);
        return res.status(500).json({
            error: 'Failed to fetch from Groq API',
            details: error.message
        });
    }
}

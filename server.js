/**
 * Local development proxy server
 * Run with: node server.js
 * This simulates the Netlify serverless function locally so your API key
 * stays on the server and is never exposed to the browser.
 */

import express from 'express';
import Groq from 'groq-sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually
try {
    const envFile = readFileSync(join(__dirname, '.env'), 'utf-8');
    envFile.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...rest] = trimmed.split('=');
            if (key && rest.length > 0) {
                process.env[key.trim()] = rest.join('=').trim();
            }
        }
    });
} catch (_) {
    console.warn('No .env file found');
}

const app = express();
app.use(express.json());

app.options('/api/chat', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
});

app.post('/api/chat', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY not found in .env' });
    }

    try {
        const groq = new Groq({ apiKey });
        const { messages, systemPrompt, temperature, max_tokens } = req.body;

        if (!messages || !systemPrompt) {
            return res.status(400).json({ error: 'Missing messages or systemPrompt' });
        }

        const cleanMessages = messages.map(m => ({ role: m.role, content: m.content }));

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...cleanMessages
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: temperature ?? 0.3,
            max_tokens: max_tokens ?? 1500,
            top_p: 0.9,
            stream: false,
        });

        const content = completion.choices[0]?.message?.content || '';
        return res.status(200).json({ content });

    } catch (error) {
        console.error('Groq Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🔐 Secure AI proxy running on http://localhost:${PORT}`);
    console.log('   Your API key is server-side only — safe from browser exposure.\n');
});

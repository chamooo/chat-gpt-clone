import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

// dotenv.config();

// eslint-disable-next-line no-undef
const API_KEY = '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';
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: req.body.message,
                },
            ],
            max_tokens: 4000,
        }),
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

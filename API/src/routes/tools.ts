import { Router } from 'express'
import { checkJwt } from '../middleware/auth.js'

const router = Router();
const OLLAMA_URL = "http://localhost:11434/api/generate";
const OLLAMA_MODEL = "llama3"

router.use(checkJwt);

router.post('/summary', async (req, res) => {
    const { prompt } = req.body;

    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false }),
    });

    const data = await response.json();
    res.json(data)
})

export default router
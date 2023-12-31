const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = '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'

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "davinci:ft-personal-2023-05-17-05-52-51",
            prompt: req.body.message,
            max_tokens: 200,
        }),
    }
    try {
        const response = await fetch('https://api.openai.com/v1/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))

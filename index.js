const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// POST endpoint: /bfhl
app.post("/bfhl", (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input. 'data' field must be an array.",
        });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length
        ? [lowercaseAlphabets.sort().reverse()[0]]
        : [];

    const isPrime = (num) => {
        num = parseInt(num);
        if (num <= 1) return false;
        for (let i = 2; i < num; i++) if (num % i === 0) return false;
        return true;
    };
    const isPrimeFound = numbers.some((num) => isPrime(num));

    const fileValid = Boolean(file_b64);
    const fileMimeType = "image/png";
    const fileSizeKB = 400;

    res.json({
        is_success: true,
        user_id: "shruti_intodiya_13022003",
        email: "shrutiintodiya210543@acropolis.in",
        roll_number: "0827CS211231",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB,
    });
});

// GET endpoint: /bfhl
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

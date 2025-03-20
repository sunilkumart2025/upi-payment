const express = require("express");
const qr = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public")); // Serve frontend files

// ✅ Home page with Pay Now button
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// ✅ Route to generate QR Code
app.get("/generate_qr", async (req, res) => {
    let upi_id = "suniltamil2025@oksbil"; // Replace with your actual UPI ID
    let amount = req.query.amount || "100"; // Default ₹100
    let transaction_id = "TXN" + Math.floor(Math.random() * 1000000);

    let upi_link = `upi://pay?pa=${upi_id}&pn=YourName&mc=0000&tid=${transaction_id}&tr=${transaction_id}&tn=Payment&am=${amount}&cu=INR`;

    qr.toDataURL(upi_link, (err, qrCode) => {
        if (err) return res.status(500).send("Error generating QR");
        res.send(`
            <h2>Scan the QR Code to Pay ₹${amount}</h2>
            <img src="${qrCode}" />
            <br>
            <button onclick="window.location.href='/'">Back</button>
            <script>
                setTimeout(() => { window.location.href = '/'; }, 15000); // Auto-redirect after 15 sec
            </script>
        `);
    });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

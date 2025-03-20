const express = require("express");
const qr = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/generate_qr", async (req, res) => {
    let upi_id = "suniltamil2025@oksbi"; // Replace with your actual UPI ID
    let amount = req.query.amount || "2"; // Default ₹100
    let transaction_id = "TXN" + Math.floor(Math.random() * 1000000);

    let upi_link = `upi://pay?pa=${upi_id}&pn=YourName&mc=0000&tid=${transaction_id}&tr=${transaction_id}&tn=Payment&am=${amount}&cu=INR`;

    qr.toDataURL(upi_link, (err, qrCode) => {
        if (err) return res.status(500).send("Error generating QR");
        res.send(`<img src="${qrCode}" />`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

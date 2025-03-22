const QRCode = require('qrcode');
const Jimp = require('jimp');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const { amount } = req.query;

        if (!amount || isNaN(amount) || amount <= 0 || amount > 1000) {
            return res.status(400).json({ error: 'Invalid amount. Must be between ₹1 - ₹1000.' });
        }

        const upiId = 'yourupiid@upi';  // Replace with your UPI ID
        const transactionId = `TXN${Date.now()}`;
        const upiUrl = `upi://pay?pa=${upiId}&pn=SKY%20Gateway&am=${amount}&cu=INR&tn=${transactionId}`;

        // Generate the base QR code
        const qrCodeBuffer = await QRCode.toBuffer(upiUrl, { width: 300 });

        // Load QR code and SKY Gateway logo
        const qrImage = await Jimp.read(qrCodeBuffer);
        const logo = await Jimp.read(path.join(__dirname, '../public/logo.png')); // Ensure logo.png is in public folder

        // Resize and place the logo at the center
        logo.resize(60, 60);
        const x = (qrImage.bitmap.width - logo.bitmap.width) / 2;
        const y = (qrImage.bitmap.height - logo.bitmap.height) / 2;
        qrImage.composite(logo, x, y, Jimp.BLEND_SOURCE_OVER);

        // Convert to buffer and send response
        const finalBuffer = await qrImage.getBufferAsync(Jimp.MIME_PNG);
        res.setHeader('Content-Type', 'image/png');
        res.send(finalBuffer);

    } catch (error) {
        console.error('QR Generation Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

document.getElementById('generateQRBtn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    
    if (!amount || amount <= 0 || amount > 1000) {
        alert('Please enter a valid amount (₹1 - ₹1000)');
        return;
    }

    // Generate QR code for the entered amount
    const qrImage = document.getElementById('qrCode');
    qrImage.src = `/api/generate_qr?amount=${amount}`;
    document.getElementById('qrContainer').style.display = 'block';
});

document.getElementById('verifyPaymentBtn').addEventListener('click', async () => {
    const referenceNumber = document.getElementById('referenceInput').value.trim();

    if (!referenceNumber) {
        alert('Please enter a reference number!');
        return;
    }

    const response = await fetch('/api/checkPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference_number: referenceNumber })
    });

    const data = await response.json();
    alert(data.status);
});

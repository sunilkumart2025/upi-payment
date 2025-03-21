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

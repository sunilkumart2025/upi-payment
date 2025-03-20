function generateQR() {
    let amount = prompt("Enter amount (₹1000 max):");
    if (!amount || isNaN(amount) || amount <= 0 || amount > 1000) {
        alert("Invalid amount! Please enter a value between ₹1 - ₹1000.");
        return;
    }

    let upiID = "yourupiid@upi"; // Replace with your actual UPI ID
    let upiURL = `upi://pay?pa=${upiID}&pn=SKY Gateway&am=${amount}&cu=INR`;

    document.getElementById("qrcode").innerHTML = "";
    let qr = new QRCode(document.getElementById("qrcode"), {
        text: upiURL,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById("logo").style.display = "block";
    document.getElementById("confirm-btn").style.display = "block";
}

function confirmPayment() {
    let refNum = prompt("Enter Transaction Reference Number:");
    if (refNum) {
        alert("Payment successful! Reference Number: " + refNum);
        location.reload();
    } else {
        alert("Payment not confirmed!");
    }
}
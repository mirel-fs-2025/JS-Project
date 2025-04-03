document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('paymentForm');

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const idNumber = document.getElementById('idNumber').value;
        const cardHolder = document.getElementById('cardHolder').value;

        alert('התשלום בוצע בהצלחה! המשלוח בדרך...');

        clearCart();

        window.location.href = '../html/home.html';
    });

    function clearCart() {
        sessionStorage.removeItem('cart');
    }
});

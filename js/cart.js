document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    if (cartItemsContainer) {
        displayCartItems();
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';

        const shoppingCart = JSON.parse(sessionStorage.getItem('cart')) || [];

        if (shoppingCart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="message">הסל שלך ריק.</p>';
            return;
        }

        let totalPrice = 0;

        let table = document.createElement('table');
        let headerRow = document.createElement('tr');

        let headers = ['מוצר', 'מחיר ליחידה', 'כמות', 'מחיר', 'הסר פריט'];
        headers.forEach(headerText => {
            let th = document.createElement('th');
            th.innerText = headerText;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        shoppingCart.forEach(item => {
            let row = document.createElement('tr');

            let nameCell = document.createElement('td');
            nameCell.innerText = item.name;
            row.appendChild(nameCell);

            let priceCell = document.createElement('td');
            priceCell.innerText = `${item.price} $`;
            row.appendChild(priceCell);

            let quantityCell = document.createElement('td');
            let quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = '0';
            quantityInput.addEventListener('change', function () {
                let newQuantity = parseInt(quantityInput.value);
                if (newQuantity <= 0) {
                    shoppingCart.splice(shoppingCart.indexOf(item), 1);
                    row.remove();
                } else {
                    item.quantity = newQuantity;
                }
                sessionStorage.setItem('cart', JSON.stringify(shoppingCart));
                updateCartItems();
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);

            let totalPriceCell = document.createElement('td');
            totalPriceCell.innerHTML = "$";
            totalPriceCell.innerHTML += item.price * item.quantity;
            row.appendChild(totalPriceCell);

            let removeCell = document.createElement('td');
            let removeButton = document.createElement('button');
            removeButton.innerText = 'הסר פריט';
            removeButton.addEventListener('click', function () {
                shoppingCart.splice(shoppingCart.indexOf(item), 1);
                row.remove();
                sessionStorage.setItem('cart', JSON.stringify(shoppingCart));
                updateCartItems();
            });
            removeCell.appendChild(removeButton);
            row.appendChild(removeCell);

            table.appendChild(row);

            totalPrice += item.price * item.quantity;
        });

        cartItemsContainer.appendChild(table);

        let totalDiv = document.createElement('div');
        totalDiv.innerHTML = `<h3>סה"כ לתשלום: ${totalPrice} $</h3>`;
        cartItemsContainer.appendChild(totalDiv);

        if (shoppingCart.length > 0) {
            let checkoutButton = document.createElement('button');
            checkoutButton.innerText = 'מעבר לתשלום';
            checkoutButton.addEventListener('click', function () {
                sessionStorage.setItem('checkoutAttempt', true);
                window.location.href = '../html/connection.html';
            });
            cartItemsContainer.appendChild(checkoutButton);
        }
    }

    function updateCartItems() {
        displayCartItems();
    }
});

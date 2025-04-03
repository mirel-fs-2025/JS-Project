document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(sessionStorage.getItem('selectedProduct'));

    if (product) {
        const productDetailsContainer = document.getElementById('productDetails');

        const productName = document.createElement('h1');
        productName.textContent = product.name;

        const productImage = document.createElement('img');
        productImage.src = `../images/${product.src}`;
        productImage.alt = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `מחיר: ${product.price}$`;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        productDetailsContainer.appendChild(productName);
        productDetailsContainer.appendChild(productImage);
        productDetailsContainer.appendChild(productDescription);
        productDetailsContainer.appendChild(productPrice);
    } else {
        const productDetailsContainer = document.getElementById('productDetails');
        productDetailsContainer.textContent = 'פרטי המוצר לא זמינים.';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const productCardsContainer = document.getElementById('productCardsContainer');
    const filterInput = document.getElementById('filterInput');
    const resetFilterButton = document.getElementById('resetFilterButton');
    const sortSelect = document.getElementById('sortSelect');

    let arrCards = [];

    filterInput.addEventListener('input', filterAndSortProducts);
    resetFilterButton.addEventListener('click', resetFilter);
    sortSelect.addEventListener('change', filterAndSortProducts);

    function displayProductCards() {
        arrCards = [
            { src: '2.jpg', category: 'bottles', name: 'בקבוק פלסטיק לאימון ארוך', price: 62, code: '001', description: 'בקבוק קל ונוח לאימון יעיל' },
            { src: '3.jpg', category: 'bottles', name: 'בקבוק שומר קור', price: 46, code: '002', description: 'בקבוק חזק ונוח לשימוש יומיומי' },
            { src: '4.jpg', category: 'bottles', name: 'בקבוק ספורט', price: 55, code: '003', description: 'בקבוק בעיצוב מרשים ועמידות גבוהה' },
            { src: '5.jpg', category: 'bottles', name: 'בקבוק ספורטיבי איכותי', price: 57, code: '004', description: 'בקבוק איכותי עם בידוד מושלם' },
            { src: '6.jpg', category: 'bags', name: 'תיק שרוך שחור', price: 69, code: '101', description: 'תיק נוח וקל לאימון ולנסיעות' },
            { src: '7.jpg', category: 'bags', name: 'תיק שרוך לבן', price: 80, code: '102', description: 'תיק מרווח עם כיסים נגישים' },
            { src: '8.jpg', category: 'shoes', name: 'נעלים לריצה', price: 480, code: '201', description: 'נעלי ספורט נוחות לתמיכה מקסימלית' },
            { src: '9.jpg', category: 'shoes', name: 'נעלי לאימון', price: 670, code: '202', description: 'נעלי ספורט עמידות ומעוצבות' },
            { src: '10.jpg', category: 'shoes', name: 'נעלי ספורט', price: 560, code: '203', description: 'נעלי ספורט קלות עם אחיזה טובה' },
            { src: '11.jpg', category: 'socks', name: 'גרבי ספורט', price: 49, code: '301', description: 'גרבי ספורט נוחות ומעוצבות' },
            { src: '12.jpg', category: 'headphones', name: 'אוזניות נוחות', price: 270, code: '401', description: 'אוזניות איכותיות לצליל ברור וחד' },
            { src: '13.jpg', category: 'headphones', name: 'אוזניות איכותיות', price: 330, code: '402', description: 'אוזניות עם בידוד רעשים לנוחות מקסימלית' },
            { src: '14.jpg', category: 'hats', name: 'כובע שמש', price: 78, code: '501', description: 'כובע שמש קל ונוח להגנה מקסימלית' },
            { src: '15.jpg', category: 'balls', name: 'כדור אימון', price: 99, code: '601', description: 'כדור חזק ועמיד לכל סוגי המשחקים' },
            { src: '16.jpg', category: 'fitness equipment and weights', name: 'משקולות', price: 210, code: '701', description: 'משקולות איכותיות לאימון ביתי יעיל' },
            { src: '17.jpg', category: 'shirts', name: 'חולצה לכושר', price: 405, code: '801', description: 'חולצה קלה ונושמת לנוחות באימון' },
            { src: '18.jpg', category: 'shirts', name: 'חולצה נעימה ונוחה', price: 560, code: '802', description: 'חולצה מעוצבת לנוחות ואופנה' },
            { src: '19.jpg', category: 'fitness equipment and weights', name: 'רצועת אימון', price: 104, code: '901', description: 'רצועת אימון עמידה לגמישות וביצועים' },
            { src: '20.jpg', category: 'fitness equipment and weights', name: 'מכשיר הליכה', price: 40000, code: '902', description: 'מכשיר הליכה מתקדם לאימון ביתי יעיל' },
        ];

        renderProductCards(arrCards);
    }

    function renderProductCards(cards) {
        productCardsContainer.innerHTML = '';

        cards.forEach(createCard);

        function createCard(item) {
            let divCard = document.createElement('div');
            let image = document.createElement('img');
            let category = document.createElement('h5');
            let name = document.createElement('h1');
            let price = document.createElement('h2');
            let quantityInput = document.createElement('input');
            let addButton = document.createElement('button');
            let moreDetails = document.createElement('button');

            divCard.appendChild(image);
            divCard.appendChild(name);
            divCard.appendChild(price);
            divCard.appendChild(quantityInput);
            divCard.appendChild(addButton);
            productCardsContainer.appendChild(divCard);

            image.src = `../images/${item.src}`;
            name.innerText = `${item.name}`;
            price.innerText = 'מחיר: ' + `${item.price}` + '$';
            quantityInput.type = 'number';
            quantityInput.value = '1';
            quantityInput.min = '1';
            addButton.textContent = 'הוספה לסל';
            moreDetails.textContent = 'פרטים נוספים';
            moreDetails.style.margin = '5px';

            divCard.addEventListener('mouseover', () => {
                divCard.style.transform = 'scale(1.08)';
                divCard.style.transition = 'transform 0.3s ease';
            });

            divCard.addEventListener('mouseout', () => {
                divCard.style.transform = 'scale(1)';
            });

            addButton.onclick = function () {
                let user = JSON.parse(sessionStorage.getItem('user'));
                let shoppingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
                let existingProduct = shoppingCart.find(product => product.code === item.code);
                let quantity = parseInt(quantityInput.value);

                if (existingProduct) {
                    existingProduct.quantity += quantity;
                    alert(`עוד ${quantity} ${item.name} נוספו לסל. סך הכל קיים ממוצר זה בסל: ${existingProduct.quantity}`);
                } else {
                    shoppingCart.push({ ...item, quantity: quantity });
                    alert(`הוספת ${quantity} ${item.name} לסל.`);
                }
                sessionStorage.setItem('cart', JSON.stringify(shoppingCart));
            };

            moreDetails.onclick = function () {
                sessionStorage.setItem('selectedProduct', JSON.stringify(item));
                window.location.href = '../html/productDetails.html';
            };

            image.onclick = function () {
                sessionStorage.setItem('selectedProduct', JSON.stringify(item));
                window.location.href = '../html/productDetails.html';
            };
        }
    }

    function filterAndSortProducts() {
        const filterValue = filterInput.value.toLowerCase();
        const sortValue = sortSelect.value;

        let filteredCards = arrCards.filter(card =>
            card.name.toLowerCase().includes(filterValue)
        );

        switch (sortValue) {
            case 'priceHighToLow':
                filteredCards.sort((a, b) => b.price - a.price);
                break;
            case 'priceLowToHigh':
                filteredCards.sort((a, b) => a.price - b.price);
                break;
            case 'default':
                break;
        }

        renderProductCards(filteredCards);
    }

    function resetFilter() {
        filterInput.value = '';
        sortSelect.value = 'default';
        filterAndSortProducts();
    }

    displayProductCards();
});



// Initialize cart items and orders, loading existing data from localStorage if available
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let userOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

// Function to add items to the cart
function addToCart(productName, price) {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ id: product.id, name: productName, price: price, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    console.log(`${productName} added to cart with price ${price}`);
    alert(`${productName} has been added to your cart!`);
}

// Function to update cart item count
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

// Function to load cart items and update checkout button status
function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutCartTotal = document.getElementById('cart-totalP');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        if (checkoutCartTotal) {
            // checkoutBtn.classList.add('disabled');
            // checkoutBtn.disabled = true;
            // checkoutCartTotal.classList.add('display');
            checkoutCartTotal.style.display = 'none';
        }
    } else {
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p><strong>${item.name}</strong> - ₹${item.price} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</p>
                 <div class="cart-controls">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        if (checkoutBtn) {
            checkoutBtn.classList.remove('disabled');
            checkoutBtn.disabled = false;
        }
    }

    if (cartTotalElement) {
        cartTotalElement.textContent = `₹${total.toFixed(2)}`;
    }
}

// Function to increase the quantity of an item
function increaseQuantity(index) {
    cartItems[index].quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    loadCartItems();
}

// Function to decrease the quantity of an item
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    } else {
        cartItems.splice(index, 1); // Remove item if quantity becomes 0
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    loadCartItems();
}

// Function to empty the cart
function emptyCart() {
    cartItems = [];
    localStorage.removeItem('cartItems');
    updateCartCount();
    loadCartItems();
    alert('Your cart has been emptied.');
}

// Function to save the user's order when they checkout
function saveOrder() {
    const order = {
        orderId: Date.now(), 
        items: cartItems,
        date: new Date().toLocaleString(),
        totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    userOrders.push(order);
    localStorage.setItem('userOrders', JSON.stringify(userOrders));

    // Clear the cart after checkout
    cartItems = [];
    localStorage.removeItem('cartItems');
    updateCartCount();
}

// Function to proceed to checkout, ensuring the user is logged in
function proceedToCheckout() {
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (isLoggedIn) {
        saveOrder();
        alert('Checkout successful! Your order has been placed.');
        window.location.href = 'dashboard.html';
    } else {
        alert('You must be logged in to proceed to checkout.');
        window.location.href = 'login.html';
    }
}


// Function to submit the order on checkout page
function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const phone = document.getElementById('phone').value;

    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to your cart before checking out.');
        return;
    }

    saveOrder();
    alert('Thank you for your purchase! Your order has been placed.');
    window.location.href = 'dashboard.html';
}

/** LOGIN AND REGISTRATION FUNCTIONALITY **/
// Function to simulate user registration
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

// Function to simulate user login
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password.');
    }
}

// Check if the login form is hidden when logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const userLink = document.getElementById('user-link');
    const logoutLink = document.querySelector('.logout-link');
    const loginForm = document.getElementById('login-section');

    if (isLoggedIn) {
        userLink.textContent = 'Dashboard';
        userLink.href = 'dashboard.html';
        logoutLink.style.display = 'block';
        if (loginForm) loginForm.style.display = 'none';
    } else {
        userLink.textContent = 'Login/Register';
        userLink.href = 'login.html';
        logoutLink.style.display = 'none';
        if (loginForm) loginForm.style.display = 'flex';
    }
}

// Function to log out the user
function logoutUser() {
    localStorage.removeItem('loggedIn');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

// Function to load the user's orders in the dashboard
function loadUserOrders() {
    const ordersContainer = document.querySelector('.orders-container');
    const storedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

    if (storedOrders.length === 0) {
        ordersContainer.innerHTML = '<p>You have no orders yet.</p>';
        return;
    }

    storedOrders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Total:</strong> ₹${order.totalAmount.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul>
                ${order.items.map(item => `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`).join('')}
            </ul>
        `;
        ordersContainer.appendChild(orderElement);
    });
}

// Function to update the username on the dashboard
function updateDashboardUsername() {
    const user = JSON.parse(localStorage.getItem('user'));
    const usernameElement = document.getElementById('username');
    
    if (user) {
        usernameElement.textContent = user.name;
    }
}

// Call functions on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.cart-items')) {
        loadCartItems();
    }
    if (document.querySelector('.orders-container')) {
        loadUserOrders();
        updateDashboardUsername();
    }

    updateCartCount();
    checkLoginStatus();
});
// Function to remove one item by product name
function removeFromCartByName(productName) {
    const productIndex = cartItems.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        if (cartItems[productIndex].quantity > 1) {
            cartItems[productIndex].quantity -= 1;
        } else {
            cartItems.splice(productIndex, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }
}
function buyNow(productName, price) {
    // Create a temporary cart with only this product
    const temporaryCart = [{ name: productName, price: price, quantity: 1 }];
    localStorage.setItem('temporaryCart', JSON.stringify(temporaryCart));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}
function updateCart(productId, productName, productPrice, action) {
    const quantitySpan = document.getElementById(`${productName}-quantity`);
    const buyNowButton = document.getElementById(`${productName}-buy`);
    
    let quantity = parseInt(quantitySpan.textContent);
    
    if (action === 'increment') {
        quantity++;
    } else if (action === 'decrement' && quantity > 0) {
        quantity--;
    }
    
    // Update quantity display
    quantitySpan.textContent = quantity;
    
    // Enable or disable the "Buy Now" button
    if (quantity > 0) {
        buyNowButton.classList.remove('disabled');
        buyNowButton.disabled = false;
    } else {
        buyNowButton.classList.add('disabled');
        buyNowButton.disabled = true;
    }
    
    // Use the product id consistently to check/add the item in the cart
    if (quantity > 0) {
        const existingItemIndex = cartItems.findIndex(item => item.id === productId);
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity = quantity;
        } else {
            cartItems.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
        }
    } else {
        cartItems = cartItems.filter(item => item.id !== productId);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}
// Function to manage the "Place Order" button state
function managePlaceOrderButton() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const placeOrderButton = document.querySelector('.checkout-btn');

    if (cartItems.length === 0) {
        placeOrderButton.disabled = true; // Disable button
        placeOrderButton.classList.add('disabled'); // Add disabled styling
        placeOrderButton.title = 'Your cart is empty. Please add items to place an order.';
    } else {
        placeOrderButton.disabled = false; // Enable button
        placeOrderButton.classList.remove('disabled'); // Remove disabled styling
        placeOrderButton.title = ''; // Remove tooltip
    }
}

// Updated search function in scripts.js
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.querySelector('.search-results') || document.getElementById('product-container');
    
    if (!products) {
        alert("Products not loaded yet");
        return;
    }

    const results = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );

    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    // Use different rendering for index vs products page
    if (window.location.pathname.includes('products.html')) {
        renderProducts(results);
    } else {
        results.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick="location.href='products.html#${product.id}'">View Product</button>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
}

async function fetchShippingRates() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMTumET1mizWIlRiXoO47xREKfxI3UZ0g-GbtcfAKUQAtKe4k2Cz1KuL3o59mp3GDoHp6VDDwYL7vV/pub?output=csv";

    try {
        const response = await fetch(url);
        const text = await response.text();
        const rows = text.split("\n").map(row => row.split(",")); // Convert CSV to an array

        const shippingRates = {};
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip the header row
            const city = row[0]?.trim().toLowerCase();
            const charge = row[1]?.trim();
            const deliveryTime = row[2]?.trim(); // Assuming the 3rd column contains estimated delivery time

            if (city && charge && !isNaN(charge) && deliveryTime) {
                shippingRates[city] = {
                    charge: parseFloat(charge), // Convert charge to number
                    time: deliveryTime // Store estimated delivery time
                };
            }
        });

        // Store shipping rates globally
        window.shippingRates = shippingRates;

    } catch (error) {
        console.error("Error fetching shipping rates:", error);
        document.getElementById("delivery-charge").value = "Error";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchShippingRates();
});

function updateEstimatedDeliveryTime() {
    const city = document.getElementById("city").value.toLowerCase();
    const estimatedTimeElement = document.getElementById("estimated-delivery-time");

    if (window.shippingRates && window.shippingRates[city]) {
        estimatedTimeElement.textContent = `Estimated Delivery: ${window.shippingRates[city].time}`;
    } else {
        estimatedTimeElement.textContent = "Delivery Time: Not Available";
    }
}

function updateShippingCharge() {
    const city = document.getElementById("city").value.toLowerCase();
    const deliveryChargeInput = document.getElementById("delivery-charge");

    if (window.shippingRates && window.shippingRates[city]) {
        deliveryChargeInput.value = `₹${window.shippingRates[city].charge}`;
    } else {
        deliveryChargeInput.value = "Not Available";
    }
}

// Attach event listeners to city dropdown
document.getElementById("city").addEventListener("change", updateEstimatedDeliveryTime);
document.getElementById("city").addEventListener("change", updateShippingCharge);

function notifyWhatsApp(orderDetails) {
    const phone = "919811539510"; // Your WhatsApp number with country code
    const message = encodeURIComponent(
        `📢 New Order Received! \n\n${orderDetails}`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

// Modify `submitOrder()` to send WhatsApp notification
function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;
    const totalAmount = document.querySelector(".total-price").textContent;

    const orderDetails = `
    Name: ${name}
    Address: ${address}
    City: ${city}
    Phone: ${phone}
    Total: ${totalAmount}
    `;

    notifyWhatsApp(orderDetails);
    alert("Your order has been placed!");
}

function openQuickView(productId) {
    console.log("Opening quick view for product id:", productId);
    window.location.href = `productview.html?id=${productId}`;
}

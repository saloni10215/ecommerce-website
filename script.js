// =========================
// PRODUCTS
// =========================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        category: "Electronics",
        image: "images/headphones.jpg"
    },
    {
        id: 2,
        name: "T-Shirt",
        price: 499,
        category: "Clothing",
        image: "images/tshirt.jpg"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2499,
        category: "Shoes",
        image: "images/shoes.jpg"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 3999,
        category: "Electronics",
        image: "images/watch.jpg"
    }
];

// =========================
// DOM ELEMENTS
// =========================

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const categoryButtons =
document.querySelectorAll(".category-btn");
const toast =
document.getElementById("toast");
// =========================
// CART
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(productList = products) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <h2>No Products Found</h2>
        `;

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>
        `;

        productContainer.appendChild(card);

    });

}
function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

// =========================
// SEARCH
// =========================

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    const filteredProducts =
        products.filter(product =>

            product.name
            .toLowerCase()
            .includes(value)

        );

    displayProducts(filteredProducts);

});
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
        button.dataset.category;

        if(category === "All"){

            displayProducts(products);

        }

        else{

            const filteredProducts =
            products.filter(product =>
                product.category === category
            );

            displayProducts(filteredProducts);

        }

    });

});
// =========================
// ADD TO CART
// =========================
function addToCart(id) {

    const product =
        products.find(product => product.id === id);

    const existingItem =
        cart.find(item => item.id === id);

    if(existingItem){

        existingItem.quantity++;

    }

    else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();
showToast(product.name + " added to cart");
}

// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const li = document.createElement("li");

        li.innerHTML = `
            <div>

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

            </div>

            <button onclick="removeFromCart(${index})">
                ❌
            </button>
        `;

        cartItems.appendChild(li);

    });

    const count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = count;

    cartTotal.textContent = total;

}

// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

}
function increaseQuantity(id){

    const item =
    cart.find(item => item.id === id);

    item.quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

}
function decreaseQuantity(id){

    const item =
    cart.find(item => item.id === id);

    if(item.quantity > 1){

        item.quantity--;

    }

    else{

        cart =
        cart.filter(item => item.id !== id);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

}
// =========================
// INITIAL LOAD
// =========================

displayProducts();

updateCart();
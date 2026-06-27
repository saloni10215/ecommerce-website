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

const productContainer =
document.getElementById("productContainer");

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const cartTotal =
document.getElementById("cartTotal");

let cart = [];

/* Display Products */

function displayProducts() {

  productContainer.innerHTML = "";

  products.forEach(product => {

    productContainer.innerHTML += `
      <div class="product-card">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>

      </div>
    `;
  });

}

/* Add To Cart */

function addToCart(productId) {

  const product =
  products.find(item => item.id === productId);

  cart.push(product);

  updateCart();
}

/* Update Cart */

function updateCart() {

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    cartItems.innerHTML += `
      <li style="
        margin-bottom:10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        ${item.name} - ₹${item.price}

        <button
          onclick="removeFromCart(${index})"
          style="
            background:red;
            color:white;
            border:none;
            padding:5px 10px;
            border-radius:5px;
            cursor:pointer;
          "
        >
          X
        </button>
      </li>
    `;
  });

  cartCount.textContent = cart.length;

  cartTotal.textContent = total;
}

/* Remove From Cart */

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}

displayProducts();
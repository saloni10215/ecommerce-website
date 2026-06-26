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

        <button>
          Add To Cart
        </button>

      </div>
    `;
  });

}
displayProducts();
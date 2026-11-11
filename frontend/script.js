
const foods = [
    {
        name: "Mushroom Toast",
        category: "Starters",
        price: 249,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500"
    },
    {
        name: "Garden Salad",
        category: "Starters",
        price: 199,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
    },
    {
        name: "Alfredo Pasta",
        category: "Mains",
        price: 329,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500"
    },
    {
        name: "Grilled Paneer",
        category: "Mains",
        price: 349,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
    },
    {
        name: "Chocolate Cake",
        category: "Desserts",
        price: 179,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    },
    {
        name: "Berry Cheesecake",
        category: "Desserts",
        price: 199,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500"
    },
    {
        name: "Peach Tea",
        category: "Drinks",
        price: 129,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500"
    },
    {
        name: "Cold Coffee",
        category: "Drinks",
        price: 159,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    }
];

let cart = [];

function displayFoods(list) {
    const container = document.getElementById("foodContainer");

    if (list.length === 0) {
        container.innerHTML = "<p>No dishes found.</p>";
        return;
    }

    container.innerHTML = list.map((food, index) => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>₹${food.price}</p>
            <button onclick="addToCart('${food.name}')">
                Add to Cart +
            </button>
        </div>
    `).join("");
}

function filterMenu(category) {
    if (category === "All") {
        displayFoods(foods);
    } else {
        const result = foods.filter(food =>
            food.category === category
        );
        displayFoods(result);
    }
}

function searchFood() {
    const value = document.getElementById("search").value.toLowerCase();

    const result = foods.filter(food =>
        food.name.toLowerCase().includes(value)
    );

    displayFoods(result);
}

function addToCart(name) {
    const food = foods.find(item => item.name === name);
    cart.push(food);
    updateCart();
    alert(name + " added to cart!");
}

function updateCart() {
    const items = document.getElementById("cartItems");
    const total = document.getElementById("total");

    items.innerHTML = cart.map((food, index) => `
        <div class="cart-item">
            ${food.name} - ₹${food.price}
            <button onclick="removeItem(${index})">Remove</button>
        </div>
    `).join("");

    const amount = cart.reduce((sum, food) => sum + food.price, 0);

    total.textContent = amount;
    document.getElementById("count").textContent = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    document.getElementById("cart").classList.add("open");
}

function closeCart() {
    document.getElementById("cart").classList.remove("open");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Your demo order has been placed successfully!");
    cart = [];
    updateCart();
    closeCart();
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    alert("Your table booking request has been submitted successfully!");

    this.reset();
});

const dateInput = document.getElementById("bookingDate");
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];

displayFoods(foods);

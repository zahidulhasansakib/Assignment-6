// DOM Elements
const categoryContainer = document.getElementById("categoryContainer");
const cardContainer = document.getElementById("cardContainer");
const cartContainer = document.getElementById("cartContainer");
const modalContainer = document.getElementById("modalContainer");
const spinner = document.getElementById("spinner");

let totalPrice = 0;

// Spinner functions
const showSpinner = () => spinner.classList.remove("hidden");
const hideSpinner = () => spinner.classList.add("hidden");


// Open Modal
const openModal = (plant) => {
  document.getElementById("modalTitle").textContent = plant.name || "No Name";
  document.getElementById("modalImage").src = plant.image || "https://via.placeholder.com/200";
  document.getElementById("modalDescription").textContent = plant.description || "No description available.";
  document.getElementById("modalPrice").textContent = `৳${plant.price || 0}`;
  document.getElementById("modalCategory").textContent = plant.category || plant.category_name || "Tree";

  document.getElementById("modalContainer").classList.remove("hidden", "opacity-0");
  document.getElementById("modalContainer").classList.add("flex");
};


// Close Modal
const closeModal = () => {
  document.getElementById("modalContainer").classList.add("hidden");
};


// Load Categories
const loadCategory = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
      hideSpinner();
    })
    .catch((err) => {
      console.log("Categories API Error:", err);
      hideSpinner();
    });
};

// Show Categories
const showCategory = (categories) => {
  categoryContainer.innerHTML = "";
  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat.name || cat.category_name;
    li.id = cat.id;
    li.className =
      "cursor-pointer p-2 rounded transition hover:bg-green-700 hover:text-white";
    categoryContainer.appendChild(li);
  });

  // Active state
  categoryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      categoryContainer.querySelectorAll("li").forEach((li) => {
        li.classList.remove("bg-green-700", "text-white");
        li.classList.add("text-black");
      });
      e.target.classList.add("bg-green-700", "text-white");
      loadPlantsByCategory(e.target.id, e.target.textContent);
    }
  });
};

// Load plants
const loadPlantsByCategory = (categoryId = "", categoryName = "") => {
  showSpinner();
  let url = categoryId
    ? `https://openapi.programming-hero.com/api/category/${categoryId}`
    : "https://openapi.programming-hero.com/api/plants";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const plants = data.plants || data.data || [];
      showPlants(plants, categoryName); // categoryName পাঠাচ্ছি
      hideSpinner();
    })
    .catch((err) => {
      console.error("Plants API Error:", err);
      hideSpinner();
    });
};

// Show plants cards
const showPlants = (plants) => {
  cardContainer.innerHTML = "";

  if (plants.length === 0) {
    cardContainer.innerHTML = `<p class="text-red-500 text-center col-span-3">No plants found!</p>`;
    return;
  }

  plants.forEach((plant) => {
    const imageURL = plant.image || "https://via.placeholder.com/311x186";
    const desc = plant.description
      ? plant.description.slice(0, 60) + "..."
      : "";

    const categoryName = plant.category || plant.category_name || "Tree";

    const div = document.createElement("div");
    div.className = "bg-white shadow-md rounded-xl p-5 flex flex-col";

    div.innerHTML = `
      <img src="${imageURL}" alt="${plant.name || "Plant"}" 
           class="mx-auto mb-2 object-cover" 
           style="width:311.33px; height:186.8px;" />

      <!-- 🔹 Tree Name Clickable for Modal -->
      <h3 class="font-bold text-sm cursor-pointer text-green-700 hover:underline"
          onclick='openModal(${JSON.stringify(plant)})'>
        ${plant.name || "No Name"}
      </h3>

      <p class="text-gray-600 text-xs flex-grow">${desc}</p>

      <div class="flex justify-between items-center mt-1">
        <button class="text-xs px-3 py-1 bg-blue-100 text-green-600 rounded-full">
          ${categoryName}
        </button>
        <span class="font-bold text-green-700 text-sm">৳${plant.price || 0}</span>
      </div>

      <button class="mt-2 w-full bg-[#15803d] text-white rounded-md py-1 text-xs transition" 
              onclick="addToCart('${plant.id}', '${plant.name}', '${plant.price || 0}')">
        Add to Cart
      </button>
    `;
    cardContainer.appendChild(div);
  });
};


// Add to cart
const addToCart = (id, name, price) => {
  const item = document.createElement("div");
  item.className = "border-b py-2";

  item.innerHTML = `
    <div class="flex justify-between items-start">
      <div>
        <span class="font-bold">${name}</span>
        <p class="text-green-700">৳${price || 0}</p>
      </div>
      <button class="text-red-500 font-bold ml-2" onclick="removeFromCart(this, ${
        price || 0
      })">❌</button>
    </div>
  `;

  cartContainer.appendChild(item);

  // update total price
  updateTotal(price);
};

// Remove from cart
const removeFromCart = (btn, price) => {
  btn.parentElement.parentElement.remove();
  updateTotal(-price);
};

// Update total price
let total = 0;
const updateTotal = (amount) => {
  total += Number(amount);
  const totalPriceEl = document.getElementById("totalPrice");
  if (totalPriceEl) totalPriceEl.textContent = `৳${total}`;
};

// Initial Load
loadCategory();
loadPlantsByCategory();


const handleActive = (clickedElement, sectionId) => {
    // 1. Find all buttons with the 'nav-link' class
    const allLinks = document.querySelectorAll('.nav-link');

    // 2. Loop through them and remove the "active" styles
    allLinks.forEach(link => {
        link.classList.remove('bg-[#4f39f6]', 'text-white');
        link.classList.add('text-gray-500');
    });

    // 3. Add "active" styles to the clicked button
    clickedElement.classList.add('bg-[#4f39f6]', 'text-white');
    clickedElement.classList.remove('text-gray-500');

    // 4. Scroll to the section
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
}



// Trending Products

const loadTrending = () => {
    const url = 'https://fakestoreapi.com/products';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayTrending(data));
}

const displayTrending = (trending) => {
    // 01: Container Create
    const trendingContainer = document.getElementById("trending-container");
    trendingContainer.innerHTML = "";
    // Trending Sorting
    const topRated = trending.filter((item, index) => index < 3);

    // 02: Get into Every Products
    for (let product of topRated) {
        // 03: Create Elements
        const rate = product.rating;
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <div class="trending-container">
                <div class="card border rounded-lg border-gray-100 gap-7">
                    <div class="image p-2 bg-[#e4e6ea] rounded-t-lg"><img class="h-96 mx-auto"
                            src="${product.image}" alt="">
                    </div>
                    <div class="categoy-rank flex justify-between items-center px-3">
                        <button class="rounded-full text-sm bg-[#4f39f620] px-3 py-1">${product.category}</button>
                        <div class="flex gap-1">
                            <p><i class="fa-solid fa-star text-yellow-500"></i><span> ${rate.rate}</span></p>
                            <p>(${rate.count})</p>
                        </div>
                    </div>
                    <div class="title-price px-3">
                        <h2 class="text-base text-wrap">${product.title}</h2>
                        <h2 class="text-xl font-bold">$ ${product.price}</h2>
                    </div>
                    <div class="details-add flex justify-between px-3 pb-4 gap-3">
                        <button class="flex-1 border border-gray-200 font-medium rounded-md py-2"><i
                                class="fa-solid fa-eye mx-2"></i>Details</button>
                        <button
                            class="flex-1 border border-gray-200 bg-[#4f39f6] text-white font-medium rounded-md py-2"><i
                                class="fa-solid fa-cart-shopping mx-2"></i>Add</button>
                    </div>
                </div>
                
            </div>
        `;
        // 04: Append
        trendingContainer.append(btnDiv);
    }
}
loadTrending();



// Load Categories
const loadCategories = () => {
    const urlCat = 'https://fakestoreapi.com/products/categories'
    fetch(urlCat)
        .then(res => res.json())
        .then(data => displayCategories(data));
};


// display categories
const displayCategories = (categories) => {
    const container = document.getElementById('category-container');
    container.innerHTML = "";

    // Create All button
    const allBtn = document.createElement("button");
    allBtn.innerText = "All";
    allBtn.className = `category-btn btn rounded-full ${activeClass}`;
    allBtn.onclick = () => {
        setActiveButton(allBtn);
        ourProducts();
    };
    container.appendChild(allBtn);



    // Create category buttons
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category;
        btn.className = `category-btn btn rounded-full ${inactiveClass}`;

        btn.onclick = () => {
            setActiveButton(btn);
            loadProductsByCategory(category);
        };

        container.appendChild(btn);
    });
};


const setActiveButton = (activeBtn) => {
    const buttons = document.querySelectorAll('.category-btn');

    buttons.forEach(btn => {
        btn.classList.remove("bg-[#4f39f6]", "text-white");
        btn.classList.add("btn-neutral", "btn-outline", "border-gray-200");
    });

    activeBtn.classList.remove("btn-neutral", "btn-outline", "border-gray-200");
    activeBtn.classList.add("bg-[#4f39f6]", "text-white");
};




// Load Products
const ourProducts = () => {
    const urlPro = 'https://fakestoreapi.com/products';
    fetch(urlPro)
        .then((res) => res.json())
        .then((data) => displayProducts(data));
}


// Products by category
const loadProductsByCategory = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
    const data = await res.json();
    displayProducts(data);
};

// Display products
const displayProducts = (products) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = "";

    products.forEach(product => {
        const rate = product.rating;

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card border rounded-lg border-gray-100 gap-7">
                <div class="image p-2 bg-[#e4e6ea] rounded-t-lg">
                    <img class="h-96 mx-auto" src="${product.image}" alt="">
                </div>

                <div class="flex justify-between items-center px-3">
                    <button class="rounded-full text-sm bg-[#4f39f620] px-3 py-1">
                        ${product.category}
                    </button>
                    <div class="flex gap-1">
                        <p>⭐ ${rate.rate}</p>
                        <p>(${rate.count})</p>
                    </div>
                </div>

                <div class="px-3">
                    <h2 class="text-base">
                        ${product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title}
                    </h2>
                    <h2 class="text-xl font-bold">$ ${product.price}</h2>
                </div>

                <div class="flex justify-between px-3 pb-4 gap-3">
                    <button class="flex-1 border border-gray-200 rounded-md py-2">
                        Details
                    </button>
                    <button class="flex-1 bg-[#4f39f6] text-white rounded-md py-2">
                        Add
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(div);
    });
};


loadCategories();
ourProducts();


const activeClass = "bg-[#4f39f6] text-white";
const inactiveClass = "btn-neutral btn-outline border-gray-200";

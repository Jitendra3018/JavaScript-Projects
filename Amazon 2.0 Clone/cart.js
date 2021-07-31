function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                // image: doc.data().image,
                // name: doc.data().name,
                // make: doc.data().make,
                // rating: doc.data().rating,
                // price: doc.data().price,
                ...doc.data(), // Spread function for all those mentioned above
            });
        });
        // console.log(cartItems);
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    });
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                cartItem.update({ quantity: doc.data().quantity - 1 });
            }
        }
    });
}

function increaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().quantity > 0) {
                cartItem.update({ quantity: doc.data().quantity + 1 });
            }
        }
    });
}

function deleteItem(itemId) {
    db.collection("cart-items").doc(itemId).delete();
}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += item.price * item.quantity;
    });
    document.querySelector(".total-cost-number").innerText =
        numeral(totalCost).format("$0,0.00");
}

function generateCartItems(cartItems) {
    let itemsHTML = [];
    cartItems.forEach((item) => {
        itemsHTML += `<div
        class="
            cart-item
            flex
            items-center
            pb-4
            border-b border-gray-300
        "
    >
        <div
            class="
                cart-item-image
                w-40
                h-24
                bg-white
                p-4
                rounded-lg
            "
        >
            <img
                class="w-full h-full object-contain"
                src="${item.image}"
                alt=""
            />
        </div>
        <div class="car-item-details flex-grow">
            <div
                class="
                    cart-item-title
                    font-bold
                    text-sm text-gray-600
                "
            >
                ${item.name}
            </div>
            <div
                class="
                    cart-item-brand
                    text-sm text-gray-400
                "
            >
                ${item.make}
            </div>
        </div>
        <div
            class="cart-item-counter w-48 flex items-center"
        >
            <div
            data-id=${item.id}
                class="cart-item-decrease
                    cursor-pointer
                    text-gray-400
                    bg-gray-100
                    rounded
                    h-6
                    w-6
                    flex
                    items-center
                    justify-center
                    hover:bg-gray-200
                    mr-2
                "
            >
                <i class="fa fa-chevron-left fa-xs"></i>
            </div>
            <h4 class="text-gray-400">x${item.quantity}</h4>
            <div data-id=${item.id}
            class="
                    cart-item-increase
                    cursor-pointer
                    text-gray-400
                    bg-gray-100
                    rounded
                    h-6
                    w-6
                    flex
                    items-center
                    justify-center
                    hover:bg-gray-200
                    ml-2
                "
            >
                <i class="fa fa-chevron-right fa-xs"></i>
            </div>
        </div>
        <div
            class="
                cart-item-total-cost
                w-48
                font-bold
                text-gray-400
            "
        >${numeral(item.price * item.quantity).format("$0,0.00")}
        </div>
        <div data-id=${item.id}
            class="
                cart-item-delete
                w-10
                font-bold
                text-gray-300
                cursor-pointer
                hover:text-gray-500
            "
        >
            <i class="fas fa-times"></i>
        </div>
    </div>
    `;
    });
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");

    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function () {
            decreaseCount(button.dataset.id);
        });
    });

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function () {
            increaseCount(button.dataset.id);
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            deleteItem(button.dataset.id);
        });
    });
}

getCartItems();

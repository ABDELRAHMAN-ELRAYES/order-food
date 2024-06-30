'use strict';
let sugRow = document.querySelector('.suggested-meals');
let stockMenuCont = document.querySelector('.stock-menu');
let orderedMeal = document.querySelector('.ordered-meal');
let orderBtn = document.querySelector('.order-btn');
let orderCont = document.querySelector('.order');
let totalCheck = document.querySelector('.total-check');
let checkoutBtn = document.querySelector('.checkout-btn');
let orderCartBtn = document.querySelector('.order-cart');
let ordersCart = document.getElementById('orders-cart');
let closeOrdersBtn = document.querySelector('.close-orders-btn');
let innerOrdersCart = document.querySelector('.inner-orders-cart');
let newOrderBtn = document.querySelector('.new-order-btn');
const sugMeals = [
  ['Fish', 15.75],
  ['Grilled Chicken', 10.99],
  ['Spaghetti', 12.5],
  ['Vegan Bowl', 12.0],
  ['Vegetable Stir Fry', 8.5],
  ['Cheeseburger', 11.0],
  ['Margherita Pizza', 13.25],
  ['Beef', 9.75],
  ['Sushi Platter', 18.99],
  ['Lamb Gyro', 10.25],
  ['Chicken Pasta', 14.5],
  ['Steak Frites', 22.0],
  ['Shrimp Scampi', 16.5],
  ['Caesar Salad', 9.25],
];
const stockMenu = [
  ['Chicken Biryani', 12.99],
  ['Lamb Kebab', 14.5],
  ['Falafel Wrap', 8.99],
  ['Vegetable Curry', 9.75],
  ['Chicken Shawarma', 11.25],
  ['Beef Kofta', 13.0],
  ['Paneer Tikka', 10.5],
  ['Lentil Soup', 7.0],
  ['Grilled Salmon', 16.75],
  ['Stuffed Bell Peppers', 12.0],
  ['Hummus and Pita', 6.5],
  ['Butter Chicken', 13.5],
  ['Mushroom Risotto', 11.25],
  ['Spinach and Feta Pie', 9.5],
  ['Chicken Tikka Masala', 14.0],
  ['Beef and Vegetable Stew', 12.75],
  ['Eggplant Parmesan', 10.99],
  ['Lamb Chops', 18.0],
  ['Quinoa Salad', 8.5],
  ['Chicken and Rice', 10.5],
  ['Stuffed Grape Leaves', 8.25],
  ['Vegetable Samosas', 7.5],
  ['Halal Pepperoni Pizza', 13.99],
  ['Shrimp Jambalaya', 15.5],
  ['Chicken Fajitas', 12.0],
  ['Mango Chicken', 13.25],
  ['Vegetarian Lasagna', 11.0],
  ['Fish Tacos', 12.5],
  ['Garlic Naan', 3.0],
  ['Mixed Grill Platter', 19.99],
  ['Fish', 15.75],
  ['Grilled Chicken', 10.99],
  ['Spaghetti', 12.5],
  ['Vegan Bowl', 12.0],
  ['Vegetable Stir Fry', 8.5],
  ['Cheeseburger', 11.0],
  ['Margherita Pizza', 13.25],
  ['Beef', 9.75],
  ['Sushi Platter', 18.99],
  ['Lamb Gyro', 10.25],
  ['Chicken Pasta', 14.5],
  ['Steak Frites', 22.0],
  ['Shrimp Scampi', 16.5],
  ['Caesar Salad', 9.25],
];
let samePersonOrders = [];
let order = {
  orderElements: [],
  totalPrice: 0,
  orderDate: '',
};
//show some suggested meal for quick choose
let sugMealsMap = new Map(sugMeals);
let insertSugMeals = function () {
  sugMealsMap.forEach((val, meal) => {
    let elMeal = `<div class="sug-meal">${meal}</div>`;
    sugRow.insertAdjacentHTML('beforeend', elMeal);
  });
};
insertSugMeals();
// show the meals which is stock in menu
let stockMenuMap = new Map(stockMenu);
let insertStockMenu = function () {
  stockMenuMap.forEach((val, meal) => {
    let elMeal = `<div class="menu-meal">
            <h2 class="meal-name">
              <i class="fa-solid fa-bowl-food"></i> ${meal}
            </h2>
            <h2 class="meal-price">${String(val.toFixed(2)).padStart(
              5,
              '0'
            )}$</h2>
          </div>`;
    stockMenuCont.insertAdjacentHTML('beforeend', elMeal);
  });
};
insertStockMenu();
//a function to lowercase and delete spaces from string
let lowMealFormat = str => str.toLowerCase().replace(/ /g, '');
//insert the order elements cards

let totalOrderPrice = 0;
let countElements = 0;
let insertElementInOrder = function (price, meal) {
  let elMeal = `<div class="order-element">
  <div class="order-icon">
  <i class="fa-solid fa-minus delete-element delete-element${++countElements}"></i>
  <i class="fa-solid fa-bowl-food"></i>
            <h2 class="order-element-name order-element-name1">${meal}</h2>
          </div>
          <h2 class="order-price order-price1">${String(
            price.toFixed(2)
          ).padStart(5, '0')}$</h2>
        </div>`;
  order.orderElements.push(meal);
  order.totalPrice += price;
  orderCont.insertAdjacentHTML('afterbegin', elMeal);
  Math.abs(order.totalPrice).toFixed(2);
};
// add the required meal to order elements when click on the order btn
orderBtn.addEventListener('click', () => {
  if (orderedMeal.value !== '') {
    stockMenuMap.forEach((price, meal) => {
      if (lowMealFormat(meal) === lowMealFormat(orderedMeal.value)) {
        insertElementInOrder(price, meal);
        totalOrderPrice += price;
        totalCheck.textContent = totalOrderPrice.toFixed(2);
        orderedMeal.value = '';
      }
    });
  }
});

// add the feature of click on the suggested meals to directly added to the order
sugRow.addEventListener('click', event => {
  sugMealsMap.forEach((price, meal) => {
    if (lowMealFormat(event.target.textContent) === lowMealFormat(meal)) {
      insertElementInOrder(price, meal);
      totalOrderPrice += price;
      totalCheck.textContent = totalOrderPrice.toFixed(2);
    }
  });
});
// delete selected meal from order list
orderCont.addEventListener('click', event => {
  let parent = event.target.parentNode.parentNode;
  let curElement = parent.querySelector('.order-element-name');
  stockMenuMap.forEach((price, meal) => {
    if (
      order.orderElements.find(
        elm => lowMealFormat(meal) === lowMealFormat(curElement.textContent)
      ) &&
      event.target.nodeName === 'I'
    ) {
      totalOrderPrice -= price;
      totalCheck.textContent = Math.abs(totalOrderPrice).toFixed(2);
      parent.classList.add('hidden');
      order.orderElements.splice(order.orderElements.indexOf(meal), 1);
      order.totalPrice -= price;
      Math.abs(order.totalPrice).toFixed(2);
    }
  });
});

//show the orders cart
orderCartBtn.addEventListener('click', () => {
  ordersCart.classList.remove('hidden');
});
closeOrdersBtn.addEventListener('click', () => {
  ordersCart.classList.add('hidden');
});
document.addEventListener('click', event => {
  if (!event.target.closest('.order-cart')) {
    ordersCart.classList.add('hidden');
  }
});
// checkout
checkoutBtn.addEventListener('click', () => {
  if (order.totalPrice !== 0) {
    order.orderDate = new Date().toISOString();
    samePersonOrders.push(order);
    let elm = `<div class="checked-order order${samePersonOrders.length}">
              <div class="order-info"><div class="order-icon">
                <i class="fa-solid fa-bowl-food"></i>
                <h1 class="order-name">Order ${samePersonOrders.length}</h1>
              </div>
              <h2 class="order-price">${order.totalPrice.toFixed(2)}$</h2></div>
              <h2 class="order-date">${new Intl.DateTimeFormat('en-UK', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(order.orderDate))}</h2>
            </div>`;
    innerOrdersCart.insertAdjacentHTML('beforeend', elm);
    order = { orderElements: [], totalPrice: 0 };
    totalOrderPrice = 0;
    totalCheck.textContent = '0,000';
    orderCont.innerHTML = '';
  }
});
// new order
newOrderBtn.addEventListener('click', () => {
  order = { orderElements: [], totalPrice: 0 };
  totalOrderPrice = 0;
  totalCheck.textContent = '0,000';
  orderCont.innerHTML = '';
});
//delete complete order
//view checked out order
// make meals not frequent in order list

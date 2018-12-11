//declare global cart variable, don't do in actual application, best use case is to hide inside of a class as storage
let cart = [];
// let total = 0;
// on page load, insert navbar.html into header using jquery
$.get('../../components/navbar.html', function(response) {
  $('#nav').html(response);
});

// creating callback function after loading products from JSON
function showProducts(response) {
  let products = response.products;

  // declare an empty string wchi will append all html for rendering Products
  let html = '';

  for (let index in products) {
    // checks for every 3rd index, inserts new row if so
    if (index % 3 === 0) {
      html += '<div class="row">';
    }

    // creates a new product each loop
    html += `<div class="col-md-4">
        <div class="card">
          <div class="card-img-top">
            <img class="card-img" src="http://placehold.it/250x250" alt="placeholder">
          </div>
          <div class="card-title">${products[index].title}</div>
          <div class="card-subtitle">$${products[index].price}</div>
          <card class="text">
            <p>${products[index].description}</p>
          </card>
          <button class="btn btn-primary" onClick="addItem(${products[index].id})">Add to Cart</button>
        </div>
      </div>`;
    // close the row off after every third element
    if ((index+1) % 3 === 0) {
      html += '</div>';
    }
  }

  // insert html variable into the products section to render data
  $('#products').html(html);
}

// initially load products from JSON
$.get('../../assets/products.json', showProducts);

// add fuctionality for adding to the global cart variable
function addItem(id) {
  $.get('../../assets/products.json', function (response) {
    let products = response.products;

    // loop through all products and check if ID is correct
    for (let index in products) {
      if (id === products[index].id) {
          // if (index.includes(products[index].id)){
          //   cart.map(products[index].quantity += 1);
          // }
        // add full product info to cart variable
        cart.push(products[index]);
        // total += products[index].price;
        break;
      }
    }
  });

  sleep(50).then(() => showCart());

}

// add fuctionality for removing item from the cart variable
function removeItem(id) {

    // loop through all products and check if ID is correct
    for (let index in cart) {
      if (id === cart[index].id) {
        // remove full product from the cart variable
        // total -= cart[index].price;
        cart.splice(index,1);
        break;
      }
    }
// sleep(50).then(() =>
  showCart();
}

// write the functionality to show the cart
function showCart() {
  // if cart is empty change css to display none
  if (cart.length === 0) {
    $('#cart').css('display','none');
  }
  else {
    $('#cart').css('display','block');
  }

  // create html variable to be inserted into tbody
  let html = '';

  // loop through cart and add to html variable for each row
  for (let index in cart) {
    html += `
      <tr>
        <td>${cart[index].quantity}</td>
        <td>${cart[index].title}</td>
        <td>$${cart[index].price}</td>
        <td>
          <button class="btn btn-danger" onClick="removeItem(${cart[index].id})">X</button>
        </td>
      </tr>
    `;
  }


  // insert html variable into tbody
  $('#items').html(html);

  // call shotTotal() to update cart and navbar
  showTotal();

}

showCart();

// add sleep function to stop asynchronous problems
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time));
}

function showTotal() {
  let total = 0;
  for (let index in cart) {
    total += cart[index].price;
  }
  $('#cart_total').html(`$${total.toFixed(2)}`);
  $('#nav-total').html(`Total: $${total.toFixed(2)}`);
  // $('#cart_total').text(`$${total.toFixed(2)}`);
  // $('#nav-total').text(`Total: $${total.toFixed(2)}`);


}

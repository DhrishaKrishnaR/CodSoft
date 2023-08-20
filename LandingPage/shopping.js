let addToCartButtons = document.getElementsByClassName('btn-primary')
let cartContainer = document.getElementById('cart-body');
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('uk-button-danger')

// picking up all the Add-To-Cart buttons
for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
    
}

// This function helps to add items to our cart
function addToCart(event){

    
    let itemContainer = document.createElement('tr')
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement
    let btnParent = btn.parentElement
    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btnParent.children[1].innerText
    
    
    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`

    cartContainer.append(itemContainer)




    // Accessing individual quantity fields
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
                
    }

    // Accessing individual quantity fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()

   
}



// This function helps to multiply the quantity and the price
function totalCost(event){
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.innerText.replace('₹', '')
    total_field.children[0].innerText = '₹' + (quantity.value * price_field_content);
    grandTotal()
    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
    }

    
    
}

// This function helps to add up the total of the items
function grandTotal() {
    let total = 0;
    let grand_total = document.querySelector('.grand-total h3'); // Change the query selector
  
    all_total_fields = document.getElementsByClassName('total-price');
    for (let i = 0; i < all_total_fields.length; i++) {
      all_prices = Number(all_total_fields[i].innerText.replace('₹', '')); // Use ₹ instead of $
      total += all_prices;
    }
  
    if (grand_total) { // Check if the element exists before updating its content
      grand_total.innerText = "₹" + total; // Use ₹ instead of $
      grand_total.style.fontWeight = 'bold';
    }
    console.log(total);
  }
  


function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
    
}
function updateCart() {
    let cartContainer = document.getElementById('cart-body');
     // Clear previous cart items
  
    let cartItems = cartContainer.parentElement.getElementsByClassName('item-container');
    let grandTotal = 0;
  
    for (let i = 0; i < cartItems.length; i++) {
      let itemContainer = cartItems[i];
      let itemName = itemContainer.querySelector('.item-name').innerText;
      let itemPrice = parseFloat(itemContainer.querySelector('.item-price h3').innerText.replace('₹', ''));
      let quantity = parseInt(itemContainer.querySelector('.num').value);
      let total = itemPrice * quantity;
  
      // Create a row for the item in the cart table
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${itemName}</td>
        <td>$${itemPrice}</td>
        <td>${quantity}</td>
        <td>$${total}</td>
      `;
  
      // Add the row to the cart container
      cartContainer.appendChild(row);
  
      grandTotal += total;
    }
  
    // Update the grand total
    let grandTotalElement = document.getElementsByClassName('grand-total')[0];
    grandTotalElement.innerText = '₹' + grandTotal;
  }
  
  function showCartDialog() {
      // Update the cart dialog contents here, e.g., by calling updateCart() function
      updateCart();
  
      let cartDialog = document.getElementById('cart-dialog');
      UIkit.modal(cartDialog).show();
  }
  
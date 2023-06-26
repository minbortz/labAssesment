// Add item to cart
function addToCart(itemName, itemPrice, itemImage) {
    const cartItems = getCartItems();
    let cartItem = cartItems.find(item => item.name === itemName);
  
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItem = {
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1
      };
      cartItems.push(cartItem);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart!');
    displayCartItems(); // Call displayCartItems() to update the cart immediately
  }
  
  // Remove item from cart
  function removeFromCart(itemName) {
    const cartItems = getCartItems();
    const updatedCartItems = cartItems.filter(item => item.name !== itemName);
  
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    alert('Item removed from cart!');
    displayCartItems(); // Call displayCartItems() to update the cart immediately
  }
  
  // Update item quantity in cart
  function updateCartItem(itemName, quantity) {
    const cartItems = getCartItems();
    const cartItem = cartItems.find(item => item.name === itemName);
  
    if (cartItem) {
      cartItem.quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      displayCartItems(); // Call displayCartItems() to update the cart immediately
    }
  }
  
  // Get cart items from local storage
  function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }
  
  // Display cart items in the table
  function displayCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
  
    // Clear existing table rows
    while (cartItemsContainer.firstChild) {
      cartItemsContainer.firstChild.remove();
    }
  
    // Add cart items to the table
    cartItems.forEach(item => {
      const row = document.createElement('tr');
      const imageCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const priceCell = document.createElement('td');
      const quantityCell = document.createElement('td');
      const totalCell = document.createElement('td');
      const deleteButtonCell = document.createElement('td');
  
      // Create image element
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.name;
      image.style.width = '100px';
      image.style.height = 'auto';
  
      // Create quantity input element
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = '1';
      quantityInput.value = item.quantity;
      quantityInput.addEventListener('change', (event) => {
        const newQuantity = parseInt(event.target.value);
        updateCartItem(item.name, newQuantity);
      });
  
      // Create delete button element
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        removeFromCart(item.name);
      });
  
      // Calculate and display the total price for the item
      const itemTotal = item.price * item.quantity;
  
      imageCell.appendChild(image);
      nameCell.textContent = item.name;
      priceCell.textContent = '$' + item.price.toFixed(2);
      quantityCell.appendChild(quantityInput);
      totalCell.textContent = '$' + itemTotal.toFixed(2);
      deleteButtonCell.appendChild(deleteButton);
  
      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(totalCell);
      row.appendChild(deleteButtonCell);
      cartItemsContainer.appendChild(row);
    });
  }
  
  
  // Execute when the page is loaded
  document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
  
    // Add event listener to the "Pay" button
    const payButton = document.getElementById('pay-button');
    payButton.addEventListener('click', () => {
      // Fetch the PHP file
      fetch('http://localhost/LabAssesment/backend.php', {
        method: 'POST',
        body: JSON.stringify(getCartItems()),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            // Redirect to checkout.html when the "Pay" button is clicked
            window.location.href = 'checkout.html';
          } else {
            throw new Error('Error occurred during payment.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  });

          //link to main page
        // Get a reference to the button element
        var button = document.querySelector('.back');

        // Add an event listener to the button
        button.addEventListener('click', function() {
        // Change the location of the current page
        window.location.href = 'index.html';
        });
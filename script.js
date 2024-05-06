// Función para cargar el carrito desde el almacenamiento local
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}

// Función para guardar el carrito en el almacenamiento local
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

let cart = loadCart(); // Cargar el carrito al cargar la página

document.querySelectorAll('.boton-compra').forEach(function(button) {
  button.addEventListener('click', function dialogoAgregarProducto() {
    let producto = button.dataset.producto;
    let precio = parseInt(button.dataset.precio);
    if (cart[producto]) {
      cart[producto].cantidad++;
    } else {
      cart[producto] = { precio: precio, cantidad: 1 };
    }

    updateCart();
    updateCartCount();
    saveCart(cart); // Guardar el carrito actualizado
  });
});

document.querySelector('#cart-dropdown').addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-item')) {
    let producto = event.target.dataset.producto;
    delete cart[producto];
    updateCart();
    updateCartCount(); // Actualizar el contador de productos en el carrito
    saveCart(cart);
  } else if (event.target.classList.contains('remove-one-item')) {
    let producto = event.target.dataset.producto;
    cart[producto].cantidad--;
    if (cart[producto].cantidad === 0) {
      delete cart[producto];
    }
    updateCart();
    updateCartCount(); // Actualizar el contador de productos en el carrito
    saveCart(cart);
  }
});

// Función para actualizar el carrito en el HTML
function updateCart() {
  let cartDropdown = document.querySelector('#cart-dropdown');
  let cartItems = cartDropdown.querySelector('.cart-items');
  cartItems.innerHTML = ''; // Limpiar los elementos del carrito

  let total = 0;
  for (let producto in cart) {
    let item = cart[producto];
    let subtotal = item.cantidad * item.precio;
    total += subtotal;

    let cartItem = `<div class="cart-item">
                      <div>${producto} (${item.cantidad} unidad${item.cantidad > 1 ? 'es' : ''})</div>
                      <div>${subtotal}$</div>
                      <button class="remove-one-item" data-producto="${producto}">Eliminar 1</button>
                    </div>`;
    cartItems.insertAdjacentHTML('beforeend', cartItem);
  }

  let cartTotal = document.querySelector('.cart-total');
  cartTotal.innerText = 'Total: ' + total + '$';
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
  let cartCount = document.querySelector('.cart-count');
  let totalItems = Object.values(cart).reduce((acc, val) => acc + val.cantidad, 0);
  cartCount.innerText = totalItems > 0 ? '(' + totalItems + ')' : '';
}

// Evento para realizar el pedido
document.querySelector('.checkout-button').addEventListener('click', function() {
  if (Object.keys(cart).length === 0) {
    alert('El carrito está vacío');
  } else {
    alert('Pedido realizado con éxito');
    cart = {};
    updateCart();
    updateCartCount();
    saveCart(cart);
  }
});

// Evento para vaciar el carrito
document.querySelector('.empty-cart-button').addEventListener('click', function() {
  if (Object.keys(cart).length !== 0){
  cart = {};
  updateCart();
  updateCartCount();
  saveCart(cart);
  }
  else{
    alert("El carrito está vacío.")
  }
});

// Cargar el carrito y actualizar el contador al cargar la página
updateCart();
updateCartCount();

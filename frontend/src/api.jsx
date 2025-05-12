const apiBaseUrl = "https://cse108-final.onrender.com";

/* --------------------- Products --------------------- */

export async function getAllProducts() {
  const res = await fetch(`${apiBaseUrl}/api/product`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${apiBaseUrl}/api/product/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function filterProducts(filters) {
  const res = await fetch(`${apiBaseUrl}/api/product/filter`, {
    method: "GET", // or "POST" if you change the backend to accept body in POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters)
  });
  if (!res.ok) throw new Error("Failed to filter products");
  return res.json();
}

export async function createProduct(productData) {
  const res = await fetch(`${apiBaseUrl}/api/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData)
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${apiBaseUrl}/api/product/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export async function updateProduct(id, updatedData) {
  const res = await fetch(`${apiBaseUrl}/api/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function rateProduct(id, token, ratingData) {
  const res = await fetch(`${apiBaseUrl}/api/product/${id}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(ratingData)
  });
  if (!res.ok) throw new Error("Failed to rate product");
  return res.json();
}

/* --------------------- Users --------------------- */

export async function registerUser(userData) {
  const res = await fetch(`${apiBaseUrl}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${apiBaseUrl}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}


/* --------------------- Order --------------------- */

export async function placeOrder(orderData, token) {
  const res = await fetch(`${apiBaseUrl}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error("Failed to place order");
  return res.json();
}

export async function getOrdersByUsername(username, token) {
    const rest = await fetch(`${apiBaseUrl}/api/order${username}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Failed to fetch for orders.");
    return res.json();
}

export async function getOrderById(orderId, token) {
  const res = await fetch(`${apiBaseUrl}/api/order/order/${orderId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}


export async function updateOrderStatus(orderId, orderStatus, token) {
  const res = await fetch(`${apiBaseUrl}/api/order/order/${orderId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ orderStatus })
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}
/* --------------------- Cart --------------------- */

export async function getCart(userId, token) {
  const res = await fetch(`${apiBaseUrl}/api/cart/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addItemToCart(userId, item, token) {
  const res = await fetch(`${apiBaseUrl}/api/cart/${userId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error("Failed to add item to cart");
  return res.json();
}

export async function updateCartItem(userId, productId, quantity, token) {
  const res = await fetch(`${apiBaseUrl}/api/cart/${userId}/items/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
}

export async function deleteCartItem(userId, productId, token) {
  const res = await fetch(`${apiBaseUrl}/api/cart/${userId}/items/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete item from cart");
  return res.json();
}


/* --------------------- Dabloons --------------------- */

export async function getDabloonsBalance(userId, token) {
  const res = await fetch(`${apiBaseUrl}/api/dabloons/balance`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`  // Use the Bearer token to authenticate
      }
  });

  if (!res.ok) throw new Error('Failed to fetch dabloons balance');
  return res.json();
}

export async function initializeDabloons(userId, token) {
  const res = await fetch(`${apiBaseUrl}/api/dabloons/init/${userId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to initialize dabloons");
  return res.json();
}

export async function updateDabloonsBalance(userId, amount, token) {
  const res = await fetch(`${apiBaseUrl}/api/dabloons/${userId}/balance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ amount })
  });
  if (!res.ok) throw new Error("Failed to update dabloons balance");
  return res.json();
}
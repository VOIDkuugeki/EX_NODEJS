const apiEndpoint = "https://671a2500acf9aa94f6a955ef.mockapi.io/restaurant";

// Fetch restaurant data from API
function fetchRestaurants(callback) {
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
}

// Handle the fetched restaurant data
function displayRestaurants(error, data) {
  if (error) {
    console.error("Error fetching restaurant data:", error);
  } else {
    const restaurantTableBody = document.getElementById("restaurantTableBody");
    restaurantTableBody.innerHTML = ""; // Clear existing rows
    data.forEach((restaurant) => {
      const row = `<tr id="row-${restaurant.id}">
        <td>${restaurant.id}</td>
        <td>${restaurant.name}</td>
        <td>${restaurant.cuisine}</td>
        <td>${restaurant.location.address}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip}</td>
        <td>${restaurant.rating}</td>
        <td>${restaurant.price_range}</td>
        <td>${restaurant.opening_hours}</td>
        <td>${restaurant.contact_number}</td>
        <td>
            <button onclick="openEditModal(${restaurant.id})">Edit</button>
            <button onclick="removeRestaurant(${restaurant.id})">Delete</button>
        </td>
        </tr>`;
      restaurantTableBody.innerHTML += row;
    });
  }
}

// Add new restaurant data to the API
function createRestaurant(newData, callback) {
  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
}

// Update an existing restaurant in the API
function modifyRestaurant(id, updatedData, callback) {
  fetch(`${apiEndpoint}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
}

// Delete a restaurant from the API
function removeRestaurantFromApi(id, callback) {
  fetch(`${apiEndpoint}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      callback(null, id);
    })
    .catch((error) => callback(error, null));
}

// Handle form submission for adding or updating a restaurant
document.getElementById("restaurantForm").onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission

  const newRestaurant = {
    name: document.getElementById("name").value,
    cuisine: document.getElementById("cuisine").value,
    location: {
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
    },
    rating: parseFloat(document.getElementById("rating").value),
    price_range: document.getElementById("price_range").value,
    opening_hours: document.getElementById("opening_hours").value,
    contact_number: document.getElementById("contact_number").value,
  };

  if (
    document.getElementById("submitRestaurantButton").innerText ===
    "Add Restaurant"
  ) {
    createRestaurant(newRestaurant, (error, data) => {
      if (error) {
        console.error("Error adding restaurant:", error);
      } else {
        console.log("Restaurant added successfully:", data);
        fetchRestaurants(displayRestaurants); // Refresh the restaurant list
        closeModal(); // Close modal after adding
      }
    });
  } else {
    const id = document.getElementById("submitRestaurantButton").dataset.id;
    modifyRestaurant(id, newRestaurant, (error, data) => {
      if (error) {
        console.error("Error updating restaurant:", error);
      } else {
        console.log("Restaurant updated successfully:", data);
        fetchRestaurants(displayRestaurants); // Refresh the restaurant list
        closeModal(); // Close modal after updating
      }
    });
  }
};

// Open modal for editing a restaurant
function openEditModal(id) {
  fetch(`${apiEndpoint}/${id}`)
    .then((response) => response.json())
    .then((restaurant) => {
      // Populate the modal fields with the restaurant data
      document.getElementById("name").value = restaurant.name;
      document.getElementById("cuisine").value = restaurant.cuisine;
      document.getElementById("address").value = restaurant.location.address;
      document.getElementById("city").value = restaurant.location.city;
      document.getElementById("state").value = restaurant.location.state;
      document.getElementById("zip").value = restaurant.location.zip;
      document.getElementById("rating").value = restaurant.rating;
      document.getElementById("price_range").value = restaurant.price_range;
      document.getElementById("opening_hours").value = restaurant.opening_hours;
      document.getElementById("contact_number").value = restaurant.contact_number;

      // Change the button text to "Update Restaurant" and store the ID in the button
      const submitButton = document.getElementById("submitRestaurantButton");
      submitButton.innerText = "Update Restaurant";
      submitButton.dataset.id = id;

      openModal(); // Open the modal
    })
    .catch((error) => console.error("Error fetching restaurant data:", error));
}

// Delete restaurant
function removeRestaurant(id) {
  if (confirm("Are you sure you want to delete this restaurant?")) {
    removeRestaurantFromApi(id, (error, id) => {
      if (error) {
        console.error("Error deleting restaurant:", error);
      } else {
        console.log(`Restaurant ${id} deleted successfully`);
        document.getElementById(`row-${id}`).remove(); // Remove row from the table
      }
    });
  }
}

// Modal functions
function openModal() {
  document.getElementById("myModal").style.display = "block"; // Open modal
}

// Close modal
function closeModal() {
  document.getElementById("myModal").style.display = "none"; // Close modal
}

// Add button listeners
document.getElementById("openModalButton").onclick = function() {
  openModal(); // Open modal for adding
};

// Load initial restaurant data
fetchRestaurants(displayRestaurants);

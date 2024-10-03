const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");
const signInForm = document.querySelector(".sign-in form");
const signUpForm = document.querySelector(".sign-up form");

registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Function to handle the form submission
signInForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Capture form data
  const email = signInForm.querySelector('input[type="text"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  console.log(email, password);

  // Create a data object
  const data = {
    email: email,
    password: password,
  };

  try {
    // Send the form data to the server via a POST request
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // console.log(response)
    // Check if the response is successful
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      sessionStorage.setItem("user", JSON.stringify(result.user._id));
      
      console.log("Login successful:", result);

      // Redirect to another page (e.g., dashboard)
      window.location.href = "Blog3.html";
    } else {
      // Handle errors (e.g., incorrect email or password)
      const error = await response.json();
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Function to handle the form submission for sign-up
signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Capture form data
  const name = signUpForm.querySelector('input[placeholder="Name"]').value;
  const email = signUpForm.querySelector('input[placeholder="Email"]').value;
  const password = signUpForm.querySelector('input[placeholder="Password"]').value;

  console.log(name, email, password);

  // Create a data object
  const data = {
    username: name,
    email: email,
    password: password,
  };

  try {
    // Send the form data to the server via a POST request for registration
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    
    // Check if the response is successful
    if (response.ok) {
      const result = await response.json();
      sessionStorage.setItem("user", JSON.stringify(result.user._id));
      alert(result.message)
      console.log("Registration successful:", result);

      // Redirect to another page or log in automatically
      window.location.href = "Blog3.html";
    } else {
      // Handle errors (e.g., email already in use)
      const error = await response.json();
      console.error("Registration failed:", error);
      alert("Registration failed. Please check the entered details and try again.");
    }
  } catch (error) {
    console.error("Error occurred during registration:", error);
    alert("An error occurred. Please try again later.");
  }
});
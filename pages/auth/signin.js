document.addEventListener("DOMContentLoaded", () => {
  //   form elements
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Create success message element if it doesn't exist
  let successMessage = document.getElementById("successMessage");
  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.id = "successMessage";
    successMessage.className = "success-message";
    successMessage.textContent = "Login successful!";
    // No need for inline styles as they're now in CSS
    form.after(successMessage);
  }

  //   email validation
  const validateEmail = () => {
    const email = emailInput.value.trim();
    if (email === "") {
      emailError.textContent = "Email is required";
      emailInput.classList.add("error");
      return false;
    } else if (!email.includes("@")) {
      emailError.textContent = "Email must contain @ symbol";
      emailInput.classList.add("error");
      return false;
    } else if (!email.includes(".", email.indexOf("@"))) {
      emailError.textContent = "Email must contain a period after @ symbol";
      emailInput.classList.add("error");
      return false;
    } else {
      emailError.textContent = "";
      emailInput.classList.remove("error");
      return true;
    }
  };

  //   password validation
  const validatePassword = () => {
    const password = passwordInput.value.trim();
    if (password === "") {
      passwordError.textContent = "Password is required";
      passwordInput.classList.add("error");
      return false;
    } else if (password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters";
      passwordInput.classList.add("error");
      return false;
    } else {
      passwordError.textContent = "";
      passwordInput.classList.remove("error");
      return true;
    }
  };

  //    Add validation on blur
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);

  //   form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate fields
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      // Simple login success simulation
      successMessage.textContent = "Login successful!";
      successMessage.style.display = "block";

      // Reset form
      form.reset();

      // Hide success message after 2 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
    }
  });
});

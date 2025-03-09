document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const form = document.querySelector(".register-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const termsCheckbox = document.getElementById("terms");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const termsError = document.getElementById("termsError");

  // Create success message element if it doesn't exist
  let successMessage = document.getElementById("successMessage");
  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.id = "successMessage";
    successMessage.className = "success-message";
    successMessage.textContent = "Registration successful!";
    form.after(successMessage);
  }

  // Email validation
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

  // Password validation
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

  // Terms validation
  const validateTerms = () => {
    if (!termsCheckbox.checked) {
      termsError.textContent = "You must agree to terms & conditions";
      return false;
    } else {
      termsError.textContent = "";
      return true;
    }
  };

  // Add validation on blur
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);
  termsCheckbox.addEventListener("change", validateTerms);

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate fields
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isTermsChecked = validateTerms();

    if (isEmailValid && isPasswordValid && isTermsChecked) {
      // Simple registration success simulation
      successMessage.textContent = "Registration successful!";
      successMessage.style.display = "block";

      // Reset form
      form.reset();

      // Hide success message after 2 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
    }
  });

  // Password toggle
  const toggleButton = document.querySelector(".password-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
    });
  }
});

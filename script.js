// Fonction pour valider le champ lorsqu'il perd le focus (blur)
function validateField(
  field,
  requiredError,
  invalidError,
  validationFn = null
) {
  field.addEventListener("blur", function () {
    const value = field.value.trim();

    // Réinitialise les messages d'erreur
    requiredError.style.display = "none";
    if (invalidError) invalidError.style.display = "none";

    // Si le champ est vide après que l'utilisateur a commencé à y écrire quelque chose
    if (value === "") {
      field.classList.add("error");
      requiredError.style.display = "block";
      setTimeout(() => {
        requiredError.style.display = "none";
        field.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
    }
    // Si une fonction de validation supplémentaire est fournie (par exemple pour l'email)
    else if (validationFn && !validationFn(value)) {
      field.classList.add("error");
      if (invalidError) invalidError.style.display = "block";
      setTimeout(() => {
        invalidError.style.display = "none";
        field.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
    } else {
      field.classList.remove("error");
    }
  });
}

// Configuration pour chaque champ
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const messageField = document.getElementById("message");

// Validation pour chaque champ
validateField(nameField, nameField.nextElementSibling);
validateField(
  emailField,
  document.getElementById("email-required-error"),
  document.getElementById("email-invalid-error"),
  validateEmail
);
validateField(phoneField, phoneField.nextElementSibling);
validateField(messageField, messageField.nextElementSibling);

// Validation au moment de la soumission du formulaire et envoi via EmailJS
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    if (!nameField.value.trim()) {
      nameField.classList.add("error");
      nameField.nextElementSibling.style.display = "block";
      setTimeout(() => {
        nameField.nextElementSibling.style.display = "none";
        nameField.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
      isValid = false;
    } else {
      nameField.classList.remove("error");
      nameField.nextElementSibling.style.display = "none";
    }

    const emailRequiredError = document.getElementById("email-required-error");
    const emailInvalidError = document.getElementById("email-invalid-error");

    if (!emailField.value.trim()) {
      emailField.classList.add("error");
      emailRequiredError.style.display = "block";
      emailInvalidError.style.display = "none";
      setTimeout(() => {
        emailRequiredError.style.display = "none";
        emailField.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
      isValid = false;
    } else if (!validateEmail(emailField.value.trim())) {
      emailField.classList.add("error");
      emailRequiredError.style.display = "none";
      emailInvalidError.style.display = "block";
      setTimeout(() => {
        emailInvalidError.style.display = "none";
        emailField.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
      isValid = false;
    } else {
      emailField.classList.remove("error");
      emailRequiredError.style.display = "none";
      emailInvalidError.style.display = "none";
    }

    if (!phoneField.value.trim()) {
      phoneField.classList.add("error");
      phoneField.nextElementSibling.style.display = "block";
      setTimeout(() => {
        phoneField.nextElementSibling.style.display = "none";
        phoneField.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
      isValid = false;
    } else {
      phoneField.classList.remove("error");
      phoneField.nextElementSibling.style.display = "none";
    }

    if (!messageField.value.trim()) {
      messageField.classList.add("error");
      messageField.nextElementSibling.style.display = "block";
      setTimeout(() => {
        messageField.nextElementSibling.style.display = "none";
        messageField.classList.remove("error");
      }, 5000); // Cache l'erreur après 5 secondes
      isValid = false;
    } else {
      messageField.classList.remove("error");
      messageField.nextElementSibling.style.display = "none";
    }

    // Si le formulaire est valide, envoyer les données via EmailJS
    if (isValid) {
      const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        from_phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      };

      emailjs.send("service_eb0u1es", "template_heiub35", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);

          // Changer les icônes après soumission réussie
          document.querySelector(".fa-envelope").classList.remove("show-icon");
          document.querySelector(".fa-envelope").classList.add("hide-icon");

          document.querySelector(".fa-check").classList.remove("hide-icon");
          document.querySelector(".fa-check").classList.add("show-icon");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Erreur lors de la soumission du formulaire.");
        }
      );
    }
  });

// Fonction de validation d'email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

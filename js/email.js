    document.addEventListener("DOMContentLoaded", function() {

      // Set current year in footer
      const yearSpan = document.getElementById("year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }

      // ============================================
      // EMAILJS CONFIGURATION - Replace these with your own keys
      // ============================================
      
      // Your EmailJS Public Key (from Account → API Keys)
      const EMAILJS_PUBLIC_KEY = "rSelzZt9xmp70PZ0C";
      
      const EMAILJS_SERVICE_ID = "service_xpvspqm";
      
      
      const EMAILJS_TEMPLATE_ID = "template_70jxe76";

     
      (function() {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      })();

      const contactForm = document.getElementById("contactForm");
      const formStatus = document.getElementById("formStatus");
      const submitButton = document.getElementById("submitButton");

      
      contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate fields
        if (!name || !email || !subject || !message) {
          formStatus.textContent = "⚠️ Please fill in all fields.";
          formStatus.style.color = "#721c24";
          formStatus.style.backgroundColor = "#f8d7da";
          formStatus.style.padding = "10px";
          formStatus.style.borderRadius = "6px";
          formStatus.style.border = "1px solid #f5c6cb";
          return;
        }

        // Validate email format
        if (!email.includes("@") || !email.includes(".")) {
          formStatus.textContent = "⚠️ Please enter a valid email address.";
          formStatus.style.color = "#721c24";
          formStatus.style.backgroundColor = "#f8d7da";
          formStatus.style.padding = "10px";
          formStatus.style.borderRadius = "6px";
          formStatus.style.border = "1px solid #f5c6cb";
          return;
        }

        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "📧 Sending your message...";
        formStatus.style.color = "#004085";
        formStatus.style.backgroundColor = "#cce5ff";
        formStatus.style.padding = "10px";
        formStatus.style.borderRadius = "6px";
        formStatus.style.border = "1px solid #b8daff";

        // Prepare template parameters
        const templateParams = {
          name: name,
          email: email,
          subject: subject,
          message: message
        };

        // Send email using EmailJS
        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
          )
          .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);

            // Show success message
            formStatus.textContent = "✅ Message sent successfully! I'll get back to you soon.";
            formStatus.style.color = "#155724";
            formStatus.style.backgroundColor = "#d4edda";
            formStatus.style.padding = "10px";
            formStatus.style.borderRadius = "6px";
            formStatus.style.border = "1px solid #c3e6cb";

            // Reset form
            contactForm.reset();

            // Auto-hide status after 8 seconds
            setTimeout(function() {
              formStatus.textContent = "";
              formStatus.style.padding = "0";
              formStatus.style.border = "none";
              formStatus.style.backgroundColor = "transparent";
            }, 8000);

          })
          .catch(function(error) {
            console.error("FAILED...", error);

            // Show error message
            formStatus.textContent = "❌ Failed to send message. Please try again or email me directly.";
            formStatus.style.color = "#721c24";
            formStatus.style.backgroundColor = "#f8d7da";
            formStatus.style.padding = "10px";
            formStatus.style.borderRadius = "6px";
            formStatus.style.border = "1px solid #f5c6cb";

          })
          .finally(function() {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
          });

      });

    });
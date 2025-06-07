document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id !== 'checkout-page') return;

    const form = document.getElementById('checkout-form');
    const summaryItemsContainer = document.getElementById('checkout-summary-items');
    const summarySubtotalEl = document.getElementById('summary-subtotal');
    const summaryShippingEl = document.getElementById('summary-shipping');
    const summaryVatEl = document.getElementById('summary-vat');
    const summaryGrandTotalEl = document.getElementById('summary-grandtotal');

    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const emoneyDetailsDiv = document.getElementById('emoney-details');
    const codDetailsDiv = document.getElementById('cod-details');
    const emoneyNumberInput = document.getElementById('emoneyNumber');
    const emoneyPinInput = document.getElementById('emoneyPin');
    const inputs = form.querySelectorAll('input[required]');

    function loadSummary() {
        const items = getCartItems();
        console.log('Cart items in loadSummary:', items);
        if (items.length === 0 && window.location.pathname.includes('checkout.html')) {
            // Redirect to homepage or cart page if cart is empty and on checkout
            window.location.href = 'index.html';
            return;
        }

        summaryItemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('summary-item');
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.shortName}" class="summary-item-image">
                <div class="summary-item-details">
                    <p class="summary-item-name">${item.shortName}</p>
                    <p class="summary-item-price">$${item.price.toLocaleString()}</p>
                </div>
                <p class="summary-item-quantity">x${item.quantity}</p>
            `;
            summaryItemsContainer.appendChild(itemEl);
        });

        const subtotal = getCartSubtotal();
        const vat = getVAT();

        summarySubtotalEl.textContent = `$${subtotal.toLocaleString()}`;
        summaryShippingEl.textContent = `$${SHIPPING_COST.toLocaleString()}`;
        summaryVatEl.textContent = `$${vat.toLocaleString()}`;
        summaryGrandTotalEl.textContent = `$${getGrandTotal().toLocaleString()}`;
    }

    function handlePaymentMethodChange() {
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').value;
        if (selectedPayment === 'e-money') {
            emoneyDetailsDiv.style.display = 'grid'; 
            codDetailsDiv.style.display = 'none';
            emoneyNumberInput.required = true;
            emoneyPinInput.required = true;
        } else { // Cash on Delivery
            emoneyDetailsDiv.style.display = 'none';
            codDetailsDiv.style.display = 'flex'; 
            emoneyNumberInput.required = false;
            emoneyPinInput.required = false;
        }
    }

    paymentMethodRadios.forEach(radio => radio.addEventListener('change', handlePaymentMethodChange));

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            showOrderConfirmation();
            clearCart(); 
        }
    });

    function validateForm() {
        let isValid = true;
        const radioErrorMsg = form.querySelector('.error-message-radio');

        inputs.forEach(input => {
            const errorSpan = input.closest('.form-group').querySelector('.error-message');
            if (!input.value.trim() && input.offsetParent !== null) { // Check if visible
                isValid = false;
                input.classList.add('input-error');
                if (errorSpan) errorSpan.textContent = "Can't be empty";
            } else if (input.type === 'email' && !isValidEmail(input.value) && input.offsetParent !== null) {
                isValid = false;
                input.classList.add('input-error');
                if (errorSpan) errorSpan.textContent = "Wrong format";
            } else if (input.type === 'tel' && !isValidPhone(input.value) && input.offsetParent !== null) {
                 // Basic phone validation, can be more complex
                isValid = false;
                input.classList.add('input-error');
                if (errorSpan) errorSpan.textContent = "Wrong format";
            } else if (input.pattern && !new RegExp(input.pattern).test(input.value) && input.offsetParent !== null) {
                isValid = false;
                input.classList.add('input-error');
                if (errorSpan) errorSpan.textContent = "Wrong format";
            }
            else {
                input.classList.remove('input-error');
                if (errorSpan) errorSpan.textContent = "";
            }
        });

         // Validate radio buttons for payment method
         const paymentMethodSelected = form.querySelector('input[name="paymentMethod"]:checked');
         if (!paymentMethodSelected) {
             isValid = false;
             if (radioErrorMsg) radioErrorMsg.textContent = "Please select a payment method.";
         } else {
             if (radioErrorMsg) radioErrorMsg.textContent = "";
         }


        if (!isValid) {
          const firstErrorInput = form.querySelector('.input-error, input:invalid');
          if (firstErrorInput) {
             firstErrorInput.focus();
             // Scroll to the first error field's legend or group
             const fieldset = firstErrorInput.closest('fieldset');
             if (fieldset) {
                 fieldset.scrollIntoView({ behavior: 'smooth', block: 'start' });
             } else {
                 firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
             }
          }
        }
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidPhone(phone) {
         const phoneRegex = /^[+]?[\s./0-9]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\s./0-9]*$/;
         return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
     }


    inputs.forEach(input => {
         input.addEventListener('input', () => {
             const errorSpan = input.closest('.form-group').querySelector('.error-message');
             if (input.value.trim()) {
                 input.classList.remove('input-error');
                 if (errorSpan) errorSpan.textContent = "";
             }
             // Add specific format validation on blur if needed
         });
     });


    function showOrderConfirmation() {
        const modal = document.getElementById('order-confirmation-modal');
        const confirmationItemsContainer = document.getElementById('confirmation-item-list');
        const confirmationGrandTotalEl = document.getElementById('confirmation-grand-total');
        const viewLessButton = modal.querySelector('.view-less');

        const items = getCartItems(); 
        if (items.length === 0) return; 

        confirmationItemsContainer.innerHTML = '';
        const firstItem = items[0];

        const firstItemEl = document.createElement('div');
        firstItemEl.classList.add('confirmation-first-item');
        firstItemEl.innerHTML = `
            <img src="${firstItem.image}" alt="${firstItem.shortName}">
            <div>
                <p>${firstItem.shortName}</p>
                <p class="price">$${firstItem.price.toLocaleString()}</p>
            </div>
            <p class="quantity">x${firstItem.quantity}</p>
        `;
        confirmationItemsContainer.appendChild(firstItemEl);

        if (items.length > 1) {
            const otherItemsEl = document.createElement('p');
            otherItemsEl.classList.add('confirmation-other-items');
            otherItemsEl.textContent = `and ${items.length - 1} other item(s)`;
            confirmationItemsContainer.appendChild(otherItemsEl);
            if(viewLessButton) viewLessButton.style.display = 'block'; 
        } else {
            if(viewLessButton) viewLessButton.style.display = 'none';
        }


        const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        confirmationGrandTotalEl.textContent = `$${getGrandTotal().toLocaleString()}`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Initial setup
    loadSummary();
    handlePaymentMethodChange();
});
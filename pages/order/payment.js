document.addEventListener('DOMContentLoaded', function() {
  // Get the payment button
  const payButton = document.querySelector('.btn-submit');
  
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);
  
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'payment-modal';
  document.body.appendChild(modal);
  
  // Create modal content
  modal.innerHTML = `
    <div class="payment-card modal-card">
      <header class="payment-header">
        <h1>Payment Info</h1>
      </header>

      <section class="payment-details">
        <div class="payment-field">
          <span class="payment-label">No. Rekening Virtual :</span>
          <div class="account-number-container">
            <span class="payment-value">12321328913829724</span>
            <button class="copy-button">Copy</button>
          </div>
        </div>

        <div class="payment-field">
          <span class="payment-label">Total Payment :</span>
          <span class="payment-value amount">$30.00</span>
        </div>

        <p class="payment-notice">
          Pay this payment bill before it is due,
          <span class="due-date">on June 23, 2023</span>. If the bill has not
          been paid by the specified time, it will be forfeited
        </p>

        <div class="action-buttons">
          <button class="check-payment-button">Check Payment</button>
          <button class="pay-later-button">Pay Later</button>
        </div>
      </section>
    </div>
  `;
  
  // Add event listener to pay button to show modal
  payButton.addEventListener('click', function(e) {
    e.preventDefault();
    modalOverlay.style.display = 'block';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
  
  // Close modal when clicking outside
  modalOverlay.addEventListener('click', closeModal);
  
  // Close modal when clicking "Pay Later"
  modal.querySelector('.pay-later-button').addEventListener('click', closeModal);
  
  // Function to close the modal
  function closeModal() {
    modalOverlay.style.display = 'none';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
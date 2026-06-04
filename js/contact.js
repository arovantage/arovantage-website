(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Handle URL parameter routing
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  const inquirySelect = document.getElementById('inquiryType');
  if (inquirySelect && typeParam) {
    if (typeParam === 'career') inquirySelect.value = 'career';
    else if (typeParam === 'client') inquirySelect.value = 'enterprise';
  }

  // Show/hide fields based on inquiry type
  if (inquirySelect) {
    inquirySelect.addEventListener('change', function() {
      const enterpriseFields = document.getElementById('enterpriseFields');
      const careerFields = document.getElementById('careerFields');
      if (enterpriseFields) enterpriseFields.style.display = this.value === 'enterprise' ? 'block' : 'none';
      if (careerFields) careerFields.style.display = this.value === 'career' ? 'block' : 'none';
    });
    inquirySelect.dispatchEvent(new Event('change'));
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName') ? document.getElementById('contactName').value : '';
    const email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value : '';
    const inquiryType = inquirySelect ? inquirySelect.value : 'general';
    const message = document.getElementById('contactMessage') ? document.getElementById('contactMessage').value : '';
    const isCareer = inquiryType === 'career';
    const subject = isCareer
      ? '[AroVantage.com] CAREER INQUIRY from ' + name
      : '[AroVantage.com] ENTERPRISE CLIENT INQUIRY from ' + name;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('_replyto', email);
    formData.append('_subject', subject);
    formData.append('inquiryType', inquiryType);
    formData.append('message', message);
    if (!isCareer) formData.append('_enterprise', 'true');

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }

    fetch('https://formspree.io/f/reach@arovantage.com', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(response) {
      if (response.ok) {
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) { successMsg.style.display = 'block'; }
        else { alert('Thank you! Your message has been sent. We will respond within 24 hours.'); }
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(function() {
      alert('There was an issue sending your message. Please email us directly at reach@arovantage.com or call 973-525-3107.');
      if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
    });
  });
})();

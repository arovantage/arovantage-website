// AroVantage Contact Form
document.addEventListener('DOMContentLoaded', function() {
  var btnClient = document.getElementById('btnClient');
  var btnCareer = document.getElementById('btnCareer');
  var clientFields = document.querySelector('.client-fields');
  var careerFields = document.querySelector('.career-fields');
  var inquiryType = document.getElementById('inquiryType');

  function switchType(type) {
    if (!btnClient) return;
    if (type === 'career') {
      btnClient.classList.remove('active');
      btnCareer.classList.add('active');
      if (clientFields) clientFields.style.display = 'none';
      if (careerFields) careerFields.style.display = 'block';
      if (inquiryType) inquiryType.value = 'career';
    } else {
      btnCareer && btnCareer.classList.remove('active');
      btnClient && btnClient.classList.add('active');
      if (clientFields) clientFields.style.display = 'block';
      if (careerFields) careerFields.style.display = 'none';
      if (inquiryType) inquiryType.value = 'client';
    }
  }

  if (btnClient) btnClient.addEventListener('click', function() { switchType('client'); });
  if (btnCareer) btnCareer.addEventListener('click', function() { switchType('career'); });

  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var valid = true;
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    [firstName, lastName, email, message].forEach(function(field) {
      if (field && !field.value.trim()) {
        field.style.borderColor = '#e53e3e';
        valid = false;
      } else if (field) {
        field.style.borderColor = '';
      }
    });

    if (email && email.value && !/^[^@]+@[^@]+.[^@]+$/.test(email.value)) {
      email.style.borderColor = '#e53e3e';
      valid = false;
    }

    if (!valid) return;

    var submitBtn = document.getElementById('submitBtn');
    var submitText = document.getElementById('submitText');
    var submitSpinner = document.getElementById('submitSpinner');

    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.style.display = 'none';
    if (submitSpinner) submitSpinner.style.display = 'inline';

    // Simulate submission - in production connect to a form service
    setTimeout(function() {
      form.style.display = 'none';
      var success = document.getElementById('formSuccess');
      if (success) success.style.display = 'block';
    }, 1500);
  });

  // Handle URL params
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  if (type === 'career') switchType('career');
  if (type === 'client') switchType('client');
});

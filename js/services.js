// AroVantage Services Tab System
document.addEventListener('DOMContentLoaded', function() {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tab = btn.getAttribute('data-tab');
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.getElementById('tab-' + tab);
      if (panel) panel.classList.add('active');
    });
  });
  // Handle hash links
  var hash = window.location.hash.replace('#', '');
  if (hash === 'advisory' || hash === 'edm' || hash === 'ai') {
    var targetBtn = document.querySelector('.tab-btn[data-tab="' + hash + '"]');
    if (targetBtn) targetBtn.click();
    setTimeout(function() {
      var el = document.getElementById(hash);
      if (el) el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 200);
  }
});

// AroVantage Insights & Careers Toggle
document.addEventListener('DOMContentLoaded', function() {
  var toggleBtns = document.querySelectorAll('.toggle-btn');
  var panels = document.querySelectorAll('.content-panel');
  if (!toggleBtns.length) return;
  toggleBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-toggle');
      toggleBtns.forEach(function(b) { b.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
    });
  });
  // Auto-switch to careers if hash is #careers
  if (window.location.hash === '#careers') {
    var careersBtn = document.querySelector('.toggle-btn[data-toggle="careers"]');
    if (careersBtn) {
      careersBtn.click();
      setTimeout(function() {
        var el = document.getElementById('careers');
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 300);
    }
  }
});

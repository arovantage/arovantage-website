(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let nodes = [], animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function Node() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2.5 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  function init() {
    nodes = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < Math.min(count, 80); i++) nodes.push(new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 168, 181, ' + n.opacity + ')';
      ctx.fill();
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(74, 144, 226, ' + (1 - dist / 140) * 0.25 + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function() { resize(); init(); });
  resize();
  init();
  draw();
})();

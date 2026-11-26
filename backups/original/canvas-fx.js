export function launchCelebration(canvas, count = 65) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
  let particles = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 7;
    return { x: canvas.width / 2, y: canvas.height / 3, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2, size: 5 + Math.random() * 5, color: colors[Math.floor(Math.random() * colors.length)], alpha: 1 };
  });
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0.02);
    for (const p of particles) { p.x += p.vx; p.y += p.vy; p.vy += 0.22; p.alpha -= 0.015; ctx.globalAlpha = Math.max(0, p.alpha); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size * 0.6); }
    if (particles.length) requestAnimationFrame(frame); else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(frame);
}
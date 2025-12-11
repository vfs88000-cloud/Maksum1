    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let W = canvas.width = innerWidth;
    let H = canvas.height = innerHeight;

    window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; initParticles(); });

    class Particle{constructor(){this.reset()}reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-0.5)*0.6;this.vy=(Math.random()-0.5)*0.6;this.r=1+Math.random()*2;this.alpha=0.3+Math.random()*0.7}}
    let particles=[];
    function initParticles(n=120){particles=[];for(let i=0;i<n;i++)particles.push(new Particle())}
    initParticles();

    function draw(){ctx.clearRect(0,0,W,H);
      const g = ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'rgba(30,30,80,0.12)');g.addColorStop(1,'rgba(8,12,50,0.28)');
      ctx.fillStyle = g;ctx.fillRect(0,0,W,H);

      for(let p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>W) p.vx *= -1;
        if(p.y<0||p.y>H) p.vy *= -1;
        ctx.beginPath(); ctx.globalAlpha = p.alpha; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='white'; ctx.fill();
      }
      ctx.globalAlpha=0.07; ctx.strokeStyle='white';
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j];const dx=a.x-b.x,dy=a.y-b.y;const d=dx*dx+dy*dy; if(d<12000){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
      }
      ctx.globalAlpha=1;
      requestAnimationFrame(draw);
    }
    draw();

    // --- Countdown logic ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Ціль: 1 червня наступного року о 12:00
    const now = new Date();
    let year = now.getFullYear();
    if (now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 1)) {
      year += 1;
    }
    const target = new Date(year, 5, 1, 12, 0, 0);

    function updateCountdown(){
      const now = new Date();
      let diff = target - now;
      if(diff < 0){
        daysEl.textContent='0'; hoursEl.textContent='0'; minutesEl.textContent='0'; secondsEl.textContent='0';
        document.getElementById('title').textContent = 'Свято вже сталося 🎉';
        return;
      }
      const s = Math.floor(diff/1000);
      const days = Math.floor(s/86400); const hours = Math.floor((s%86400)/3600); const mins = Math.floor((s%3600)/60); const secs = s%60;
      daysEl.textContent = days; hoursEl.textContent = hours; minutesEl.textContent = mins; secondsEl.textContent = secs;
    }

    updateCountdown();
    setInterval(updateCountdown,1000);
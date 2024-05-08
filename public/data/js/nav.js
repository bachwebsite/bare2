const j = document.createElement('link');
j.href = 'https://cdn.jsdelivr.net/gh/eliyantosarage/font-awesome-pro@main/fontawesome-pro-6.5.1-web/css/all.min.css';
j.rel = 'stylesheet';
const i = document.querySelector('head');
i.appendChild(j);

      const w = document.createElement('nav');
      const a = document.createElement('a');
      a.href = '/home.html';
      a.textContent = 'breakium';
      w.appendChild(a);

      const b = document.createElement('a');
      b.href = '/english';
      const c = document.createElement('i');
      c.classList.add('fas', 'fa-gamepad');
      b.appendChild(c);
      w.appendChild(b);

      const d = document.createElement('a');
      d.href = '/math';
      const e = document.createElement('i');
      e.classList.add('fas', 'fa-phone');
      d.appendChild(e);
      w.appendChild(d);

      const f = document.createElement('a');
      f.href = '/science';
      const g = document.createElement('i');
      g.classList.add('fas', 'fa-layer-group');
      f.appendChild(g);
      w.appendChild(f);

      const k = document.createElement('a');
      k.href = '/@';
      const l = document.createElement('i');
      l.classList.add('fas', 'fa-gear');
      k.appendChild(l);
      w.appendChild(k);

      const m = document.createElement('a');
      m.href = '//discord.gg/dDZZVEFTtQ';
      const n = document.createElement('i');
      n.classList.add('fa-brands', 'fa-discord');
      m.appendChild(n);
      w.appendChild(m);

      const q = document.createElement('a');
      q.href = '/tabs';
      const r = document.createElement('i');
      r.classList.add('fas', 'fa-circle-plus');
      q.appendChild(r);
      w.appendChild(q);

      const o = document.createElement('a');
      o.href = '/how2make1link.html';
      const p = document.createElement('i');
      p.classList.add('fas', 'fa-link');
      o.appendChild(p);
      w.appendChild(o);

      const y = document.createElement('span');
      y.id = 'span';
      const x = document.createElement('i');
      x.classList.add('fas', 'fa-clock');
      y.appendChild(x);
      w.appendChild(y);

      const h = document.querySelector('body');
      h.insertBefore(w, h.firstChild);
      var z = document.getElementById('span'); 
      
      function time() {var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        z.textContent = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
      }
      setInterval(time, 1000);
      console.log(time, 1000);
      function searchGames() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const games = document.querySelectorAll('.bubbly-button a');
      
        games.forEach(game => {
          const gameName = game.textContent.toLowerCase();
          const parentButton = game.parentElement;
      
          if (gameName.includes(searchInput)) {
            parentButton.style.display = 'inline-block';
          } else {
            parentButton.style.display = 'none';
          }
        });
      }
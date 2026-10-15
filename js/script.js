/* ── Data ── */
    const ARCANA = [
      { num: 0,  name: 'O Louco',         roman: 'O',    color: '#4a3a1a', glyph: '✦' },
      { num: 1,  name: 'O Mago',          roman: 'I',    color: '#3a2a10', glyph: '✨' },
      { num: 2,  name: 'A Sacerdotisa',   roman: 'II',   color: '#2a1a40', glyph: '🌙' },
      { num: 3,  name: 'A Imperatriz',    roman: 'III',  color: '#1a3020', glyph: '✿' },
      { num: 4,  name: 'O Imperador',     roman: 'IV',   color: '#3a1010', glyph: '♦' },
      { num: 5,  name: 'O Hierofante',    roman: 'V',    color: '#2a1a40', glyph: '☽' },
      { num: 6,  name: 'Os Enamorados',    roman: 'VI',   color: '#3a1820', glyph: '♡' },
      { num: 7,  name: 'O Carro',         roman: 'VII',  color: '#101830', glyph: '★' },
      { num: 8,  name: 'A Força',         roman: 'VIII', color: '#3a2800', glyph: '☀' },
      { num: 9,  name: 'O Eremita',       roman: 'IX',   color: '#252522', glyph: '🕯' },
      { num: 10, name: 'Roda da Fortuna', roman: 'X',    color: '#302510', glyph: '⊕' },
      { num: 11, name: 'A Justiça',       roman: 'XI',   color: '#102030', glyph: '⚖' },
      { num: 12, name: 'O Enforcado',     roman: 'XII',  color: '#101828', glyph: '☯' },
      { num: 13, name: 'A Morte',         roman: 'XIII', color: '#151520', glyph: '☽' },
      { num: 14, name: 'A Temperança',    roman: 'XIV',  color: '#102018', glyph: '∞' },
      { num: 15, name: 'O Diabo',         roman: 'XV',   color: '#280808', glyph: '⛧' },
      { num: 16, name: 'A Torre',         roman: 'XVI',  color: '#301008', glyph: '⚡' },
      { num: 17, name: 'A Estrela',       roman: 'XVII', color: '#101830', glyph: '★' },
      { num: 18, name: 'A Lua',           roman: 'XVIII',color: '#180f2a', glyph: '🌙' },
      { num: 19, name: 'O Sol',           roman: 'XIX',  color: '#302000', glyph: '☀' },
      { num: 20, name: 'O Julgamento',    roman: 'XX',   color: '#301808', glyph: '♔' },
      { num: 21, name: 'O Mundo',         roman: 'XXI',  color: '#102010', glyph: '✦' },
    ];

    const RW_IMAGES = {
      0: 'assets/cartas/00.gif',
      1: 'assets/cartas/01.gif',
      2: 'assets/cartas/02.gif',
      3: 'assets/cartas/03.gif',
      4: 'assets/cartas/04.gif',
      5: 'assets/cartas/05.gif',
      6: 'assets/cartas/06.gif',
      7: 'assets/cartas/07.gif',
      8: 'assets/cartas/08.gif',
      9: 'assets/cartas/09.gif',
      10: 'assets/cartas/10.gif',
      11: 'assets/cartas/11.gif',
      12: 'assets/cartas/12.gif',
      13: 'assets/cartas/13.gif',
      14: 'assets/cartas/14.gif',
      15: 'assets/cartas/15.gif',
      16: 'assets/cartas/16.gif',
      17: 'assets/cartas/17.gif',
      18: 'assets/cartas/18.gif',
      19: 'assets/cartas/19.gif',
      20: 'assets/cartas/20.gif',
      21: 'assets/cartas/21.gif',
    };

    /* ── State ── */
    let deck = [];
    let placedCards = [];

    function updateReshuffleButton() {
      document.getElementById('reshuffle-button').hidden = placedCards.length === 0;
    }

    /* ── Stars ── */
    function initStars() {
      const container = document.getElementById('stars');
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 150; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * 2.2 + 0.4;
        const delay = (Math.random() * 5).toFixed(2);
        const dur   = (2.5 + Math.random() * 4).toFixed(2);
        const op    = (0.08 + Math.random() * 0.72).toFixed(2);
        s.style.cssText = `width:${size}px;height:${size}px;top:${(Math.random()*100).toFixed(2)}%;left:${(Math.random()*100).toFixed(2)}%;--d:${dur}s;--o:${op};animation-delay:${delay}s;`;
        frag.appendChild(s);
      }
      container.appendChild(frag);
    }

    /* ── Deck ── */
    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function initDeck() {
      deck = shuffle([...ARCANA]);
      updateDeckUI();
    }

    function updateDeckUI() {
      const countEl = document.getElementById('deck-count');
      const hintEl  = document.getElementById('deck-hint');
      const stackEl = document.getElementById('deck-stack');
      const n = deck.length;
      countEl.textContent = n + (n === 1 ? ' carta' : ' cartas');
      if (n === 0) {
        stackEl.classList.add('empty');
        hintEl.textContent = 'Baralho esgotado';
        hintEl.style.animationPlayState = 'paused';
        hintEl.style.opacity = '0.4';
      } else {
        stackEl.classList.remove('empty');
        hintEl.textContent = 'Clique para revelar';
        hintEl.style.animationPlayState = 'running';
        hintEl.style.opacity = '';
      }
    }


    /* ── Casas ── */
    const housesModal = document.getElementById('houses-modal');
    const houseInputs = document.getElementById('house-inputs');
    const housesGrid = document.getElementById('houses-grid');

    function appendHouseInput() {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Nome da Casa';
      input.setAttribute('aria-label', 'Nome da casa ' + (houseInputs.children.length + 1));
      input.maxLength = 70;
      input.addEventListener('input', () => {
        const all = [...houseInputs.querySelectorAll('input')];
        if (all[all.length - 1] === input && input.value.trim()) appendHouseInput();
      });
      houseInputs.appendChild(input);
    }

    function openHousesModal() {
      houseInputs.replaceChildren();
      appendHouseInput();
      appendHouseInput();
      housesModal.hidden = false;
      houseInputs.querySelector('input').focus();
    }

    function closeHousesModal() {
      housesModal.hidden = true;
    }

    function createHouse(name) {
      const house = document.createElement('section');
      house.className = 'house';
      const title = document.createElement('h3');
      title.className = 'house-title';
      title.textContent = name;
      const remove = document.createElement('button');
      remove.className = 'house-remove';
      remove.type = 'button';
      remove.textContent = '×';
      remove.setAttribute('aria-label', 'Excluir ' + name);
      remove.addEventListener('click', () => {
        house.remove();
        updateReadingAreaHeight();
        if (!housesGrid.children.length && !placedCards.length) {
          document.getElementById('empty-state')?.classList.remove('hidden');
        }
      });
      house.append(title, remove);
      housesGrid.appendChild(house);
    }

    document.getElementById('open-houses').addEventListener('click', openHousesModal);
    document.getElementById('close-houses').addEventListener('click', closeHousesModal);
    housesModal.addEventListener('click', (event) => {
      if (event.target === housesModal) closeHousesModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !housesModal.hidden) closeHousesModal();
    });
    document.getElementById('houses-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const names = [...houseInputs.querySelectorAll('input')]
        .map(input => input.value.trim()).filter(Boolean);
      if (!names.length) {
        houseInputs.querySelector('input').focus();
        return;
      }
      names.forEach(createHouse);
      updateReadingAreaHeight();
      document.getElementById('empty-state')?.classList.add('hidden');
      closeHousesModal();
    });


    /* ── Botão flutuante mobile ── */
    const floatingDraw = document.getElementById('floating-draw');
    const mobileDrawQuery = window.matchMedia('(max-width: 600px)');
    const regularDraw = document.querySelector('.btn-draw');
    const deckStack = document.getElementById('deck-stack');

    function isOnScreen(element) {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 &&
        rect.bottom > 0 && rect.top < window.innerHeight &&
        rect.right > 0 && rect.left < window.innerWidth;
    }

    function updateFloatingDraw() {
      const show = mobileDrawQuery.matches && deck.length > 0 &&
        !isOnScreen(regularDraw) && !isOnScreen(deckStack);
      floatingDraw.classList.toggle('is-visible', show);
      floatingDraw.disabled = !show;
    }

    floatingDraw.addEventListener('click', () => {
      if (deck.length > 0) drawCard();
    });
    window.addEventListener('scroll', updateFloatingDraw, { passive: true });
    window.addEventListener('resize', updateFloatingDraw);
    mobileDrawQuery.addEventListener('change', updateFloatingDraw);

    /* Mantém o rodapé sempre após a última carta, mesmo sem Casas. */
    let isDraggingCard = false;
    function updateReadingAreaHeight() {
      if (isDraggingCard) return;
      const area = document.getElementById('reading-area');
      const grid = document.getElementById('houses-grid');
      const mobile = window.matchMedia('(max-width: 600px)').matches;
      const base = mobile ? 440 : 520;
      const gridBottom = grid.offsetTop + grid.offsetHeight + 20;
      const cardBottom = placedCards.reduce((max, card) => {
        if (!card.isConnected) return max;
        const top = parseFloat(card.style.top) || 0;
        const height = card.querySelector('.tarot-card')?.offsetHeight || (mobile ? 145 : 170);
        return Math.max(max, top + height + 52);
      }, 0);
      area.style.minHeight = Math.ceil(Math.max(base, gridBottom, cardBottom)) + 'px';
    }
    window.addEventListener('resize', updateReadingAreaHeight);

    /* ── Draw ── */
    function drawCard() {
      if (deck.length === 0) return;

      const card = deck.pop();
      updateDeckUI();
      updateFloatingDraw();

      const emptyState = document.getElementById('empty-state');
      if (emptyState) emptyState.classList.add('hidden');

      const area = document.getElementById('reading-area');
      const margin = 16;
      // Reserva espaço para a carta, rotação e legenda em cada tamanho de tela.
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      const cardWidth = isMobile ? 115 : 130;
      const cardHeight = isMobile ? 190 : 215;

      let areaRect = area.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Quando a área de leitura estiver abaixo da dobra, traga-a
      // para a tela antes de definir a posição da nova carta.
      const visibleTop = Math.max(areaRect.top, 0);
      const visibleBottom = Math.min(areaRect.bottom, viewportHeight);
      if (visibleBottom - visibleTop < Math.min(cardHeight + margin * 2, viewportHeight)) {
        window.scrollTo({
          top: window.scrollY + areaRect.top - margin,
          behavior: 'instant'
        });
        areaRect = area.getBoundingClientRect();
      }

      // Interseção entre a área de leitura e o viewport atual.
      // Posições são relativas à área, pois as cartas usam position:absolute.
      const minX = Math.max(margin, -areaRect.left + margin);
      const maxX = Math.min(
        area.clientWidth - cardWidth - margin,
        window.innerWidth - areaRect.left - cardWidth - margin
      );
      const minY = Math.max(margin, -areaRect.top + margin);
      const maxY = Math.min(
        area.clientHeight - cardHeight - margin,
        viewportHeight - areaRect.top - cardHeight - margin
      );
      // Prioriza o centro da região visível e evita cobrir as cartas existentes.
      // As posições usadas são relativas à área de leitura.
      const boundsX = [minX, Math.max(minX, maxX)];
      const boundsY = [minY, Math.max(minY, maxY)];
      const centerX = (boundsX[0] + boundsX[1]) / 2;
      const centerY = (boundsY[0] + boundsY[1]) / 2;
      const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
      const occupied = placedCards.map(el => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - areaRect.left,
          y: r.top - areaRect.top,
          w: r.width,
          h: r.height
        };
      });
      const overlap = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
        Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
      let best = { x: centerX, y: centerY, score: Infinity };
      for (let i = 0; i < 180; i++) {
        // Uma distribuição central com variações suficientes para ocupar espaços livres.
        const scale = i === 0 ? 0 : Math.min(1, Math.sqrt(i / 110));
        const candidateX = clamp(centerX + (Math.random() - 0.5) * (boundsX[1] - boundsX[0]) * 2 * scale, ...boundsX);
        const candidateY = clamp(centerY + (Math.random() - 0.5) * (boundsY[1] - boundsY[0]) * 2 * scale, ...boundsY);
        const box = { x: candidateX - 6, y: candidateY - 6, w: cardWidth, h: cardHeight };
        const covered = occupied.reduce((total, other) => total + overlap(box, other), 0);
        const distance = Math.hypot(
          (candidateX - centerX) / Math.max(1, boundsX[1] - boundsX[0]),
          (candidateY - centerY) / Math.max(1, boundsY[1] - boundsY[0])
        );
        const score = covered * 12 + distance * 180 + Math.random() * 5;
        if (score < best.score) best = { x: candidateX, y: candidateY, score };
      }
      const x = best.x;
      const y = best.y;
      const rot = (Math.random() - 0.5) * 18;

      const wrapper = document.createElement('div');
      wrapper.className = 'placed-card';
      wrapper.style.left      = x + 'px';
      wrapper.style.top       = y + 'px';
      wrapper.style.transform = `rotate(${rot}deg)`;
      wrapper.dataset.rot     = rot;
      wrapper.dataset.arcana = card.num;

      /* Card element */
      const cardEl = document.createElement('div');
      cardEl.className = 'tarot-card';
      cardEl.style.background = card.color;

      /* Try Rider-Waite image */
      const img = new Image();
      img.alt   = card.name;
      img.onload = () => {
        cardEl.innerHTML = '';
        cardEl.appendChild(img);
      };
      img.onerror = () => {
        /* Fallback illustrated card */
        cardEl.innerHTML = `
          <div class="card-fallback" style="background:${card.color};">
            <div class="fallback-glyph">${card.glyph}</div>
            <div class="fallback-name">${card.name}</div>
            <div class="fallback-num">${card.roman}</div>
          </div>`;
      };

      /* Show fallback immediately, replace when image loads */
      cardEl.innerHTML = `
        <div class="card-fallback" style="background:${card.color};">
          <div class="fallback-glyph">${card.glyph}</div>
          <div class="fallback-name">${card.name}</div>
          <div class="fallback-num">${card.roman}</div>
        </div>`;
      img.src = RW_IMAGES[card.num];

      /* Label */
      const label = document.createElement('div');
      label.className   = 'card-label';
      label.textContent = card.name;

      wrapper.appendChild(cardEl);
      wrapper.appendChild(label);
      area.appendChild(wrapper);

      makeDraggable(wrapper);
      placedCards.push(wrapper);
      updateReshuffleButton();
      updateReadingAreaHeight();
    }

    /* ── Interpretação do Arcano ── */
    const oracleModal = document.getElementById('oracle-modal');
    const oracleDialog = oracleModal.querySelector('.oracle-dialog');
    const oracleClose = document.getElementById('oracle-close');

    function openOracle(cardNumber) {
      const card = ARCANA[cardNumber];
      if (!card || !Array.isArray(ORACLE_QUESTIONS[cardNumber])) return;
      document.getElementById('oracle-title').textContent = card.name;
      document.getElementById('oracle-number').textContent = 'ARCANO ' + card.roman;
      const image = document.getElementById('oracle-image');
      image.src = RW_IMAGES[cardNumber];
      image.alt = 'Carta ' + card.name;
      const list = document.getElementById('oracle-list');
      list.replaceChildren();
      ORACLE_QUESTIONS[cardNumber].forEach(question => {
        const item = document.createElement('li');
        item.textContent = question;
        list.appendChild(item);
      });
      oracleModal.hidden = false;
      document.body.classList.add('oracle-open');
      oracleDialog.scrollTop = 0;
      oracleClose.focus();
    }
    function closeOracle() {
      oracleModal.hidden = true;
      document.body.classList.remove('oracle-open');
    }
    oracleClose.addEventListener('click', closeOracle);
    oracleModal.addEventListener('click', e => {
      if (e.target === oracleModal) closeOracle();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !oracleModal.hidden) closeOracle();
    });

    /* ── Arrastar e segurar: não abrir o popup após movimentar ── */
    function makeDraggable(el) {
      const HOLD_MS = 650;
      const MOVE_THRESHOLD = 8;
      let startX = 0, startY = 0, startL = 0, startT = 0;
      let dragging = false, moved = false, opened = false;
      let holdTimer = null;

      const clearHold = () => {
        if (holdTimer !== null) clearTimeout(holdTimer);
        holdTimer = null;
      };
      const point = event => {
        const src = event.touches ? event.touches[0] : event;
        return { x: src.clientX, y: src.clientY };
      };

      const onStart = event => {
        if (!oracleModal.hidden) return;
        if (event.type === 'mousedown' && event.button !== 0) return;
        if (event.touches && event.touches.length !== 1) return;
        event.preventDefault();
        const pos = point(event);
        startX = pos.x; startY = pos.y;
        startL = parseFloat(el.style.left) || 0;
        startT = parseFloat(el.style.top) || 0;
        dragging = true;
        moved = false;
        opened = false;
        isDraggingCard = true;
        updateReadingAreaHeight();
        placedCards.forEach(card => card.style.zIndex = 10);
        el.style.zIndex = 200;
        clearHold();
        holdTimer = setTimeout(() => {
          holdTimer = null;
          if (!dragging || moved) return;
          opened = true;
          dragging = false;
          isDraggingCard = false;
          el.classList.remove('dragging');
          el.style.zIndex = 10;
          openOracle(Number(el.dataset.arcana));
        }, HOLD_MS);
      };
      const onMove = event => {
        if (!dragging) return;
        if (event.touches && event.touches.length !== 1) {
          clearHold();
          return;
        }
        const pos = point(event);
        const dx = pos.x - startX, dy = pos.y - startY;
        if (!moved && Math.hypot(dx, dy) > MOVE_THRESHOLD) {
          moved = true;
          clearHold();
          el.classList.add('dragging');
        }
        if (!moved) return;
        event.preventDefault();
        el.style.left = (startL + dx) + 'px';
        el.style.top = (startT + dy) + 'px';
      };
      const onEnd = () => {
        clearHold();
        dragging = false;
        isDraggingCard = false;
        el.classList.remove('dragging');
        el.style.zIndex = 10;
        if (moved) updateReadingAreaHeight();
      };

      el.addEventListener('mousedown', onStart, { passive: false });
      el.addEventListener('touchstart', onStart, { passive: false });
      document.addEventListener('mousemove', onMove, { passive: false });
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchend', onEnd);
      document.addEventListener('touchcancel', onEnd);
      window.addEventListener('blur', onEnd);
    }

    /* ── Reshuffle ── */
    function reshuffleAll() {
      const overlay   = document.getElementById('shuffle-overlay');
      const animWrap  = document.getElementById('shuffle-anim');

      /* Build shuffle animation cards */
      const old = animWrap.querySelectorAll('.s-card');
      old.forEach(c => c.remove());

      for (let i = 0; i < 9; i++) {
        const c  = document.createElement('div');
        c.className = 's-card';
        const sr = ((Math.random() - 0.5) * 80).toFixed(1);
        const sx = ((Math.random() - 0.5) * 80).toFixed(1);
        const sy = ((Math.random() - 0.5) * 50).toFixed(1);
        const d  = (i * 0.07).toFixed(2);
        c.style.cssText = `--sr:${sr}deg;--sx:${sx}px;--sy:${sy}px;animation:s-anim 0.7s ${d}s ease-in-out infinite alternate;`;
        animWrap.appendChild(c);
      }

      overlay.classList.add('active');

      setTimeout(() => {
        /* Remove placed cards */
        const area = document.getElementById('reading-area');
        placedCards.forEach(el => { if (el.parentNode) el.parentNode.removeChild(el); });
        placedCards = [];
        updateReshuffleButton();
        updateReadingAreaHeight();

        const emptyState = document.getElementById('empty-state');
        if (emptyState) emptyState.classList.toggle('hidden', housesGrid.children.length > 0);

        initDeck();
        overlay.classList.remove('active');
      }, 2400);
    }

    /* ── Init ── */
    initStars();
    initDeck();
    updateReadingAreaHeight();
    updateReshuffleButton();
    updateFloatingDraw();

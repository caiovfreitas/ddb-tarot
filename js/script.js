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
    const pendingCardsZone = document.getElementById('pending-cards');
    const deckZone = document.querySelector('.deck-zone');
    function updateDeckZoneLayout() {
      deckZone.classList.toggle('no-houses', housesGrid.children.length === 0);
      positionPendingCards();
    }

    let nextHouseId = 0;

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
      house.dataset.houseId = String(++nextHouseId);
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
        updateDeckZoneLayout();
        positionCardsInHouses();
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
      updateDeckZoneLayout();
      positionCardsInHouses();
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

    /* Centraliza as cartas distribuídas automaticamente nas Casas.
       As cartas arrastadas manualmente deixam de acompanhar a Casa. */
    function positionCardsInHouses() {
      const area = document.getElementById('reading-area');
      const areaRect = area.getBoundingClientRect();
      placedCards.forEach(card => {
        const id = card.dataset.autoHouseId;
        if (!id) return;
        const house = [...housesGrid.children].find(item => item.dataset.houseId === id);
        if (!house) {
          delete card.dataset.autoHouseId;
          return;
        }
        const rect = house.getBoundingClientRect();
        const cardWidth = card.querySelector('.tarot-card')?.offsetWidth || 100;
        const cardHeight = card.querySelector('.tarot-card')?.offsetHeight || 170;
        card.style.left = (rect.left - areaRect.left + (rect.width - cardWidth) / 2) + 'px';
        card.style.top = (rect.top - areaRect.top + Math.max(60, (rect.height - cardHeight) / 2)) + 'px';
      });
    }

    /* Mantém uma pequena pilha de cartas excedentes à esquerda do deck. */
    function positionPendingCards() {
      const cards = [...pendingCardsZone.children];
      if (!cards.length) {
        pendingCardsZone.style.height = '';
        return;
      }
      const mobile = window.matchMedia('(max-width: 600px)').matches;
      const width = pendingCardsZone.clientWidth;
      const cardWidth = mobile ? 85 : 100;
      const cardHeight = mobile ? 145 : 170;
      const gap = mobile ? 64 : 73; // Sobreposição discreta, como cartas espalhadas à mão.
      const usable = Math.max(cardWidth, width - 20);
      const perRow = Math.max(1, Math.floor((usable - cardWidth) / gap) + 1);
      const lineHeight = cardHeight + 48;
      const rows = Math.ceil(cards.length / perRow);
      pendingCardsZone.style.height = (rows * lineHeight + 14) + 'px';

      cards.forEach((card, index) => {
        const row = Math.floor(index / perRow);
        const column = index % perRow;
        const countThisRow = Math.min(perRow, cards.length - row * perRow);
        const rowWidth = cardWidth + (countThisRow - 1) * gap;
        const baseX = Math.max(8, (width - rowWidth) / 2);
        // Deslocamentos consistentes: as cartas não mudam de inclinação a cada retirada.
        const swayX = [-5, 4, -3, 6, -4, 2, 5][index % 7];
        const swayY = [9, -3, 11, 2, -6, 7, 0][index % 7];
        const angle = [-8, 5, -4, 9, -6, 3, 7][index % 7];
        card.style.left = Math.max(2, baseX + column * gap + swayX) + 'px';
        card.style.top = (row * lineHeight + 12 + swayY) + 'px';
        card.style.transform = 'rotate(' + angle + 'deg)';
        card.dataset.rot = angle;
        card.style.zIndex = String(20 + index);
      });
    }

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
        if (!card.isConnected || card.parentElement !== area) return max;
        const top = parseFloat(card.style.top) || 0;
        const height = card.querySelector('.tarot-card')?.offsetHeight || (mobile ? 145 : 170);
        return Math.max(max, top + height + 52);
      }, 0);
      area.style.minHeight = Math.ceil(Math.max(base, gridBottom, cardBottom)) + 'px';
    }
    window.addEventListener('resize', () => {
      positionPendingCards();
      positionCardsInHouses();
      updateReadingAreaHeight();
    });

    /* ── Draw ── */
    function drawCard() {
      if (deck.length === 0) return;

      const card = deck.pop();
      updateDeckUI();
      updateFloatingDraw();

      const emptyState = document.getElementById('empty-state');
      if (emptyState) emptyState.classList.add('hidden');

      const area = document.getElementById('reading-area');
      const nextHouse = [...housesGrid.children].find(house => house.dataset.autoFilled !== 'true');
      // Sem Casas, as cartas também vão para a área de cartas espalhadas abaixo do baralho.
      const destination = nextHouse ? 'house' : 'pending';
      const x = 0, y = 0, rot = 0;

      const wrapper = document.createElement('div');
      wrapper.className = 'placed-card';
      wrapper.style.left      = x + 'px';
      wrapper.style.top       = y + 'px';
      wrapper.style.transform = `rotate(${rot}deg)`;
      wrapper.dataset.rot     = rot;

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

      if (destination === 'pending') {
        wrapper.classList.add('pending-card');
        pendingCardsZone.appendChild(wrapper);
        positionPendingCards();
      } else {
        area.appendChild(wrapper);
        if (nextHouse) {
          nextHouse.dataset.autoFilled = 'true';
          wrapper.dataset.autoHouseId = nextHouse.dataset.houseId;
        }
      }

      makeDraggable(wrapper);
      placedCards.push(wrapper);
      if (nextHouse) {
        positionCardsInHouses();
        nextHouse.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      updateReshuffleButton();
      updateReadingAreaHeight();
    }

    /* ── Arrastar cartas com mouse ou toque ── */
    function makeDraggable(el) {
      const MOVE_THRESHOLD = 8;
      let startX = 0, startY = 0, startL = 0, startT = 0;
      let dragging = false, moved = false;

      const point = event => {
        const src = event.touches ? event.touches[0] : event;
        return { x: src.clientX, y: src.clientY };
      };

      const onStart = event => {
        if (event.type === 'mousedown' && event.button !== 0) return;
        if (event.touches && event.touches.length !== 1) return;
        event.preventDefault();
        const pos = point(event);
        startX = pos.x; startY = pos.y;
        startL = parseFloat(el.style.left) || 0;
        startT = parseFloat(el.style.top) || 0;
        dragging = true;
        moved = false;
        isDraggingCard = true;
        placedCards.forEach(card => card.style.zIndex = 10);
        el.style.zIndex = 200;
      };
      const onMove = event => {
        if (!dragging) return;
        if (event.touches && event.touches.length !== 1) return;
        const pos = point(event);
        const dx = pos.x - startX, dy = pos.y - startY;
        if (!moved && Math.hypot(dx, dy) > MOVE_THRESHOLD) {
          moved = true;
          if (el.parentElement === pendingCardsZone) {
            const rect = el.getBoundingClientRect();
            const area = document.getElementById('reading-area');
            const areaRect = area.getBoundingClientRect();
            area.appendChild(el);
            el.classList.remove('pending-card');
            startL = rect.left - areaRect.left;
            startT = rect.top - areaRect.top;
            el.style.left = startL + 'px';
            el.style.top = startT + 'px';
            el.style.zIndex = 200;
            positionPendingCards();
          }
          delete el.dataset.autoHouseId;
          el.classList.add('dragging');
        }
        if (!moved) return;
        event.preventDefault();
        el.style.left = (startL + dx) + 'px';
        el.style.top = (startT + dy) + 'px';
      };
      const onEnd = () => {
        if (!dragging) return;
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
        [...housesGrid.children].forEach(house => delete house.dataset.autoFilled);
        positionPendingCards();
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
    updateDeckZoneLayout();
    updateReadingAreaHeight();
    updateReshuffleButton();
    updateFloatingDraw();

/* Validador de acesso por e-mail, conectado à função do Netlify. */
(() => {
  const form = document.getElementById('access-form');
  const emailInput = document.getElementById('access-email');
  const button = document.getElementById('access-submit');
  const feedback = document.getElementById('access-feedback');
  const endpoint = '/.netlify/functions/validar-email';

  /* Mantém as duas frases completas em exatamente duas linhas.
     Em celulares estreitos, reduz apenas essas frases, sem cortar conteúdo. */
  const fitTwoLines = (element) => {
    if (!element) return;
    const spans = Array.from(element.querySelectorAll('span'));
    if (spans.length !== 2) return;
    element.style.fontSize = '15px';
    for (let fontSize = 15; fontSize >= 6; fontSize -= 0.25) {
      element.style.fontSize = fontSize + 'px';
      if (spans.every(span => span.scrollWidth <= span.clientWidth + 1)) break;
    }
  };

  const resizeCopy = () => {
    fitTwoLines(document.querySelector('.access-description'));
    fitTwoLines(feedback);
  };
  window.addEventListener('resize', resizeCopy);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resizeCopy);
  }
  resizeCopy();


  const showFeedback = (message, state = 'error') => {
    feedback.replaceChildren();
    if (Array.isArray(message)) {
      message.forEach(line => {
        const span = document.createElement('span');
        span.textContent = line;
        feedback.appendChild(span);
      });
    } else {
      feedback.textContent = message;
    }
    feedback.dataset.state = state;
    fitTwoLines(feedback);
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    if (!emailInput.checkValidity() || !email) {
      emailInput.reportValidity();
      return;
    }

    button.disabled = true;
    button.textContent = 'Verificando...';
    showFeedback('Conferindo seu e-mail na lista de alunos...', 'info');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        cache: 'no-store'
      });
      const data = await response.json();

      if (!response.ok) {
        showFeedback(data.mensagem || 'Não foi possível verificar agora. Tente novamente.');
        return;
      }

      if (data.autorizado === true) {
        showFeedback('');
        document.body.classList.add('access-granted');
        document.getElementById('page').scrollIntoView({ block: 'start' });
      } else {
        showFeedback(['Ops! Não conseguimos localizar este e-mail.', 'Verifique o e-mail cadastrado na matrícula e tenta novamente.']);
      }
    } catch (error) {
      showFeedback('Não foi possível conectar ao validador. Tente novamente em instantes.');
    } finally {
      button.disabled = false;
      button.textContent = 'ACESSAR';
    }
  });
})();

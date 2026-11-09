/* Validador de acesso por e-mail, conectado à função do Netlify. */
(() => {
  const form = document.getElementById('access-form');
  const emailInput = document.getElementById('access-email');
  const button = document.getElementById('access-submit');
  const feedback = document.getElementById('access-feedback');
  const endpoint = '/.netlify/functions/validar-email';

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
        showFeedback(['E-mail não encontrado. Confira o e-mail usado', 'na matrícula e tente novamente.']);
      }
    } catch (error) {
      showFeedback('Não foi possível conectar ao validador. Tente novamente em instantes.');
    } finally {
      button.disabled = false;
      button.textContent = 'ACESSAR';
    }
  });
})();

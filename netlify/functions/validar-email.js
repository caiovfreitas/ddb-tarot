/* Função intermediária: mantém a consulta fora do navegador e evita CORS.
   Para trocar a base no futuro, atualize a implantação do Apps Script
   ou configure a variável GAS_VALIDATOR_URL no Netlify. */
const DEFAULT_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzFPhkQWLbKmXXuxoa5UQ32JpAwSj7PvIX_8FXS-szeG1t30astUxyvRmaPYzS7S6Sr/exec';

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
  const reply = (statusCode, payload) => ({
    statusCode, headers, body: JSON.stringify(payload)
  });

  if (event.httpMethod !== 'POST') {
    return reply(405, { autorizado: false, mensagem: 'Método não permitido.' });
  }

  let email;
  try {
    const body = JSON.parse(event.body || '{}');
    email = String(body.email || '').trim().toLowerCase();
  } catch {
    return reply(400, { autorizado: false, mensagem: 'Dados inválidos.' });
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply(400, { autorizado: false, mensagem: 'Informe um e-mail válido.' });
  }

  // Exceção única: acesso interno, independentemente da lista de alunos.
  if (email === 'admindeck@diariodabruxa.com.br') {
    return reply(200, { autorizado: true });
  }

  try {
    const response = await fetch(process.env.GAS_VALIDATOR_URL || DEFAULT_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      redirect: 'follow',
      signal: AbortSignal.timeout(12000)
    });

    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    if (typeof data.autorizado !== 'boolean') throw new Error('Resposta inválida do Apps Script');

    return reply(200, { autorizado: data.autorizado });
  } catch (error) {
    console.error('Falha ao validar e-mail via Apps Script:', error.message);
    return reply(502, {
      autorizado: false,
      mensagem: 'Validador indisponível no momento. Tente novamente.'
    });
  }
};

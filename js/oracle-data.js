/* Perguntas de reflexão adaptadas do Guia de Bolso — O Tarot como Oráculo Terapêutico, Pri Ferraz. */
const ORACLE_QUESTIONS = [
  [
    "Você vive “o aqui e o agora” ou está sempre pensando no passado ou no futuro?",
    "Você tem aproveitado a sua vida com prazer?",
    "Você faz aquilo que faz bem para você ou está constantemente preocupado em agradar as outras pessoas?",
    "Você vem se abrindo para novas aventuras e experiências na sua vida?",
    "A alegria vem sendo a sua companheira?",
    "Que pesos você precisa liberar da sua vida para que as últimas quatro respostas acima sejam “sim”?"
  ],
  [
    "Você vem realizando as suas metas ou costuma procrastinar até o último minuto?",
    "Você tem consciência do seu poder de liderança ou fica sempre esperando alguém lhe dizer o que deve fazer?",
    "O que falta para você dar o primeiro passo rumo ao que deseja na sua vida?",
    "Você acredita em si, no seu potencial e no seu sucesso?",
    "Em que aspectos ou situações da sua vida você precisa ser mais autoconfiante?",
    "Há alguém no seu dia a dia que costuma “atrasar” os seus planos de irem em frente?"
  ],
  [
    "Você confia em sua voz interior ou vive sempre pedindo a opinião dos outros?",
    "Você olha e analisa aquilo que sente ou passa por cima das próprias emoções “como se não tivesse acontecido nada”?",
    "Você sabe guardar para si aqueles pensamentos pessoais que não precisam ser compartilhados com ninguém?",
    "Você sabe silenciar quando necessário?",
    "Você busca se conectar espiritualmente?",
    "O que seu caminho e escolhas espirituais dizem sobre você?"
  ],
  [
    "Em que aspecto ou área da vida você se considera uma pessoa criativa?",
    "Qual é a coisa mais especial que você já criou na sua vida?",
    "O que você sonha em criar?",
    "Você costuma cuidar e nutrir aquilo que tem, ou depois de conquistar você parte para algo novo?",
    "Você acredita em seu próprio poder?",
    "O que faz de você uma pessoa poderosa?",
    "Como anda sua relação com o seu lado feminino?"
  ],
  [
    "Que áreas da sua vida precisam ser organizadas com mais estratégia?",
    "Você é uma pessoa resoluta ou costuma demorar demais dentro de problemas/situações desconfortáveis?",
    "Você realiza seus planos ou permanece muito tempo sonhando?",
    "O que você precisa para se tornar uma pessoa mais segura e autoconfiante?",
    "Você se comunica bem com os outros?",
    "Você sabe pedir coisas sem dar ordens autoritárias?"
  ],
  [
    "Você se abre para receber ajuda ou é apenas a pessoa que ajuda aos outros?",
    "Em que conhecimentos você precisa se aprofundar para utilizá-los melhor em seu dia a dia?",
    "Você está dentro de grupos de pessoas harmônicos com sua essência e com aquilo que você acredita?",
    "Quais são as suas maiores virtudes?",
    "Que virtudes você ainda gostaria de conquistar?",
    "Você se considera uma pessoa protegida espiritualmente?"
  ],
  [
    "Você sabe viver em companhia/trabalhar em parceria?",
    "Você é uma pessoa decidida e segura emocionalmente?",
    "Ultimamente, você vem guiando suas escolhas de forma emocional ou racional?",
    "Você respeita a individualidade de quem está perto de você?",
    "Você sente que sua individualidade é respeitada por aqueles ao seu redor?",
    "O que é o amor para você?"
  ],
  [
    "O que você mais deseja conquistar na sua vida neste momento?",
    "Que batalhas você precisa vencer para alcançar tudo o que quer?",
    "Que estímulos você gostaria de receber para melhorar a sua motivação no dia a dia?",
    "Você dá suas opiniões aos outros com convicção?",
    "Você sente que está andando devagar demais ou rápido demais na vida?",
    "Você é capaz de assumir todas as rédeas da sua vida para andar rumo aos seus objetivos?"
  ],
  [
    "Você tem controle sobre suas emoções ou elas controlam você?",
    "Que emoções internas suas você gostaria de ter mais domínio sobre?",
    "Você costuma se arrepender do que disse e/ou deixou de dizer?",
    "Você costuma se desesperar fácil e/ou desistir na primeira dificuldade?",
    "Em que áreas da sua vida você sente que pode trabalhar melhor a questão da perseverança?"
  ],
  [
    "Você sabe lidar bem com a solidão e a solitude?",
    "Você é capaz de encontrar suas próprias respostas internas por si só, sem consultar a opinião alheia?",
    "Você tem segurança do seu poder de discernimento e decisão no dia a dia?",
    "Você tem clareza sobre qual é o seu propósito de vida/missão no mundo?",
    "Você sente que está seguindo sua jornada pessoal ou vivendo o caminho que os outros querem que você siga?"
  ],
  [
    "Como você lida com surpresas e imprevistos do dia a dia?",
    "Você consegue aproveitar as oportunidades que surgem inesperadamente ou isso lhe dá uma sensação de desconforto?",
    "Você tem um dia a dia tão corrido ao ponto de sentir que às vezes está sendo “levado pela correnteza”?",
    "Dentro de um mês, você tem muitos altos e baixos ou consegue manter uma estabilidade emocional?",
    "Você sente que está andando para frente na sua vida?",
    "Você se considera uma pessoa de sorte? Por quê?"
  ],
  [
    "Você sabe ser imparcial, enxergando com igualdade os dois lados de uma mesma história?",
    "Você consegue identificar quem é verdadeiro com você no dia a dia e quem não é?",
    "Você aprende bem com seus erros do passado ou costuma repeti-los?",
    "Você acredita que “tudo o que vai volta” e nós colhemos o que plantamos?",
    "Você é uma pessoa justa, com os outros e consigo, no seu dia a dia?"
  ],
  [
    "Você tem suas prioridades de vida bem definidas neste momento?",
    "Você sabe ter foco no que realmente importa ou costuma se distrair/perder tempo com coisas menos relevantes?",
    "Você sabe esperar o momento certo com paciência ou toma atitudes impulsivas?",
    "De quais situações desconfortáveis na sua vida você gostaria de se livrar neste momento?",
    "Você observa bem o mundo ao seu redor para tomar atitudes sábias e estratégicas?",
    "Qual foi o maior sacrifício que você já teve que fazer na sua vida e em prol de quê ele foi cometido?"
  ],
  [
    "O que precisa ser finalizado de uma vez por todas na sua vida?",
    "Se você pudesse mudar algum aspecto interno da sua personalidade, o que seria?",
    "Que pessoas/relações não fazem bem a você no dia a dia?",
    "Na hora de fazer uma “faxina” na sua vida, por onde você começaria?"
  ],
  [
    "Você costuma assumir posturas muito radicais no seu dia a dia? (É “tudo ou nada”, “8 ou 80”, “para sempre ou nunca mais”?)",
    "Você sabe defender o seu ponto de vista com equilíbrio e ponderação?",
    "Você sabe ouvir as outras pessoas ao mesmo tempo que ouve a si mesmo?",
    "Você sabe andar pelo “caminho do meio”?",
    "O que você precisa na sua vida para viver em paz?",
    "Você sabe equilibrar o seu lado racional (sensatez) com seu lado emocional (desejos)?"
  ],
  [
    "Os seus desejos libertam ou escravizam você?",
    "Você se abre para sentir prazer na vida?",
    "Os prazeres que você tem hoje são momentos duradouros ou efêmeros?",
    "Você se importa muito com a imagem que os outros têm de você?",
    "Você já se prendeu em situações desconfortáveis apenas por medo de desagradar alguém?",
    "Você se considera uma pessoa ambiciosa? E vaidosa?"
  ],
  [
    "Qual foi a maior queda/desilusão que você já sofreu na vida?",
    "Você considera que essas quedas deixaram você mais forte ou mais frágil?",
    "Quem apoia você até nas situações mais difíceis?",
    "Como você levantou e se reconstruiu?"
  ],
  [
    "Qual é o seu maior sonho?",
    "Você acredita que vai realizá-lo? Já traçou um caminho rumo a ele?",
    "Você vive um dia a dia inspirador? Convive com pessoas inspiradoras?",
    "Que virtudes, qualidades e ambientes mais inspiram você no dia a dia?",
    "Você se considera uma pessoa otimista e/ou esperançosa? Por quê?"
  ],
  [
    "Você enxerga as coisas como realmente são ou costuma ver as situações piores do que realmente são?",
    "Você idealiza pessoas e relacionamentos, querendo ver o melhor lado de tudo, ou busca ver a realidade “doa a quem doer”?",
    "Em um ambiente hostil e competitivo, você assume o papel da “caça” ou do “caçador”?",
    "Você sabe se impor com autoconfiança quando necessário?",
    "Você segue sua intuição e instintos?",
    "Você evolui ao longo dos ciclos que percorre ou costuma cair sempre nas mesmas armadilhas?"
  ],
  [
    "Você comunica bem os seus talentos para o mundo?",
    "Você expressa suas ideias com autoconfiança?",
    "Você se abre para o sucesso e prosperidade?",
    "Você busca estar perto de quem valoriza tudo de bom que você tem?",
    "Você é uma pessoa clara e franca em suas opiniões?",
    "Onde está o seu maior brilho interior?",
    "O que você mais gosta em si?"
  ],
  [
    "Você se abre para o novo ou tem muito apego ao que já passou?",
    "O que e/ou quem você precisa perdoar para seguir em frente?",
    "Que traumas e mágoas do passado impedem você de ir em frente?",
    "O que você gostaria de dizer para quem já feriu os seus sentimentos um dia?"
  ],
  [
    "O que falta para você sentir que a sua vida está completa?",
    "Você acredita que todo o seu esforço será bem recompensado?",
    "Você é perseverante ou costuma desistir na primeira dificuldade?",
    "Você está caminhando rumo à realização dos seus sonhos e metas?"
  ]
];

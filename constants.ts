// --- DATA: DUCKS & OWNERS ---
// Adiciona ou remove itens do array para controlar a quantidade de patos na tela.
// { duckName: "nomePato", owner: "donoPato" },
export const STUDENT_DUCKS = [
  // 1º ANO DS
  { duckName: "Pato do Arrebatamento", owner: "Rebeka 1ºDS" },
  { duckName: "Tchurumelo", owner: "Aristides Neto 1ºDS" },
  { duckName: "Fergus", owner: "Isabelle 1ºDS" },
  { duckName: "Pêniswise", owner: "Jose Henrique Lima Duarte 1ºDS" },
  { duckName: "Bela Sulino", owner: "Sara Sulino 1ºDS" },
  { duckName: "Star ", owner: "Wanessa Pereira da Silva 1ºDS" },
  { duckName: "Um Cafetão Chamado Maciota", owner: "Mario 1ºDS" },
  { duckName: "Senhor Quacks", owner: "Pedro Henrique Inacio de Castro 1ºDS" },
  { duckName: "Sapatonis", owner: "Kyara 1ºDS" },
  { duckName: "Chinesa", owner: "Kauã 1ºDS" },
  { duckName: "Tetris", owner: "Luis Fernando Braga dos Santos 1ºDS" },
  { duckName: "Xibatinha", owner: "João Mateus 1ºDS" },
  { duckName: "Orion", owner: "Davyson Levi dos Santos Cordeiro 1ºDS" },
  { duckName: "José Ceverino Antônio de Albuquerque", owner: "Thaires Sousa Rodrigues 1ºDS" },
  { duckName: "Godofredo", owner: "Andre 1ºDS" },
  { duckName: "Cleitin", owner: "João Emanoel Alves da Silva 1ºDS" },
  { duckName: "Fodêncio", owner: "Caio Victor Barros Uchoa 1ºDS" },
  { duckName: "Judite", owner: "Lariany Duarte 1ºDS" },

  // 2º ANO DS
  { duckName: "Desgraçado Jr.", owner: "José Enzo Marinho Ramos 2ºDS" },
  { duckName: "Arrascaeta JR", owner: "Antonio Helder 2ºDS" },
  { duckName: "Bia", owner: "Francisco Tiago 2ºDS" },
  { duckName: "Bob Souza Gurgel", owner: "Anna Beatryz Gomes Gurgel 2ºDS" },
  { duckName: "Debug Bucetildes", owner: "Raven Teixeira Cruz 2ºDS" },
  { duckName: "Fofuxo Rodrigues Castro", owner: "Maria Eloisa 2ºDS" },
  { duckName: "Carne de Porco", owner: "Riquelme Ladislau da Silva 2ºDS" },
  { duckName: "ROBERTOOR (o amargurado)", owner: "Sophia Cordeiro 2ºDS" },
  { duckName: "Patonhão", owner: "Caio Breno Duarte Pires 2ºDS" },
  { duckName: "Zézinho Bernardo", owner: "Yasmin silva 2ºDS" },
  { duckName: "Pica Pau", owner: "Soraia 2ºDS" },
  { duckName: "José Patolino Barroso de Azevedo", owner: "Evelin Maria 2ºDS" },
  { duckName: "Bentinho", owner: "Ana Heloisa Gomes Angelo 2ºDS" },
  { duckName: "Guilherme", owner: "Felipe Freitas Rebouças 2ºDS" },
  { duckName: "Xerequinha", owner: "Carlos Alves 2ºDS" },
  { duckName: "Piroquinha", owner: "Rosiele Ferreira de Sousa 2ºDS" },
  { duckName: "Duckzilla", owner: "Gustavo Silva 2ºDS" },
  { duckName: "Besourinha", owner: "Francisco Davi do Nascimento 2ºDS" },
  { duckName: "Zeca Subtantivo ", owner: "Lívia Mota 2ºDS" },
  { duckName: "Conceição", owner: "Maria Lauriene Almeida Nascimento 2ºDS" },
  { duckName: "Jorginho J-hope", owner: "Beatriz Fernandes 2ºDS" },
  { duckName: "Zeca Doca", owner: "Gustavo Teixeira 2ºDS" },
  { duckName: "Heldinho", owner: "João Guilherme Lins Almeida" },
  { duckName: "Marío Claro", owner: "Vivian Maria Vaz" },

  // 3º ANO DS
  { duckName: "Kyle Crane", owner: "Jovêncio 3ºDS" },
  { duckName: "Petrucio", owner: "Alan Dyeison 3ºDS" },
  { duckName: "Sabuguinho", owner: "Ana Júlia Barros" },

  // 1º ANO REDES

  // 2º ANO REDES

];

// --- PARK LAYOUT CONFIGURATION ---
// Defines locations for environmental objects
// Coordinates are roughly percentages (0-100) or pixels if specified, but mapping happens in App/Component
export const PARK_LAYOUT = {
  TREES: [
    { x: 5, y: 10, scale: 1.0 },
    { x: 15, y: 15, scale: 1.2 },
    { x: 90, y: 5, scale: 0.9 },
    { x: 75, y: 20, scale: 1.0 },
    { x: 85, y: 45, scale: 1.1 }, // Middle right
    { x: 10, y: 50, scale: 1.0 }, // Middle left
  ]
};

export const PROGRAMMER_QUOTES = [
  // --- INFORMÁTICA BÁSICA ---
  "Ctrl+Shift+Esc abre o Gerenciador de Tarefas direto.",
  "Reiniciar o PC resolve 90% dos problemas misteriosos.",
  "Cuidado com o Caps Lock ligado na hora da senha!",
  "O arquivo corrompeu e não tenho backup.",
  "Saber formatar um PC é um superpoder no natal.",
  "Mousepad é essencial ou frescura?",
  "Alt+Tab salva vidas quando o chefe aparece.",
  "Olhe sua postura! A coluna não tem peça de reposição.",
  "Todo especialista começou sem saber clicar.",
  "Excluí a pasta System32 sem querer...",

  // --- LÓGICA DE PROGRAMAÇÃO ---
  "Teste de mesa economiza horas de dor de cabeça.",
  "Cuidado com loop infinito no 'enquanto'.",
  "Esqueci um ponto e vírgula e o código explodiu.",
  "Portugol é uma linguagem válida sim!",
  "Se compilou de primeira, desconfie, mas comemore.",
  "Divida o problema em partes menores (Dividir para Conquistar).",
  "Lógica é treino, ninguém nasce sabendo.",
  "Variável não declarada vai dar erro.",
  "O algoritmo entrou em loop e travou o navegador.",
  "Indentação não é estética, é sobrevivência.",

  // --- ARQUITETURA E MANUTENÇÃO ---
  "Pasta térmica é uma gota, não reboco de parede.",
  "Nunca toque na placa-mãe sem descarregar a estática.",
  "O PC bipou 3 vezes e a tela não ligou.",
  "AMD esquenta mais que Intel? Mito de 2010.",
  "Ressuscitar um PC antigo com SSD é satisfatório.",
  "Organize os cabos (Cable Management) para o ar fluir.",
  "Fonte genérica é uma bomba relógio.",
  "Entortei os pinos do processador...",
  "Hardware é o que você chuta, Software é o que você xinga.",
  "Limpe os filtros de poeira do gabinete regularmente.",

  // --- PROGRAMAÇÃO WEB ---
  "Use 'rem' em vez de 'px' para acessibilidade.",
  "Não esqueça do atributo 'alt' nas imagens.",
  "Centralizar uma div verticalmente...",
  "Bootstrap deixa todos os sites iguais.",
  "Ver seu site rodando no celular é mágico.",
  "Aprenda Flexbox e Grid, tables são passado.",
  "O Frontend é a vitrine do seu código.",
  "Funcionou no Chrome, mas quebrou no Safari.",
  "Evite usar '!important' no CSS.",
  "Inspecionar Elemento é seu melhor amigo no debug.",

  // --- ANÁLISE E PROJETO DE SISTEMAS ---
  "Gaste tempo no diagrama para não perder tempo no código.",
  "Requisito não funcional também é requisito!",
  "O cliente mudou todo o escopo na entrega.",
  "Quem documenta código é quem tem medo de esquecer (todos nós).",
  "Você traduz sonhos de usuários em realidade técnica.",
  "Diagrama de Caso de Uso ajuda a ver quem faz o quê.",
  "Um bom projeto evita refatoração dolorosa.",
  "O prazo acabou e o diagrama não bate com o código.",
  "Cuidado com o 'Scope Creep' (crescimento de escopo).",
  "Fale a língua do negócio, não só techês.",

  // --- BANCO DE DADOS ---
  "Indexe as colunas que você usa no WHERE.",
  "DELETE ou UPDATE sem WHERE é demissão.",
  "Dei DROP TABLE em produção...",
  "NoSQL não substitui SQL, eles se completam.",
  "Dados são o novo petróleo, cuide bem deles.",
  "Normalizar até a 3ª forma geralmente é suficiente.",
  "Uma query otimizada é arte.",
  "A migração falhou e corrompeu os dados.",
  "Sempre sanitize inputs para evitar SQL Injection.",
  "Faça backup. Faça backup agora.",

  // --- DESIGN (UI/UX) ---
  "Espaço em branco (respiro) ajuda na leitura.",
  "Contraste baixo torna seu app ilegível.",
  "O cliente pediu a logo maior e 'com mais tchan'.",
  "Design não é só deixar bonito, é funcionar bem.",
  "Uma boa interface não precisa de manual.",
  "Mantenha consistência nos botões e cores.",
  "Empatia pelo usuário é a base do UX.",
  "Comic Sans no título do projeto sério.",
  "Não confie que o usuário vai ler o texto de ajuda.",
  "Use hierarquia visual para guiar o olhar.",

  // --- PROGRAMAÇÃO ORIENTADA A OBJETOS (POO) ---
  "Prefira composição ao invés de herança excessiva.",
  "Cuidado com o alto acoplamento entre classes.",
  "NullPointerException: o erro de um bilhão de dólares.",
  "Java é verboso demais ou é explícito e seguro?",
  "Entender polimorfismo te dá superpoderes.",
  "Encapsule o que varia, mantenha estável o resto.",
  "Objetos são como peças de Lego inteligentes.",
  "Classe 'Deus' que faz tudo e tem 5 mil linhas.",
  "Construtores com 10 parâmetros são um sinal ruim.",
  "Programe para interfaces, não para implementações.",

  // --- SEGURANÇA DA INFORMAÇÃO ---
  "Ative Autenticação de Dois Fatores (2FA) em tudo.",
  "Senha '123456' é um convite para invasão.",
  "Vazou a chave da API no repositório público.",
  "O usuário é sempre o elo mais fraco da segurança.",
  "Você é o guardião dos dados dos usuários.",
  "Nunca confie no input do usuário (nunca!).",
  "Segurança se constrói em camadas.",
  "Fui vítima de Phishing no e-mail da empresa.",
  "Mantenha softwares e libs atualizados.",
  "HTTPS é o mínimo obrigatório hoje em dia.",

  // --- REDES DE COMPUTADORES ---
  "Ping 127.0.0.1 para ver se sua placa de rede tá viva.",
  "Cabo dobrado ou mal crimpado causa perda de pacote.",
  "O problema era DNS esse tempo todo...",
  "IPv6 vai pegar de verdade ou não?",
  "Conectar computadores é conectar pessoas.",
  "Entenda o Modelo OSI para saber onde está o erro.",
  "A nuvem é só o computador de outra pessoa.",
  "Loop na rede derrubou a internet da empresa.",
  "Wi-Fi aberto em aeroporto é perigoso.",
  "Use VPN em redes públicas.",

  // --- SISTEMAS EMBARCADOS ---
  "Resistor de Pull-up evita leituras flutuantes no botão.",
  "Cuidado para não inverter a polaridade e queimar tudo.",
  "O cheiro de componente queimado...",
  "Arduino é para protótipo, não produto final!",
  "Fazer um LED piscar é o 'Hello World' do hardware.",
  "Leia o Datasheet antes de ligar o componente.",
  "Você controla o mundo físico com código.",
  "O código só funciona com o cabo USB ligado.",
  "Memória RAM em microcontrolador acaba rápido.",
  "Debouncing via software salva botões ruins.",

  // --- DESENVOLVIMENTO DE APPS ---
  "Teste em dispositivo real, o emulador mente.",
  "Cuidado com o consumo de bateria do seu app.",
  "O app foi rejeitado na loja pela 5ª vez.",
  "Nativo vs Híbrido: a guerra infinita.",
  "Seu código vai estar no bolso das pessoas.",
  "Pense 'Offline First', nem sempre tem internet.",
  "Mobile é o computador principal de muita gente.",
  "O layout quebrou na tela pequena do iPhone Mini.",
  "Peça permissão antes de acessar câmera ou GPS.",
  "Otimize o tamanho do APK/IPA.",

  // --- QUALIDADE E TESTE DE SOFTWARE ---
  "Teste Unitário documenta como o código deve agir.",
  "'Na minha máquina funciona' não é desculpa válida.",
  "Bug crítico descoberto na sexta-feira às 17h.",
  "Quem deve testar, o QA ou o Desenvolvedor?",
  "Código bem testado te deixa dormir tranquilo.",
  "Teste os casos de borda (Edge Cases).",
  "Qualidade é cultura, não uma fase no final.",
  "Consertei um bug e apareceram mais três.",
  "100% de cobertura não garante zero bugs.",
  "Automatize testes repetitivos.",

  // --- GESTÃO DE STARTUPS ---
  "Valide a dor do cliente antes de construir a solução.",
  "Cuidado com o Burn Rate (queima de caixa).",
  "O investidor cancelou a reunião de aporte.",
  "Ideia não vale nada, execução é tudo.",
  "Erre rápido para aprender rápido (Fail Fast).",
  "MVP é Mínimo Produto Viável, não Mínimo Produto Vergonhoso.",
  "Você está construindo o futuro.",
  "Tivemos que 'pivotar' o projeto todo.",
  "Não se apaixone pela solução, ame o problema.",
  "Pitch de elevador tem que ser afiado.",

  // --- VIDA DE ESTUDANTE / GERAL ---
  "Beba água. Sério, pedra no rim dói.",
  "O prazo do Moodle fecha em 2 minutos!",
  "TCC atrasado e eu aqui vendo patos.",
  "Todo Sênior já foi um Júnior que não desistiu.",
  "A Síndrome do Impostor mente pra você.",
  "Café com açúcar ou sem açúcar?",
  "Aprenda a pesquisar no Google (e no StackOverflow).",
  "Salve o projeto. A luz pode acabar.",
  "Git conflict na branch main...",
  "Comente o código para o 'você' do futuro entender.",
  "Programar é o superpoder de criar coisas do zero."
];

export const DRAG_QUOTES = [
  "ME SOLTA, NÃO SOU MOUSE!",
  "Vou deletar seu banco de dados!",
  "Acesso Negado ao Pato!",
  "Vou hackear sua webcam!",
  "Socorro, um usuário final!",
  "Isso não estava no Jira!",
  "Rollback! Faz Rollback!",
  "Não fui eu que commitei isso!",
  "Vou abrir um ticket contra você!",
  "Chamando o Tech Lead...",
  "Violência no ambiente de dev!",
  "Vou derrubar a produção!",
  "Não me toques, sou Sênior!",
  "Erro 500: Pato Irritado",
  "Largue minha instância!",
  "Vou dar kill -9 em você!",
  "Sudo shutdown now!",
  "Permission Denied!",
  "Isso é assédio moral!",
  "Vou reclamar no sindicato dos bits!"
];

export const ATTACK_QUOTES = [
  "SAI DO MEU REPOSITÓRIO!",
  "SEGURA ESSE BUG!",
  "NULL POINTER NA TUA CARA!",
  "VOU DERRUBAR A PROD!",
  "FORMATANDO SEU HD...",
  "ERROR 404: PACIÊNCIA!",
  "VAI ESTUDAR LÓGICA!",
  "LARGUE O MOUSE AGORA!",
  "VOU TE HACKEAR!",
  "SEM BACKUP HOJE!",
  "ME DÁ CAFÉ AGORA!",
  "VOU APAGAR O DROP TABLE!",
  "COMPILE ERROR!",
  "VOCÊ NÃO PASSA NO TESTE UNITÁRIO!",
  "INFINITE LOOP!",
  "STACK OVERFLOW!",
  "BLUE SCREEN OF DEATH!"
];

export const RUN_QUOTES = [
  "Deploy na Sexta? Tô fora!",
  "Vazando memória!",
  "Fugindo do Gerente de Projeto!",
  "O prazo estourou, corre!",
  "Indo pro Café!",
  "Compilando em segundo plano...",
  "Não me pergunte de CSS!",
  "Git Reset --Hard e corre!",
  "Indo ler a documentação (mentira)...",
  "Fui contratado pelo Google (sonho)"
];

export const INTERVAL_MS = 30;
export const SPEECH_DURATION_TICKS = 2000; // ~60 seconds
export const WALK_SPEED = 0.1; 
export const RUN_SPEED = 0.4;  
export const FLY_SPEED = 0.6;  
export const PROXIMITY_THRESHOLD = 80;
CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    data_evento DATE NOT NULL,
    horario TIME NULL,
    local VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO eventos (titulo, categoria, data_evento, horario, local, descricao, imagem) VALUES
(
    'Feira do Livro de São Paulo',
    'Feira',
    '2026-11-14',
    '10:00:00',
    'Pavilhão de Exposições do Anhembi, São Paulo - SP',
    'Uma das maiores feiras literárias da região, com mais de 100 estandes de editoras, sebos e livrarias independentes. Descontos de até 70% e sessões de autógrafos ao longo do dia.',
    '/img/feira-livro-sp.jpg'
),
(
    'Lançamento: "Memórias de Papel"',
    'Lançamento',
    '2026-11-07',
    '19:30:00',
    'Livraria Cultura - Shopping Pátio Paulista, São Paulo - SP',
    'Noite de lançamento do novo romance da autora Helena Marques, com bate-papo, leitura de trechos e sessão de autógrafos. Entrada gratuita.',
    '/img/memorias-de-papel.jpg'
),
(
    'Clube do Livro: Ficção Brasileira Contemporânea',
    'Clube do Livro',
    '2026-11-10',
    '20:00:00',
    'Biblioteca Municipal de Santo André - SP',
    'Encontro mensal do clube para discutir o livro do mês. Aberto a novos participantes, basta ler a obra e levar sua opinião. Café por conta da casa.',
    '/img/clube-livro.jpg'
),
(
    'Oficina de Escrita Criativa',
    'Oficina',
    '2026-11-21',
    '14:00:00',
    'Casa das Rosas, Av. Paulista, São Paulo - SP',
    'Oficina prática de quatro horas com foco em construção de personagens e narrativa. Vagas limitadas a 25 participantes. Inscrição prévia obrigatória.',
    '/img/ficcao-cientifica.jpg'
),
(
    'Sarau Poético na Praça',
    'Sarau',
    '2026-11-15',
    '16:00:00',
    'Praça do Carmo, Santo André - SP',
    'Tarde de poesia ao ar livre com microfone aberto. Traga seus poemas ou apenas venha ouvir. Evento gratuito e para todas as idades.',
    '/img/sarau-poetico.jpg'
),
(
    'Bate-papo com Autores Independentes',
    'Palestra',
    '2026-12-05',
    '15:00:00',
    'Espaço Cultural Villa-Lobos, São Paulo - SP',
    'Mesa-redonda com cinco autores independentes sobre autopublicação, divulgação e o mercado editorial atual. Haverá espaço para perguntas do público.',
	null
),
(
    'Hora do Conto Infantil',
    'Infantil',
    '2026-11-22',
    '10:30:00',
    'Biblioteca Infantojuvenil Monteiro Lobato, São Paulo - SP',
    'Contação de histórias para crianças de 4 a 10 anos, com fantoches e atividades de desenho. Os pais podem acompanhar.',
    '/img/hora-do-conto.jpg'
),
(
    'Feira de Troca de Livros',
    'Feira',
    '2026-12-12',
    NULL,
    'Parque Celso Daniel, Santo André - SP',
    'Leve os livros que já leu e troque por outros. Sem dinheiro envolvido, só amor pela leitura. O horário é livre durante o dia.',
    '/img/troca-livros.jpg'
),
(
    'Noite de Autógrafos: Ficção Científica',
    'Lançamento',
    '2026-10-20',
    '18:00:00',
    'Livraria da Vila - Vila Madalena, São Paulo - SP',
    'Evento já realizado, útil para testar a exibição de eventos passados. Lançamento de coletânea de contos de ficção científica nacional.',
    '/img/ficcao-cientifica.jpg'
),
(
    'Maratona de Leitura 24h',
    'Maratona',
    '2026-12-19',
    '09:00:00',
    'Biblioteca de São Paulo (Parque da Juventude), São Paulo - SP',
    'Uma maratona de leitura coletiva com pausas para lanches, trocas de recomendação e sorteio de livros entre os participantes.',
    '/img/maratona-leitura.jpg'
);
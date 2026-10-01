/* Catálogo demonstrativo montado a partir das capas fornecidas em assets/img/. */
const produtos = Object.freeze([
  { id: 'biblia-cores', titulo: 'A Bíblia das Cores', categoria: 'Design', preco: 39.9, imagem: 'a-biblia-das-cores.jpeg' },
  { id: 'biblia-design', titulo: 'A Bíblia do Design Gráfico', categoria: 'Design', preco: 44.9, imagem: 'a-biblia-do-design-grafico.jpeg' },
  { id: 'menina-livros', titulo: 'A Menina que Roubava Livros', categoria: 'Ficção', preco: 34.9, imagem: 'a-menina-que-roubava-livros.jpeg' },
  { id: 'ultima-carta', titulo: 'A Última Carta', categoria: 'Ficção', preco: 32.9, imagem: 'a-ultima-carta.jpeg' },
  { id: 'algoritmos-logica', titulo: 'Algoritmos e Lógica de Programação', categoria: 'Programação', preco: 42.9, imagem: 'algoritmos-e-logica-de-programacao.jpeg' },
  { id: 'analise-tecnica', titulo: 'Análise Técnica do Mercado Financeiro', categoria: 'Negócios e Finanças', preco: 49.9, imagem: 'analise-tecnica-do-mercado-financeiro.jpeg' },
  { id: 'arquitetura-limpa', titulo: 'Arquitetura Limpa', categoria: 'Programação', preco: 54.9, imagem: 'arquitetura-limpa.jpeg' },
  { id: 'heroinas', titulo: 'As Heroínas', categoria: 'Ficção', preco: 36.9, imagem: 'as-heroinas.jpeg' },
  { id: 'bons-tempos', titulo: 'Bons Tempos', categoria: 'Ficção', preco: 33.9, imagem: 'bons-tempos.jpeg' },
  { id: 'identidade-marca', titulo: 'Design de Identidade da Marca', categoria: 'Design', preco: 45.9, imagem: 'design-de-identidade-da-marca.jpeg' },
  { id: 'habitos-atomicos', titulo: 'Hábitos Atômicos', categoria: 'Desenvolvimento Pessoal', preco: 38.9, imagem: 'habitos-atomicos.jpeg' },
  { id: 'inteligencia-emocional', titulo: 'Inteligência Emocional', categoria: 'Desenvolvimento Pessoal', preco: 35.9, imagem: 'inteligencia-emocional.jpeg' },
  { id: 'magos-hedge', titulo: 'Magos do Mercado: Hedge Funds', categoria: 'Negócios e Finanças', preco: 43.9, imagem: 'magos-do-mercado-hedge-funds.jpeg' },
  { id: 'marcas-design', titulo: 'Marcas: Design Estratégico', categoria: 'Design', preco: 47.9, imagem: 'marcas-design-estrategico.jpeg' },
  { id: 'primeiro-programacao', titulo: 'Meu Primeiro Livro de Programação', categoria: 'Programação', preco: 29.9, imagem: 'meu-primeiro-livro-de-programacao.jpeg' },
  { id: 'mindset', titulo: 'Mindset', categoria: 'Desenvolvimento Pessoal', preco: 37.9, imagem: 'mindset.jpeg' },
  { id: 'poder-habito', titulo: 'O Poder do Hábito', categoria: 'Desenvolvimento Pessoal', preco: 36.9, imagem: 'o-poder-do-habito.jpeg' },
  { id: 'programador-pragmatico', titulo: 'O Programador Pragmático', categoria: 'Programação', preco: 52.9, imagem: 'o-programador-pragmatico.jpeg' },
  { id: 'grandes-magos', titulo: 'Os Grandes Magos do Mercado Financeiro', categoria: 'Negócios e Finanças', preco: 44.9, imagem: 'os-grandes-magos-do-mercado-financeiro.jpeg' },
  { id: 'magos-desconhecidos', titulo: 'Os Magos Desconhecidos do Mercado Financeiro', categoria: 'Negócios e Finanças', preco: 42.9, imagem: 'os-magos-desconhecidos-do-mercado-financeiro.jpeg' },
  { id: 'pai-rico', titulo: 'Pai Rico, Pai Pobre', categoria: 'Negócios e Finanças', preco: 35.9, imagem: 'pai-rico-pai-pobre.jpeg' },
  { id: 'processo-design', titulo: 'Processo de Criação em Design Gráfico', categoria: 'Design', preco: 41.9, imagem: 'processo-de-criacao-em-design-grafico.jpeg' },
  { id: 'python-completo', titulo: 'Python: Curso Completo', categoria: 'Programação', preco: 48.9, imagem: 'python-curso-completo.jpeg' },
  { id: 'quem-pensa', titulo: 'Quem Pensa Enriquece', categoria: 'Desenvolvimento Pessoal', preco: 34.9, imagem: 'quem-pensa-enriquece.jpeg' },
  { id: 'querido-john', titulo: 'Querido John', categoria: 'Ficção', preco: 31.9, imagem: 'querido-john.jpeg' }
].map(produto => Object.freeze(produto)));

const catalogoLume = Object.freeze({
  produtos,
  porId: new Map(produtos.map(produto => [produto.id, produto])),
  categorias: Object.freeze([...new Set(produtos.map(produto => produto.categoria))]),
  formatarPreco: valor => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
});

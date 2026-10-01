/* Interações das duas páginas, sem dependências ou etapa de compilação. */
(() => {
  const { produtos, categorias, formatarPreco } = catalogoLume;
  const criar = (tag, classe, texto) => {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
  };
  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const totalDosItens = itens => itens.reduce((total, item) => total + item.preco * item.quantidade, 0);

  function iniciarTema() {
    let preferencia;
    try { preferencia = localStorage.getItem('lume-livros:tema'); } catch { /* Usa preferência do sistema. */ }
    const temaInicial = preferencia === 'claro' || preferencia === 'escuro'
      ? preferencia
      : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro');

    function aplicarTema(tema) {
      document.documentElement.dataset.tema = tema;
      document.querySelectorAll('[data-alternar-tema]').forEach(botao => {
        botao.setAttribute('aria-label', tema === 'claro' ? 'Ativar modo escuro' : 'Ativar modo claro');
        botao.querySelector('[data-icone-tema]').textContent = tema === 'claro' ? '☾' : '☀';
      });
      document.querySelector('meta[name="theme-color"]').content = tema === 'claro' ? '#f7f3eb' : '#171917';
    }

    aplicarTema(temaInicial);
    document.querySelectorAll('[data-alternar-tema]').forEach(botao => botao.addEventListener('click', () => {
      const novoTema = document.documentElement.dataset.tema === 'claro' ? 'escuro' : 'claro';
      aplicarTema(novoTema);
      try { localStorage.setItem('lume-livros:tema', novoTema); } catch { /* Preferência vale nesta página. */ }
    }));
  }

  function atualizarContagem() {
    const quantidade = carrinhoLume.obterItens().reduce((total, item) => total + item.quantidade, 0);
    document.querySelectorAll('[data-contagem-carrinho]').forEach(elemento => { elemento.textContent = quantidade; });
    document.querySelectorAll('[data-abrir-carrinho]').forEach(botao => {
      botao.setAttribute('aria-label', `Abrir carrinho, ${quantidade} ${quantidade === 1 ? 'item' : 'itens'}`);
    });
  }

  function iniciarCatalogo() {
    const grade = document.getElementById('grade-produtos');
    const filtros = document.getElementById('filtros');
    const pesquisa = document.getElementById('pesquisa');
    const vazio = document.getElementById('busca-vazia');
    const contagem = document.getElementById('contagem-resultados');
    let categoriaAtual = 'Todos';

    function renderizarFiltros() {
      filtros.replaceChildren();
      for (const categoria of ['Todos', ...categorias]) {
        const botao = criar('button', 'filtro', categoria);
        botao.type = 'button';
        botao.setAttribute('aria-pressed', String(categoria === categoriaAtual));
        botao.addEventListener('click', () => {
          categoriaAtual = categoria;
          renderizarFiltros();
          renderizarProdutos();
        });
        filtros.append(botao);
      }
    }

    function criarCard(produto) {
      const artigo = criar('article', 'card-produto');
      const areaImagem = criar('div', 'card-imagem');
      const imagem = criar('img');
      imagem.src = `assets/img/${produto.imagem}`;
      imagem.alt = `Capa de ${produto.titulo}`;
      imagem.loading = 'lazy';
      imagem.decoding = 'async';
      areaImagem.append(imagem);

      const conteudo = criar('div', 'card-conteudo');
      conteudo.append(criar('p', 'card-categoria', produto.categoria));
      conteudo.append(criar('h3', 'card-titulo', produto.titulo));
      const base = criar('div', 'card-base');
      base.append(criar('strong', 'card-preco', formatarPreco(produto.preco)));
      const botao = criar('button', 'card-adicionar', 'Adicionar +');
      botao.type = 'button';
      botao.setAttribute('aria-label', `Adicionar ${produto.titulo} ao carrinho`);
      botao.addEventListener('click', () => {
        carrinhoLume.adicionar(produto.id);
        notificar(`${produto.titulo} adicionado ao carrinho.`);
      });
      base.append(botao);
      conteudo.append(base);
      artigo.append(areaImagem, conteudo);
      return artigo;
    }

    function renderizarProdutos() {
      const termo = normalizar(pesquisa.value.trim());
      const encontrados = produtos.filter(produto =>
        (categoriaAtual === 'Todos' || produto.categoria === categoriaAtual) &&
        normalizar(produto.titulo).includes(termo)
      );
      grade.replaceChildren(...encontrados.map(criarCard));
      vazio.hidden = encontrados.length > 0;
      contagem.textContent = `${encontrados.length} ${encontrados.length === 1 ? 'livro encontrado' : 'livros encontrados'}`;
    }

    pesquisa.addEventListener('input', renderizarProdutos);
    document.getElementById('limpar-filtros').addEventListener('click', () => {
      categoriaAtual = 'Todos';
      pesquisa.value = '';
      renderizarFiltros();
      renderizarProdutos();
      pesquisa.focus();
    });
    renderizarFiltros();
    renderizarProdutos();
  }

  let temporizadorNotificacao;
  function notificar(mensagem) {
    const notificacao = document.getElementById('notificacao');
    if (!notificacao) return;
    notificacao.textContent = mensagem;
    notificacao.hidden = false;
    clearTimeout(temporizadorNotificacao);
    temporizadorNotificacao = setTimeout(() => { notificacao.hidden = true; }, 3200);
  }

  function iniciarCarrinho() {
    const dialogo = document.getElementById('dialogo-carrinho');
    const lista = document.getElementById('carrinho-lista');
    const rodape = document.getElementById('carrinho-rodape');

    function renderizarCarrinho() {
      const itens = carrinhoLume.obterItens();
      lista.replaceChildren();
      rodape.hidden = itens.length === 0;

      if (itens.length === 0) {
        const vazio = criar('div', 'carrinho-vazio');
        vazio.append(criar('span', 'carrinho-vazio-simbolo', '✳'));
        vazio.append(criar('h3', '', 'Seu carrinho está vazio'));
        vazio.append(criar('p', '', 'Que tal encontrar sua próxima leitura?'));
        const explorar = criar('a', 'botao-secundario', 'Explorar livros');
        explorar.href = '#catalogo';
        explorar.addEventListener('click', () => dialogo.close());
        vazio.append(explorar);
        lista.append(vazio);
        return;
      }

      for (const item of itens) {
        const linha = criar('div', 'item-carrinho');
        const imagem = criar('img');
        imagem.src = `assets/img/${item.imagem}`;
        imagem.alt = `Capa de ${item.titulo}`;
        const detalhes = criar('div', 'item-detalhes');
        detalhes.append(criar('p', 'item-categoria', item.categoria));
        detalhes.append(criar('h3', '', item.titulo));
        detalhes.append(criar('strong', '', formatarPreco(item.preco * item.quantidade)));

        const controles = criar('div', 'item-controles');
        const menos = criar('button', '', '−');
        menos.type = 'button';
        menos.setAttribute('aria-label', `Diminuir quantidade de ${item.titulo}`);
        menos.addEventListener('click', () => carrinhoLume.alterarQuantidade(item.id, item.quantidade - 1));
        const quantidade = criar('span', '', String(item.quantidade));
        quantidade.setAttribute('aria-label', `Quantidade: ${item.quantidade}`);
        const mais = criar('button', '', '+');
        mais.type = 'button';
        mais.disabled = item.quantidade >= 99;
        mais.setAttribute('aria-label', `Aumentar quantidade de ${item.titulo}`);
        mais.addEventListener('click', () => carrinhoLume.alterarQuantidade(item.id, item.quantidade + 1));
        controles.append(menos, quantidade, mais);
        const remover = criar('button', 'item-remover', 'Remover');
        remover.type = 'button';
        remover.setAttribute('aria-label', `Remover ${item.titulo} do carrinho`);
        remover.addEventListener('click', () => carrinhoLume.remover(item.id));
        detalhes.append(controles, remover);
        linha.append(imagem, detalhes);
        lista.append(linha);
      }
      document.getElementById('carrinho-total').textContent = formatarPreco(totalDosItens(itens));
    }

    document.querySelector('[data-abrir-carrinho]').addEventListener('click', () => {
      renderizarCarrinho();
      dialogo.showModal();
    });
    document.querySelector('[data-fechar-carrinho]').addEventListener('click', () => dialogo.close());
    dialogo.addEventListener('click', evento => {
      const limites = dialogo.getBoundingClientRect();
      const foraDoPainel = evento.clientX < limites.left || evento.clientX > limites.right ||
        evento.clientY < limites.top || evento.clientY > limites.bottom;
      if (evento.target === dialogo && foraDoPainel) dialogo.close();
    });
    window.addEventListener('lume:carrinho-atualizado', renderizarCarrinho);
  }

  function iniciarCheckout() {
    const resumo = document.getElementById('resumo-itens');
    const formulario = document.getElementById('formulario-checkout');
    const erroGeral = document.getElementById('erro-checkout');
    const concluir = document.getElementById('concluir-pedido');
    const campos = ['nome', 'email', 'pagamento'].map(id => document.getElementById(id));
    let pedidoConcluido = false;

    function renderizarResumo() {
      if (pedidoConcluido) return;
      const itens = carrinhoLume.obterItens();
      resumo.replaceChildren();
      concluir.disabled = itens.length === 0;
      if (itens.length === 0) {
        const vazio = criar('div', 'resumo-vazio');
        vazio.append(criar('p', '', 'Seu carrinho está vazio.'));
        const link = criar('a', '', 'Explorar livros →');
        link.href = 'index.html#catalogo';
        vazio.append(link);
        resumo.append(vazio);
      } else {
        for (const item of itens) {
          const linha = criar('div', 'resumo-item');
          const imagem = criar('img');
          imagem.src = `assets/img/${item.imagem}`;
          imagem.alt = `Capa de ${item.titulo}`;
          const texto = criar('div');
          texto.append(criar('h3', '', item.titulo));
          texto.append(criar('p', '', `Quantidade: ${item.quantidade}`));
          linha.append(imagem, texto, criar('strong', '', formatarPreco(item.preco * item.quantidade)));
          resumo.append(linha);
        }
      }
      document.getElementById('resumo-total').textContent = formatarPreco(totalDosItens(itens));
    }

    function validarCampo(campo) {
      let mensagem = '';
      if (!campo.value.trim()) mensagem = 'Este campo é obrigatório.';
      else if (campo.type === 'email' && campo.validity.typeMismatch) mensagem = 'Digite um e-mail válido.';
      campo.setAttribute('aria-invalid', String(Boolean(mensagem)));
      document.getElementById(`erro-${campo.id}`).textContent = mensagem;
      return !mensagem;
    }

    campos.forEach(campo => {
      campo.addEventListener(campo.tagName === 'SELECT' ? 'change' : 'input', () => {
        if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
      });
    });

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();
      const resultados = campos.map(validarCampo);
      const primeiroInvalido = campos[resultados.indexOf(false)];
      if (primeiroInvalido) {
        primeiroInvalido.focus();
        return;
      }
      if (carrinhoLume.obterItens().length === 0) {
        erroGeral.textContent = 'Adicione ao menos um livro antes de concluir.';
        erroGeral.hidden = false;
        return;
      }
      erroGeral.hidden = true;
      pedidoConcluido = true;
      carrinhoLume.limpar();
      formulario.hidden = true;
      const sucesso = document.getElementById('sucesso-checkout');
      sucesso.hidden = false;
      sucesso.focus();
    });

    window.addEventListener('lume:carrinho-atualizado', renderizarResumo);
    renderizarResumo();
  }

  iniciarTema();
  atualizarContagem();
  window.addEventListener('lume:carrinho-atualizado', atualizarContagem);
  if (document.body.dataset.pagina === 'inicio') {
    iniciarCatalogo();
    iniciarCarrinho();
  } else if (document.body.dataset.pagina === 'checkout') {
    iniciarCheckout();
  }
})();

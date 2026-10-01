/* O armazenamento guarda somente IDs e quantidades; preços vêm do catálogo atual. */
const carrinhoLume = (() => {
  const chave = 'lume-livros:carrinho:v1';
  let itens = carregar();

  function carregar() {
    try {
      const salvos = JSON.parse(localStorage.getItem(chave) || '[]');
      if (!Array.isArray(salvos)) return [];
      return salvos.filter(item =>
        item && catalogoLume.porId.has(item.id) &&
        Number.isInteger(item.quantidade) && item.quantidade >= 1 && item.quantidade <= 99
      ).map(item => ({ id: item.id, quantidade: item.quantidade }));
    } catch {
      return [];
    }
  }

  function salvar() {
    try {
      localStorage.setItem(chave, JSON.stringify(itens));
    } catch {
      // O carrinho continua funcionando durante a sessão se o navegador bloquear o armazenamento.
    }
    window.dispatchEvent(new Event('lume:carrinho-atualizado'));
  }

  function obterItens() {
    return itens.map(item => ({
      ...catalogoLume.porId.get(item.id),
      quantidade: item.quantidade
    }));
  }

  function adicionar(id) {
    if (!catalogoLume.porId.has(id)) return;
    const item = itens.find(atual => atual.id === id);
    if (item) {
      item.quantidade = Math.min(99, item.quantidade + 1);
    } else {
      itens.push({ id, quantidade: 1 });
    }
    salvar();
  }

  function alterarQuantidade(id, quantidade) {
    if (!catalogoLume.porId.has(id) || !Number.isInteger(quantidade)) return;
    if (quantidade <= 0) {
      itens = itens.filter(item => item.id !== id);
    } else {
      const item = itens.find(atual => atual.id === id);
      if (!item) return;
      item.quantidade = Math.min(99, quantidade);
    }
    salvar();
  }

  function remover(id) {
    const quantidadeAnterior = itens.length;
    itens = itens.filter(item => item.id !== id);
    if (itens.length !== quantidadeAnterior) salvar();
  }

  function limpar() {
    itens = [];
    salvar();
  }

  return Object.freeze({ obterItens, adicionar, alterarQuantidade, remover, limpar });
})();

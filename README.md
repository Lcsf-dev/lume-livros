# 📚 Lume Livros

O projeto demonstra a experiência de explorar o catálogo, montar um carrinho e concluir um pedido simulado no navegador. Os preços são ilustrativos; nenhuma cobrança ou entrega de arquivo digital é realizada.

## ✨ Funcionalidades

- Catálogo carregado por JavaScript, com pesquisa por título a cada tecla e filtros por categoria.
- Carrinho com adição, alteração de quantidade, remoção e total atualizado em tempo real.
- Persistência do carrinho em `localStorage`, inclusive após atualizar a página.
- Mensagens para busca sem resultados e carrinho vazio.
- Modo claro e escuro com preferência salva no navegador.
- Checkout demonstrativo com validação de nome, e-mail e método de pagamento.
- Layout responsivo para celular, tablet e computador, com HTML semântico e rótulos nos campos.

## 🛠️ Tecnologias

- **HTML5:** estrutura semântica das páginas.
- **CSS3:** estilos, paleta de cores, temas e responsividade.
- **JavaScript puro:** catálogo, busca, filtros, carrinho e validação do checkout.
- **localStorage:** armazenamento local do carrinho e da preferência de tema.

Não há dependências, etapa de compilação ou serviço de pagamento.

## ▶️ Como executar

1. No terminal, dentro da pasta do projeto, inicie um servidor local para que o navegador mantenha o carrinho de forma consistente:

   ```sh
   python -m http.server 8765
   ```

2. Acesse `http://localhost:8765/` no navegador.
3. Para testar o checkout, adicione um livro ao carrinho e escolha **Ir para o checkout**.

## 🗂️ Estrutura do projeto

- `index.html`: vitrine, busca, filtros e carrinho.
- `checkout.html`: formulário e resumo do pedido.
- `css/style.css` e `css/responsive.css`: aparência e adaptação às telas.
- `js/products.js`: dados dos 25 títulos e categorias.
- `js/cart.js`: operações do carrinho e persistência local.
- `js/main.js`: interface, filtros, tema e validação.
- `assets/img/`: capas fornecidas pelo usuário.
- `assets/icons/`: ícone local da aba do navegador.

## 🎨 Paleta de cores

| Cor | Código | Uso principal |
| --- | --- | --- |
| Creme | `#f7f3eb` | Fundo no modo claro |
| Verde escuro | `#263f35` | Destaques e seção editorial |
| Terracota | `#cf572f` | Botões e detalhes |

O modo escuro usa uma variação dessas cores para manter a leitura confortável.

## ℹ️ Sobre esta demonstração

O checkout não solicita dados de cartão nem processa pagamentos. Ele apenas valida os campos e simula a conclusão do pedido. As capas não comprovam a disponibilidade comercial das obras em formato digital; nenhum e-book é fornecido para download por este projeto.

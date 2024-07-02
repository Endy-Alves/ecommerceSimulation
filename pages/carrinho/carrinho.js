const carrinho =JSON.parse(localStorage.getItem('carrinho'))
const main = document.getElementById('main')

console.log()





const divCarrinho = document.createElement('div');
divCarrinho.setAttribute('class', 'divCarrinho');
divCarrinho.textContent =  carrinho.priceProduct;
main.appendChild(divCarrinho);


 carrinho.push({ carrinho: carrinho }); // Salva o productId junto com o comentário
 localStorage.setItem('carrinho', JSON.stringify(carrinho));


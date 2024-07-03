const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
const main = document.getElementById('main')

console.log(carrinho)

for (const product of carrinho){
    console.log(product.carrinhoCompras.priceProduct)

    const divCarrinho = document.createElement('div');
    const price = document.createElement('p')
    price.setAttribute('class', 'price')
    price.textContent = `R$${product.carrinhoCompras.priceProduct}`;
    const image = document.createElement('img')
    image.setAttribute('class', 'image')
    image.src = product.carrinhoCompras.imageProduct
    divCarrinho.setAttribute('class', 'divCarrinho'); 
    divCarrinho.appendChild(image)
    divCarrinho.appendChild(price)
    main.appendChild(divCarrinho);
}








 localStorage.setItem('carrinho', JSON.stringify(carrinho));


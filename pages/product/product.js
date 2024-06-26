function renderProduct(productId){
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            const image = data.image
            const main = document.getElementById('main')
            const img = document.createElement('img')
            const description = document.createElement('h4')
            description.innerHTML = `${data.description}`
            const price = document.createElement('h1')
            price.innerHTML = `R$${data.price}, ta barato pae`
            img.src = image
            console.log(data)
            main.appendChild(img)
            main.appendChild(price)
            main.appendChild(description)
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do filme:', error);
        });
}



const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    renderProduct(productId);
} else {
    console.error('ID do filme não encontrado na URL.');
}
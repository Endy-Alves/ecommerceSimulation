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


// Seleciona a área onde os comentários serão exibidos
const reviewArea = document.getElementById('review');

// Seleciona o botão de envio do comentário
const envioBtn = document.getElementById('enviar');

// Função para adicionar um novo comentário
envioBtn.addEventListener('click', () => {
    // Captura o valor do input onde o usuário digitou o comentário
    const input = document.getElementById('inputReview').value.trim();

    // Verifica se o campo de comentário está vazio
    if (input === '') {
        alert('Por favor, digite um comentário válido.');
        return; // Sai da função se o comentário estiver vazio
    }

    // Cria uma nova div para o comentário
    const divComment = document.createElement('div');
    divComment.setAttribute('class', 'divComment');
    divComment.textContent = input; // Adiciona o texto do comentário à div

    // Adiciona a div de comentário à área de revisão
    reviewArea.appendChild(divComment);

    // Atualiza o localStorage com o novo comentário
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(input); // Adiciona o novo comentário ao array de comentários
    localStorage.setItem('comments', JSON.stringify(comments)); // Salva o array atualizado no localStorage

    // Limpa o campo de input após adicionar o comentário
    document.getElementById('inputReview').value = '';
});

// Função para carregar os comentários salvos no localStorage ao carregar a página
window.onload = function() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Itera pelos comentários salvos e os adiciona à reviewArea
    comments.forEach(comment => {
        const divComment = document.createElement('div');
        divComment.setAttribute('class', 'divComment');
        divComment.textContent = comment;
        reviewArea.appendChild(divComment);
    });
};

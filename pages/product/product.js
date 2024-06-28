function renderProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            const image = data.image;
            const main = document.getElementById('main');
            const divReview = document.getElementById('review')

            // Limpa o conteúdo anterior para evitar duplicação ao renderizar novamente
            main.innerHTML = '';

            // Cria elementos HTML para exibir os detalhes do produto
            const img = document.createElement('img');
            img.src = image;
            main.appendChild(img);

            const description = document.createElement('h4');
            description.textContent = data.description;
            main.appendChild(description);

            const price = document.createElement('h1');
            price.innerHTML = `R$ ${data.price.toFixed(2)}`; // Formata o preço com duas casas decimais
            main.appendChild(price);

            // Adiciona um input para o usuário digitar o comentário
            const inputReview = document.getElementById('inputReview');
            divReview.appendChild(inputReview);
            
            // Adiciona um botão para enviar o comentário
            const enviarBtn = document.getElementById('enviar');
            divReview.appendChild(enviarBtn)

            // Seleciona a área onde os comentários serão exibidos
            const reviewArea = document.getElementById('review');

            const users = JSON.parse(localStorage.getItem('users'))

            // Função para adicionar um novo comentário
            enviarBtn.addEventListener('click', () => {
                const comentario = inputReview.value.trim();

                if (comentario === '') {
                    alert('Por favor, digite um comentário válido.');
                    return;
                }

                const divComment = document.createElement('div');
                divComment.setAttribute('class', 'divComment');
                divComment.textContent =users.nome + ': ' + comentario;
                reviewArea.appendChild(divComment);

                // Atualiza o localStorage com o novo comentário
                let comments = JSON.parse(localStorage.getItem('comments')) || [];
                comments.push({ productId, comment: comentario }); // Salva o productId junto com o comentário
                localStorage.setItem('comments', JSON.stringify(comments));

                // Limpa o campo de input após adicionar o comentário
                inputReview.value = '';
            });
           

            console.log(users.nome)
            // Função para carregar os comentários salvos no localStorage ao carregar a página
            let comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.filter(comment => comment.productId == productId).forEach(comment => {
                const divComment = document.createElement('div');
                divComment.setAttribute('class', 'divComment');
                divComment.textContent = users.nome + ': ' + comment.comment; // Exibe o comentário
                reviewArea.appendChild(divComment);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do produto:', error);
        });
}

// Obtém o productId da URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Verifica se o productId foi obtido corretamente
if (productId) {
    renderProduct(productId);
} else {
    console.error('ID do produto não encontrado na URL.');
}

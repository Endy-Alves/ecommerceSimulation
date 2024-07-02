// Verifica se o usuário está logado
function isLoggedIn() {
  return localStorage.getItem('loggedIn') === 'true';
}

// Verifica se o usuário está logado ao carregar a página
window.onload = function() {
  if (!isLoggedIn()) {
      // Se não estiver logado, redireciona para a página de login
      window.location.href = '/index.html'; // substitua 'login.html' pelo caminho da sua página de login
  }
}




const users = JSON.parse(localStorage.getItem('users')) || {};

// Verifica se o nome do usuário já foi registrado anteriormente
if (!users.nome) {
    Swal.fire({
        title: 'Diga seu nome:',
        input: 'text',
        inputPlaceholder: 'Digite aqui',
        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa digitar algo!';
            }
        },
        allowOutsideClick: false,
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
            if (!inputValue) {
                Swal.showValidationMessage('Você precisa digitar algo!');
            }
            users.nome = inputValue;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Nome confirmado:", users.nome);
            location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('Operação cancelada');
        }
    });
} else {
    let users = JSON.parse(localStorage.getItem('users'))
    const header = document.getElementById('header')
    const h2 = document.createElement('h2')
    header.appendChild(h2)
    h2.innerHTML = `${users.nome}`

    const sidebar = document.querySelector('.sidebar');
    h2.addEventListener('click', ()=>{
      sidebar.style.display = 'flex'
    })

    document.addEventListener('click', function(event) {
      if (!sidebar.contains(event.target) && event.target !== h2) {
        sidebar.style.display = 'none'; // Esconde a sidebar
    }
  });

    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const main = document.getElementById('main');
    console.log(data)
    // Itera sobre os produtos
    data.forEach(product => {
      
      // Cria um elemento div para cada produto
      const productDiv = document.createElement('div');
      
      // Cria um elemento img para a imagem do produto
      const productImg = document.createElement('img');
      productImg.src = product.image; // Define o atributo src da imagem
      const p = document.createElement('p')
      p.innerHTML = `R$${product.price}`
      const title = document.createElement('p')
      title.innerHTML = `${product.title}`
      
      // Adiciona a imagem ao div do produto
      productDiv.appendChild(productImg);
      
      // Adiciona o div do produto ao elemento main
      main.appendChild(productDiv);
      productDiv.appendChild(p)
      productDiv.appendChild(title)

      productDiv.addEventListener('click', ()=>{
        window.location.href = `/pages/product/product.html?id=${product.id}`
      })
    });
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });


}
  
function logout() {
  localStorage.setItem('loggedIn', 'false');
  // Redireciona para a página de login ou outra página não autorizada
  window.location.href = '/index.html'; // substitua 'login.html' pelo caminho da sua página de login
}

const firstAuth = sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer');


if (firstAuth === null || firstAuth === undefined || firstAuth === 'true') {
    Swal.fire({
        title: 'Diga seu nome:',
        input: 'text',
        inputPlaceholder: 'Digite aqui',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
            if (!inputValue) {
                Swal.showValidationMessage('Você precisa digitar algo!');
            }
            let users = JSON.parse(localStorage.getItem('users')) || {};

            users.nome = inputValue;

            localStorage.setItem('users', JSON.stringify(users));
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(`Você clicou em Enviar!`);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Operação cancelada');
        }
    });

    sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', 'false');
} else {
    let users = JSON.parse(localStorage.getItem('users'))
    const header = document.getElementById('header')
    const h2 = document.createElement('h2')
    header.appendChild(h2)
    h2.innerHTML = `${users.nome}`

    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const main = document.getElementById('main');
    
    // Itera sobre os produtos
    data.forEach(product => {
      console.log(product);
      
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


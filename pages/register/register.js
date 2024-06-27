const button = document.getElementById("login")

button.addEventListener('click', (event)=>{
        event.preventDefault()
        window.location.href = '/index.html'
})

const register = document.getElementById('register')

register.addEventListener('click', ()=>{
    const email = document.getElementById('email').value
    const pass = document.getElementById('pass').value
    const confirm = document.getElementById('confirm').value

    if(email === '' || pass === '' || confirm === ''){
        alert("Preencha todos os campos")
    }
    else{
        if(confirm === pass){
            users = {
                nome: '',
                email: `${email}`,
                senha: `${pass}`,
                comment: ''
            }
        
            localStorage.setItem('users', JSON.stringify(users))
    
            alert('Usuario criado com sucesso.')
        }
        else{
            alert("Senhas divergentes!")
        }
    }

   
})
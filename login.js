const button = document.getElementById("buttonRegister")

button.addEventListener('click', (event)=>{
        event.preventDefault()
        window.location.href = './pages/register/register.html'
})

const users = JSON.parse(localStorage.getItem('users'))
    

    console.log(users)

const logar = document.getElementById('login')

logar.addEventListener('click', ()=>{
    const email = document.getElementById('email').value
    const pass = document.getElementById('pass').value

    if(email === users.email && pass === users.senha){
        window.location.href = '/pages/home/home.html'
        alert("Entrando com usuario")
    }
    else{
        alert("Email ou senha incorretos!")
    }
})
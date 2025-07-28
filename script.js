document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    createUserWithEmailAndPassword(window.auth, email, password)
        .then((userCredential) => {
            alert('Conta criada com sucesso!');
            this.reset();
        })
        .catch((error) => {
            alert('Erro ao criar conta: ' + error.message);
        });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(window.auth, email, password)
        .then((userCredential) => {
            alert('Login bem-sucedido!');
            this.reset();
        })
        .catch((error) => {
            alert('Usuário ou senha incorretos: ' + error.message);
        });
});

document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('registerSection').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('registerSection').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
});


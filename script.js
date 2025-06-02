document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    // Função para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para validar senha (mínimo 6 caracteres)
    function isValidPassword(password) {
        return password.length >= 6;
    }
    
    // Evento de submit do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validação dos campos
        if (!email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido!');
            return;
        }
        
        if (!isValidPassword(password)) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Simulação de login bem-sucedido
        // Aqui você pode adicionar uma chamada AJAX para um backend real
        console.log('Tentativa de login com:', { email, password });
        alert('Login realizado com sucesso! Redirecionando...');
        
        // Redirecionamento após 1 segundo
        setTimeout(() => {
            window.location.href = './pages/index.html';
        }, 1000);
    });
    
    // Evento para o link "Esqueceu a senha"
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Digite seu e-mail para redefinir a senha:');
        
        if (email && isValidEmail(email)) {
            alert(`Um link de redefinição foi enviado para ${email}`);
            // Aqui você poderia adicionar lógica para enviar o email
        } else if (email) {
            alert('Por favor, insira um e-mail válido!');
        }
    });
});
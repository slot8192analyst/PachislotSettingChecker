// パスワード認証（トップページのみ）
document.addEventListener('DOMContentLoaded', () => {
    const PASSWORD = '8192';
    const STORAGE_KEY = 'site_authenticated';

    // 認証済みかチェック
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        return;
    }

    // 認証モーダルを作成
    const authModal = document.createElement('div');
    authModal.id = 'authModal';
    authModal.innerHTML = `
        <div class="auth-wrapper">
            <header class="auth-header">
                <h1>設定判別要素まとめ</h1>
            </header>
            <div class="auth-content">
                <h2>パスワードを入力してください</h2>
                <input type="password" id="authPassword" placeholder="パスワード">
                <button id="authSubmit">入力</button>
                <p class="auth-error" id="authError"></p>
            </div>
        </div>
    `;
    document.body.appendChild(authModal);

    // ページを非表示
    document.querySelector('.container').style.display = 'none';

    const authPassword = document.getElementById('authPassword');
    const authSubmit = document.getElementById('authSubmit');
    const authError = document.getElementById('authError');

    // 認証処理
    function authenticate() {
        if (authPassword.value === PASSWORD) {
            sessionStorage.setItem(STORAGE_KEY, 'true');
            authModal.remove();
            document.querySelector('.container').style.display = 'block';
        } else {
            authError.textContent = 'パスワードが違います';
            authPassword.value = '';
        }
    }

    authSubmit.addEventListener('click', authenticate);

    authPassword.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            authenticate();
        }
    });

    authPassword.focus();
});

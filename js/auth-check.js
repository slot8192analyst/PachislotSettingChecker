// 認証チェック（機種別ページ用）
document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'site_authenticated';

    // 未認証ならトップページへリダイレクト
    if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
        window.location.href = '../../index.html';
    }
});

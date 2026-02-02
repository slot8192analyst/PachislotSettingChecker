// 画像タップで拡大表示
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    // モーダルがなければ終了
    if (!modal) return;

    // 画像クリックで拡大
    document.querySelectorAll('.setting-image img').forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('active');
            modalImg.src = img.src;
        });
    });

    // 閉じる
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
});

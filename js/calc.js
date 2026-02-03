// 東京リベンジャーズ 設定判別計算機
document.addEventListener('DOMContentLoaded', () => {
    const calcModal = document.getElementById('calcModal');
    const openCalc = document.getElementById('openCalc');
    const calcClose = document.getElementById('calcClose');

    // ステップ要素
    const calcStep1 = document.getElementById('calcStep1');
    const calcStep2 = document.getElementById('calcStep2');

    // ボタン
    const calcStep1Submit = document.getElementById('calcStep1Submit');
    const goToStep2 = document.getElementById('goToStep2');
    const backToStep1 = document.getElementById('backToStep1');
    const calcStep2Submit = document.getElementById('calcStep2Submit');

    // 結果表示
    const calcResult1 = document.getElementById('calcResult1');
    const calcResultValue1 = document.getElementById('calcResultValue1');
    const calcResult2 = document.getElementById('calcResult2');

    // 通常時G数を保存
    let normalSpins = 0;

    // モーダルがなければ終了
    if (!calcModal || !openCalc) return;

    // モーダルを開く
    openCalc.addEventListener('click', () => {
        calcModal.classList.add('active');
        showStep(1);
    });

    // モーダルを閉じる
    calcClose.addEventListener('click', () => {
        calcModal.classList.remove('active');
    });

    calcModal.addEventListener('click', (e) => {
        if (e.target === calcModal) {
            calcModal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            calcModal.classList.remove('active');
        }
    });

    // ステップ切り替え
    function showStep(step) {
        calcStep1.classList.remove('active');
        calcStep2.classList.remove('active');
        if (step === 1) {
            calcStep1.classList.add('active');
        } else {
            calcStep2.classList.add('active');
        }
    }

    // ステップ1: 通常時G数計算
    calcStep1Submit.addEventListener('click', () => {
        const totalSpins = parseFloat(document.getElementById('totalSpins').value) || 0;
        const currentDiff = parseFloat(document.getElementById('currentDiff').value) || 0;
        const upperAtDiff = parseFloat(document.getElementById('upperAtDiff').value) || 0;

        // 計算式
        normalSpins = (upperAtDiff * (1 - 0.4) + 3.2 * totalSpins - currentDiff) / 4.76;
        normalSpins = Math.floor(normalSpins);

        calcResultValue1.textContent = normalSpins + ' G';
        calcResult1.classList.add('show');
    });

    // ステップ2へ進む
    goToStep2.addEventListener('click', () => {
        // 先に計算していない場合は計算する
        if (normalSpins === 0) {
            calcStep1Submit.click();
        }
        showStep(2);
        document.getElementById('resultNormalG').textContent = normalSpins + ' G';
    });

    // ステップ1に戻る
    backToStep1.addEventListener('click', () => {
        showStep(1);
    });

    // ステップ2: 確率計算
    calcStep2Submit.addEventListener('click', () => {
        const midnightCount = parseFloat(document.getElementById('midnightCount').value) || 0;
        const kissakiCount = parseFloat(document.getElementById('kissakiCount').value) || 0;
        const tomanChanceCount = parseFloat(document.getElementById('tomanChanceCount').value) || 0;
        const tomanRushCount = parseFloat(document.getElementById('tomanRushCount').value) || 0;
        const tomanBurstCount = parseFloat(document.getElementById('tomanBurstCount').value) || 0;

        // 通常時G数を更新
        document.getElementById('resultNormalG').textContent = normalSpins + ' G';

        // 各確率を計算（通常時G数で割る）
        if (normalSpins > 0) {
            document.getElementById('resultMidnight').textContent = midnightCount > 0 
                ? '1/' + Math.floor(normalSpins / midnightCount) 
                : '-';
            document.getElementById('resultKissaki').textContent = kissakiCount > 0 
                ? '1/' + Math.floor(normalSpins / kissakiCount) 
                : '-';
            document.getElementById('resultTomanChance').textContent = tomanChanceCount > 0 
                ? '1/' + Math.floor(normalSpins / tomanChanceCount) 
                : '-';
            document.getElementById('resultTomanRush').textContent = tomanRushCount > 0 
                ? '1/' + Math.floor(normalSpins / tomanRushCount) 
                : '-';
            document.getElementById('resultTomanBurst').textContent = tomanBurstCount > 0 
                ? '1/' + Math.floor(normalSpins / tomanBurstCount) 
                : '-';
        } else {
            document.getElementById('resultMidnight').textContent = '通常時G数を先に計算してください';
        }

        calcResult2.style.display = 'flex';
    });
});

/**
 * DOĞUM GÜNÜ HİKAYE VERİLERİ (BURAYI KENDİNİZE GÖRE DÜZENLEYECEKSİNİZ)
 * 
 * Yeni bir adım eklemek için aynı mantıkla bloklar oluşturun.
 * - mediaSrc: medyanın adını buraya yazın. Resimleri projeyle aynı klasöre koyun.
 * - type: 'image' veya 'video'
 * - text: Hikaye metni
 * - options: 
 *      text: Butondaki yazı
 *      nextId: Butona tıklanınca gidilecek adım
 *      color: 'primary' (Pembe/Kımızı) veya 'secondary' (Mavi)
 */

const storyData = {
    start: {
        type: 'image',
        mediaSrc: ['fik.jpeg', 'sinsi.png'],
        mediaSizes: ['100%', '50%'],
        text: 'Doğum günü kızına bir kaç sorumuz varr',
        options: [
            { text: 'Başlayalımm', nextId: 'q1', color: 'primary' }
        ]
    },
    q1: {
        type: 'image',
        mediaSrc: ['sarisinFik.jpeg', 'serenay.jpeg'],
        mediaSizes: ['75%', '75%'],
        text: 'Hangisi daha sarışın?',
        options: [
            { text: 'Fik', nextId: 'q1_fik', color: 'primary' },
            { text: 'Serenay', nextId: 'q1_serenay', color: 'secondary' }
        ]
    },
    q1_serenay: {
        type: 'video',
        mediaSrc: 'elHareketi.mp4',
        text: '',
        options: [
            { text: 'Doğru cevabı verr 😡', nextId: 'q1', color: 'secondary' }
        ]
    },
    q1_fik: {
        type: 'image',
        mediaSrc: 'aferin.png',
        text: 'Görünen göz yani aferinn dogruuu',
        options: [
            { text: 'Devamm', nextId: 'q2', color: 'primary' }
        ]
    },
    q2: {
        type: 'image',
        mediaSrc: 'timoThinking.jpeg',
        text: 'Çitos mu Cocostar mı??',
        options: [
            { text: 'Çitos', nextId: 'q2_citos', color: 'primary' },
            { text: 'Cocostar', nextId: 'q2_cocostar', color: 'secondary' }
        ]
    },
    q2_citos: {
        type: 'video',
        mediaSrc: 'elHareketi.mp4',
        text: '',
        options: [
            { text: 'Doğru cevabı verr 😡', nextId: 'q2', color: 'secondary' }
        ]
    },
    q2_cocostar: {
        type: 'image',
        mediaSrc: 'topluFoto.jpeg',
        text: 'Seninle geçen her an bir hediye 🎁 Seni tanıdığımız için çok şanslıyız. Gülüşün hiç eksilmesin, iyi ki doğdun, iyi ki varsın! Seni çok seviyoruz! ❤️',
        options: []
    }
};

/* --- ALTTARAFİ KODLARI DEĞİŞTİRMEYE GEREK YOK --- */

let currentNode = 'start';
const card = document.getElementById('story-card');
const mediaContainer = document.getElementById('media-container');
const storyText = document.getElementById('story-text');
const buttonContainer = document.getElementById('button-container');

// Resmi/Video'yu Yükle
function renderNode(nodeId) {
    const node = storyData[nodeId];
    if (!node) return;

    // Çıkış animasyonu
    card.classList.remove('fade-in');
    card.classList.add('fade-out');

    setTimeout(() => {
        // İçerik değiştir
        storyText.innerHTML = node.text;

        // Medya kontrolü
        mediaContainer.innerHTML = '';
        
        if (node.type === 'video') {
            const videoWrapper = document.createElement('div');
            videoWrapper.className = 'media-grid-1';
            
            const video = document.createElement('video');
            video.src = node.mediaSrc;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            
            videoWrapper.appendChild(video);
            mediaContainer.appendChild(videoWrapper);
            
            video.play().catch(e => console.log("Video otomatik oynatılamadı."));
        } else {
            if (Array.isArray(node.mediaSrc)) {
                // Birden çok resim - kaydırılabilir
                const wrapper = document.createElement('div');
                wrapper.className = 'media-grid-2';
                
                node.mediaSrc.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = "Hatıra";
                    if (node.mediaSizes && node.mediaSizes[index]) {
                        img.style.width = node.mediaSizes[index];
                    }
                    img.onerror = () => { img.src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232a2a4a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%3E%28G%C3%B6rsel%20Bulunamad%C4%B1%29%3C%2Ftext%3E%3C%2Fsvg%3E`; };
                    wrapper.appendChild(img);
                });
                
                mediaContainer.appendChild(wrapper);
            } else {
                // Tek resim
                const wrapper = document.createElement('div');
                wrapper.className = 'media-grid-1';
                
                const img = document.createElement('img');
                img.src = node.mediaSrc;
                img.alt = "Hatıra";
                img.onerror = () => { img.src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232a2a4a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%3E%28G%C3%B6rsel%3A%20${node.mediaSrc}%29%3C%2Ftext%3E%3C%2Fsvg%3E`; };
                wrapper.appendChild(img);
                
                mediaContainer.appendChild(wrapper);
            }
        }

        // Butonları güncelle
        buttonContainer.innerHTML = '';
        if (node.options && node.options.length > 0) {
            node.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = `btn btn-${opt.color || 'primary'}`;
                btn.textContent = opt.text;
                btn.onclick = () => renderNode(opt.nextId);
                buttonContainer.appendChild(btn);
            });
        } else {
            // Buton yoksa son adımdır, konfeti patlat
            triggerConfetti();
        }

        // Giriş animasyonu
        card.classList.remove('fade-out');
        card.classList.add('fade-in');

    }, 300); // fade-out zamanıyla aynı
}

// Konfeti Efekti
function triggerConfetti() {
    const colors = ['#e94560', '#ff6b8b', '#0f3460', '#f2d74e', '#ffffff'];
    for(let i = 0; i < 70; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const piece = document.createElement('div');
    piece.style.position = 'absolute';
    piece.style.width = Math.random() * 8 + 6 + 'px';
    piece.style.height = Math.random() * 15 + 10 + 'px';
    piece.style.backgroundColor = color;
    piece.style.opacity = Math.random() + 0.5;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    piece.style.zIndex = '999';
    
    // Rastgele başlangıç koordinatı
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-50px';
    
    document.body.appendChild(piece);
    
    const animationDuration = Math.random() * 3 + 2; 
    
    piece.animate([
        { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${Math.random()*200 - 100}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
    ], {
        duration: animationDuration * 1000,
        easing: 'cubic-bezier(.37,0,.63,1)',
        fill: 'forwards'
    });
    
    setTimeout(() => { piece.remove(); }, animationDuration * 1000);
}

// Başlangıç yüklemesi
window.onload = () => {
    setTimeout(() => {
        renderNode('start');
    }, 500); // Kullanıcı ilk başta bir "Sürpriz yükleniyor" görsün
};

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let enemies;
let score = 0;
let scoreText;
let gameOver = false;
let spawnTimer;

function preload() {
    // Harici resim yüklemiyoruz, kod ile çiziyoruz.
}

function create() {
    // 1. Oyuncuyu Oluştur (Yeşil Kutu)
    const playerGraphic = this.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, 40, 40);
    playerGraphic.generateTexture('player', 40, 40);
    
    player = this.physics.add.sprite(400, 550, 'player');
    player.setCollideWorldBounds(true);

    // 2. Düşman Grubunu Oluştur
    const enemyGraphic = this.make.graphics().fillStyle(0xff0000).fillRect(0, 0, 30, 30);
    enemyGraphic.generateTexture('enemy', 30, 30);
    
    enemies = this.physics.add.group();

    // 3. Klavye Kontrolleri
    cursors = this.input.keyboard.createCursorKeys();

    // 4. Skor Tablosu
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // 5. Düşman Doğurma Zamanlayıcısı
    spawnTimer = this.time.addEvent({
        delay: 500, // Her 500ms'de bir düşman gelir
        callback: spawnEnemy,
        callbackScope: this,
        loop: true
    });

    // 6. Çarpışma Kontrolü
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
}

function update() {
    if (gameOver) {
        return;
    }

    // Oyuncu Hareketi
    if (cursors.left.isDown) {
        player.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        player.setVelocityX(300);
    } else {
        player.setVelocityX(0);
    }

    // Skoru Artır
    score += 1;
    scoreText.setText('Score: ' + score);

    // EKRANDAN ÇIKAN DÜŞMANLARI SİL (Bellek Temizliği)
    enemies.children.iterate(function (child) {
        if (child && child.y > 650) {
            child.destroy();
        }
    });
}

function spawnEnemy() {
    if (gameOver) return;

    // Rastgele X pozisyonunda düşman yarat
    const x = Phaser.Math.Between(0, 800);
    const enemy = enemies.create(x, 0, 'enemy');
    
    // Düşme hızı
    enemy.setVelocityY(Phaser.Math.Between(200, 400));
}

function hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000); // Oyuncuyu kırmızı yap
    gameOver = true;
    spawnTimer.remove(); // Yeni düşman gelmesini durdur
    
    this.add.text(300, 250, 'GAME OVER', { fontSize: '40px', fill: '#fff' });
    this.add.text(260, 300, 'Press F5 to Restart', { fontSize: '24px', fill: '#fff' });
}
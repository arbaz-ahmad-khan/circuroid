
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gamePlayBg
		const gamePlayBg = this.add.image(540, 960, "gamePlayBg");
		gamePlayBg.alpha = 0.2;
		gamePlayBg.alphaTopLeft = 0.2;
		gamePlayBg.alphaTopRight = 0.2;
		gamePlayBg.alphaBottomLeft = 0.2;
		gamePlayBg.alphaBottomRight = 0.2;

		// bg
		const bg = this.add.image(540, 960, "bg");
		bg.visible = false;
		bg.alpha = 0.8;
		bg.alphaTopLeft = 0.8;
		bg.alphaTopRight = 0.8;
		bg.alphaBottomLeft = 0.8;
		bg.alphaBottomRight = 0.8;

		// container_polygonTween
		const container_polygonTween = this.add.container(540, 960);

		// polygon_4
		const polygon_4 = this.add.image(0, 0, "polygon");
		polygon_4.scaleX = 4;
		polygon_4.scaleY = 4;
		polygon_4.alpha = 0.4;
		polygon_4.alphaTopLeft = 0.4;
		polygon_4.alphaTopRight = 0.4;
		polygon_4.alphaBottomLeft = 0.4;
		polygon_4.alphaBottomRight = 0.4;
		container_polygonTween.add(polygon_4);

		// polygon_1
		const polygon_1 = this.add.image(0, 0, "polygon");
		polygon_1.scaleX = 3;
		polygon_1.scaleY = 3;
		polygon_1.alpha = 0.6;
		polygon_1.alphaTopLeft = 0.6;
		polygon_1.alphaTopRight = 0.6;
		polygon_1.alphaBottomLeft = 0.6;
		polygon_1.alphaBottomRight = 0.6;
		container_polygonTween.add(polygon_1);

		// polygon_2
		const polygon_2 = this.add.image(0, 0, "polygon");
		polygon_2.scaleX = 2;
		polygon_2.scaleY = 2;
		polygon_2.alpha = 0.8;
		polygon_2.alphaTopLeft = 0.8;
		polygon_2.alphaTopRight = 0.8;
		polygon_2.alphaBottomLeft = 0.8;
		polygon_2.alphaBottomRight = 0.8;
		container_polygonTween.add(polygon_2);

		// polygon_3
		const polygon_3 = this.add.image(0, 0, "polygon");
		container_polygonTween.add(polygon_3);

		// container_gameOver
		const container_gameOver = this.add.container(0, 0);
		container_gameOver.visible = false;

		// transparent_bg
		const transparent_bg = this.add.image(540, 960, "transparent-bg");
		container_gameOver.add(transparent_bg);

		// text_1
		const text_1 = this.add.text(540, 700, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Game Over";
		text_1.setStyle({ "fontFamily": "Arial", "fontSize": "150px" });
		container_gameOver.add(text_1);

		// bestScoreText
		const bestScoreText = this.add.text(540, 911, "", {});
		bestScoreText.setOrigin(0.5, 0.5);
		bestScoreText.text = "Best: ";
		bestScoreText.setStyle({ "fontFamily": "Arial", "fontSize": "80px", "fontStyle": "bold" });
		container_gameOver.add(bestScoreText);

		// scoreText
		const scoreText = this.add.text(540, 1048, "", {});
		scoreText.setOrigin(0.5, 0.5);
		scoreText.text = "Score: ";
		scoreText.setStyle({ "fontFamily": "Arial", "fontSize": "80px", "fontStyle": "bold" });
		container_gameOver.add(scoreText);

		// replayBtn
		const replayBtn = this.add.image(540, 1263, "replayBtn");
		replayBtn.setInteractive(this.input.makePixelPerfect());
		container_gameOver.add(replayBtn);

		// text_score
		const text_score = this.add.text(540, 960, "", {});
		text_score.setOrigin(0.5, 0.5);
		text_score.text = "0";
		text_score.setStyle({ "fontFamily": "Arial", "fontSize": "120px", "fontStyle": "bold" });

		this.polygon_4 = polygon_4;
		this.polygon_1 = polygon_1;
		this.polygon_2 = polygon_2;
		this.polygon_3 = polygon_3;
		this.bestScoreText = bestScoreText;
		this.scoreText = scoreText;
		this.replayBtn = replayBtn;
		this.container_gameOver = container_gameOver;
		this.text_score = text_score;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	polygon_4;
	/** @type {Phaser.GameObjects.Image} */
	polygon_1;
	/** @type {Phaser.GameObjects.Image} */
	polygon_2;
	/** @type {Phaser.GameObjects.Image} */
	polygon_3;
	/** @type {Phaser.GameObjects.Text} */
	bestScoreText;
	/** @type {Phaser.GameObjects.Text} */
	scoreText;
	/** @type {Phaser.GameObjects.Image} */
	replayBtn;
	/** @type {Phaser.GameObjects.Container} */
	container_gameOver;
	/** @type {Phaser.GameObjects.Text} */
	text_score;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
		this.input.setDefaultCursor('default');
		this.isMoving = false;
		this.radius = 450;
		this.angle = 0;
		this.lastFiredTime = 0;
		this.isGameOver = false;
		this.canCollide = true;
		this.enemySpawnTimer = 0;
		this.circleRadius = 450;
		this.score = 0;
		this.bestScore = parseInt(localStorage.getItem('bestScore-Circuroid')) || 0;

		this.bulletsGroup = this.physics.add.group();
		this.enemiesGroup = this.physics.add.group();

		this.polygonsTweens();

		this.graphics = this.add.graphics();
		this.graphics.lineStyle(3, 0xa361f7);
		this.graphics.strokeCircle(540, 960, this.radius);

		// this.player = this.add.sprite(540 + this.radius, 960, 'player');
		this.player = this.add.sprite(160 + this.radius, 1400, 'player');
		this.player.setOrigin(0.5, 0.1)
		this.player.setDepth(1);
		this.player.setInteractive();

		this.spawnEnemyInterval = setInterval(() => {
			this.spawnEnemy();
		}, Phaser.Math.Between(2000, 3000));

		this.spawnEnemyInterval2 = setInterval(() => {
			this.spawnEnemy();
		}, Phaser.Math.Between(4000, 5000));

		this.spawnEnemyInterval3 = setInterval(() => {
			this.spawnEnemy();
		}, Phaser.Math.Between(10000, 15000));

		this.player.on('pointerdown', this.startMoving, this);
		this.input.on('pointerup', this.stopMoving, this);
		this.input.on('pointermove', this.movePlayer, this);

		this.physics.add.overlap(this.bulletsGroup, this.enemiesGroup, this.bulletEnemyCollision, null, this);
	}

	polygonsTweens() {
		this.polygons = [];
		this.polygons.push(this.polygon_4, this.polygon_1, this.polygon_2, this.polygon_3,);
		const rotationSpeeds = [0.008, -0.007, 0.01, -0.003];
		const rotationDirections = [1, -1, 1, -1];
		this.polygons.forEach((polygon, index) => {
			const rotationSpeed = rotationSpeeds[index];
			const rotationDirection = rotationDirections[index];
			this.tweens.add({
				targets: polygon,
				angle: rotationDirection * 360,
				duration: 300 / Math.abs(rotationSpeed),
				repeat: -1,
				yoyo: true,
				ease: 'Linear',
				onUpdate: () => {
					polygon.angle += rotationSpeed * 180 / Math.PI;
				}
			});
		});
	}

	update() {
		if (!this.isGameOver) {
			this.enemiesGroup.getChildren().forEach(enemy => {
				let distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, 540, 960);
				if (distance > this.circleRadius) {
					enemy.setVisible(false);
					this.gameOver();
				}
			});
		}
	}

	startMoving() {
		this.isMoving = true;
	}

	stopMoving() {
		this.isMoving = false;
	}

	movePlayer(pointer) {
		if (this.isMoving) {
			this.angle = Phaser.Math.Angle.Between(540, 960, pointer.x, pointer.y);
			this.player.x = 540 + this.radius * Math.cos(this.angle);
			this.player.y = 960 + this.radius * Math.sin(this.angle);

			this.player.rotation = this.angle - Math.PI / 2;

			let currentTime = this.time.now;
			if (currentTime - this.lastFiredTime >= 200) {
				this.fireBullet();
				this.lastFiredTime = currentTime;
			}
		}
	}

	fireBullet() {
		let bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
		bullet.rotation = this.player.rotation;
		this.bulletsGroup.add(bullet);

		// this.createBulletTrailParticles(bullet);
		const bulletTrailParticles = this.createBulletTrailParticles(bullet);

		this.tweens.add({
			targets: bullet,
			x: 540,
			y: 960,
			duration: 600,
			onComplete: () => {
				bullet.destroy();
				bulletTrailParticles.destroy();
			}
		});
	}

	spawnEnemy() {
		this.canCollide = false;
		setTimeout(() => {
			this.canCollide = true;
		}, 200);

		let enemy = this.physics.add.sprite(540, 960, 'enemy');

		let randomX = Phaser.Math.Between(0, 100) + Phaser.Math.Between(0, 1) * 800;
		let randomY = Phaser.Math.Between(300, 400) + Phaser.Math.Between(0, 1) * 1300;

		let randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
		let randomRadius = Phaser.Math.FloatBetween(0, this.circleRadius);
		randomX += randomRadius * Math.cos(randomAngle);
		randomY += randomRadius * Math.sin(randomAngle);

		let randomDuration = Phaser.Math.Between(3000, 5000);

		this.tweens.add({
			targets: enemy,
			x: randomX,
			y: randomY,
			angle: 360,
			duration: randomDuration,
			onComplete: () => {
				enemy.destroy();
			}
		});

		this.enemiesGroup.add(enemy);

	}

	bulletEnemyCollision(bullet, enemy) {
		if (this.canCollide) {

			const collisionPoint = { x: enemy.x, y: enemy.y };
			this.bulletBlastParticles(collisionPoint);
			this.explosionParticles(collisionPoint);

			this.scoreUpdate();
			bullet.destroy();
			enemy.destroy();
			this.cameras.main.shake(500, 0.005);

		}
	}

	scoreUpdate() {
		this.score += 1;
		this.text_score.setText(this.score);

		if (this.score > this.bestScore) {
			this.bestScore = this.score;
			localStorage.setItem('bestScore-Circuroid', this.bestScore);
		}
	}

	gameOver() {
		// console.log("Game Over!");
		this.isGameOver = true;
		this.cameras.main.shake(500, 0.03);
		this.physics.pause();
		clearInterval(this.spawnEnemyInterval);
		clearInterval(this.spawnEnemyInterval2);
		clearInterval(this.spawnEnemyInterval3);
		this.text_score.setVisible(false);
		this.scoreText.setText('Score: ' + this.score);
		this.bestScoreText.setText('Best: ' + this.bestScore);
		this.container_gameOver.setVisible(true);
		this.container_gameOver.setDepth(2);
		this.pointerOverAndOut();
		this.replayBtn.setInteractive().on('pointerdown', () => {
			this.scene.restart();
		});
	}

	explosionParticles = ({ x, y }, quantity = 8) => {
		const explosionParticles = this.add.particles(x, y, 'explosion-huge', {
			quantity: 8,
			maxParticles: quantity,
			speed: 80,
			scale: { start: 0.5, end: 0.1 },
			alpha: { start: 0.5, end: 0.5 },
		});
		return explosionParticles;
	}

	bulletBlastParticles = ({ x, y }, quantity = 8) => {
		const blastParticle = this.add.particles(x, y, 'spark', {
			quantity: 8,
			maxParticles: quantity,
			speed: 120,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
			stopAfter: 10,
			speed: 400,
			radial: true,
		});
		return blastParticle;
	}

	createBulletTrailParticles(bullet) {
		const bulletTrailParticles = this.add.particles(0,0, 'bullet-trail', {
			speed: { min: -100, max: 100 },
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
			lifespan: 300,
			radial: true
		});
		bulletTrailParticles.startFollow(bullet);
		return bulletTrailParticles;
	}

	pointerOverAndOut() {
		this.pointerOver = (aBtn, scale) => {
			this.input.setDefaultCursor('pointer');
			this.tweens.add({
				targets: aBtn,
				scaleX: scale + 0.05,
				scaleY: scale + 0.05,
				duration: 50
			})
		}
		this.pointerOut = (aBtn, scale) => {
			this.input.setDefaultCursor('default');
			this.tweens.add({
				targets: aBtn,
				scaleX: scale,
				scaleY: scale,
				duration: 50,
				onComplete: () => {
					aBtn.forEach((btn) => {
						btn.setScale(scale);
					});
				}
			})
		}

		this.replayBtn.on('pointerover', () => this.pointerOver([this.replayBtn], 1));
		this.replayBtn.on('pointerout', () => this.pointerOut([this.replayBtn], 1));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

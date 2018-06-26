var Bullet = function (Game, key) {

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

        this.tracking = false;
        this.scaleSpeed = 0;

    };

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

        gx = gx || 0;
        gy = gy || 0;

        this.reset(x, y);
        this.scale.set(1);

        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

        this.angle = angle;

        this.body.gravity.set(gx, gy);

    };

        Bullet.prototype.update = function () {

        if (this.tracking)
        {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }

        if (this.scaleSpeed > 0)
        {
            this.scale.x += this.scaleSpeed;
            this.scale.y += this.scaleSpeed;
        }

    };

    var Weapon = {};

    Weapon.SplitShot = function (game) {

        Phaser.Group.call(this, game, game.world, 'Split Shot', false, true, Phaser.Physics.ARCADE);

        this.nextFire = 0;
        this.bulletSpeed = 700;
        this.fireRate = 40;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bullet8'), true);
        }

        return this;

    };

    Weapon.SplitShot.prototype = Object.create(Phaser.Group.prototype);
    Weapon.SplitShot.prototype.constructor = Weapon.SplitShot;

    Weapon.SplitShot.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x + 20;
        var y = source.y + 10;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -500);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 500);

        this.nextFire = this.game.time.time + this.fireRate;

    };

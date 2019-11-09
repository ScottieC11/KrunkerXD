// ==UserScript==
// @name         KrunkerXD
// @namespace    https://github.com/GeniusXD
// @version      1.8.8
// @description  The best krunker cheat
// @author       Improved and unpatched by 200botsga
// @match        *://krunker.io/*
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js
// @require      https://krunkr.com/assets/js/canvas.gui.js?ver=0.7
// @grant        none
// ==/UserScript==

alert('KrunkerXD\nCheats for Krunker.io v1.8.8\n\nThis cheat/hack was unpatched and improved by 200bots.ga. Please disable Ad-blocker for better gameplay!\n\nAlert: Few features were removed but you can still destroy players!');
(function(){
    const replace = String.prototype.replace;

    function conceal(original_Function, hook_Function) {
        var anti_map = [];
        var original_toString = Function.prototype.toString;
        function hook_toString(...args) {
            for (var i = 0; i < anti_map.length; i++) {
                if (anti_map[i].from === this) {
                    return anti_map[i].to;
                }
            }
            return original_toString.apply(this, args);
        }

        anti_map.push({from: hook_Function, to: original_Function.toString()});
        anti_map.push({from: hook_toString, to: original_toString.toString()});
        Function.prototype.toString = hook_toString;
    };

    var inputs = "cEE";
    var world = "cEy";
    var consts = "cDv";
    var me = "cEA";
    var math = "cEp";

    var hrtCheat = function(me, inputs, world, consts, math, conceal) {
        var canSee = "BwftfwWS";
        var getDir = "ujHYahTl";
        var getXDire = "SbPUccYE";
        var getDistance = "kwpNBTcj";
        var getD3D = "OmPMwAzs";
        var pchObjc = "vKPtJVFI";
        var objInstances = "eKoEYKcC";
        var playerScale = "playerScale";
        var isYou = "OFnPTTpe";
        var recoilAnimY = "psKrGopm";
        var playerHeight = "playerHeight";
        var mouseDownL = "sMTFGWrl";
        var mouseDownR = "hhLaRzBY";

        var controls = world.controls;
        const SHOOT = 5, SCOPE = 6, xDr = 3, yDr = 2, JUMP = 7, CROUCH = 8;
        var isEnemy = function(player) {return !me.team || player.team != me.team};
        var canHit = function(player) {return null == world[canSee](me, player.x3, player.y3 - player.crouchVal * consts.crouchDst, player.z3)};
        var normaliseYaw = function(yaw) {return (yaw % Math.PI2 + Math.PI2) % Math.PI2;};

        var dAngleTo = function(x, y, z) {
            var ty = normaliseYaw(math[getDir](controls.object.position.z, controls.object.position.x, z, x));
            var tx = math[getXDire](controls.object.position.x, controls.object.position.y, controls.object.position.z, x, y, z);
            var oy = normaliseYaw(controls.object.rotation.y);
            var ox = controls[pchObjc].rotation.x;
            var dYaw = Math.min(Math.abs(ty - oy), Math.abs(ty - oy - Math.PI2), Math.abs(ty - oy + Math.PI2));
            var dPitch = tx - ox;
            return Math.hypot(dYaw, dPitch);
        };
        var calcAngleTo = function(player) {return dAngleTo(e.x3, e.y3 + consts[playerHeight] - (consts.headScale + consts.hitBoxPad) / 2 - e.crouchVal * consts.crouchDst, e.z3);};
        var calcDistanceTo = function(player) {return math[getD3D](player.x3, player.y3, player.z3, me.x, me.y, me.z)};
        var isCloseEnough = function(player) {var distance = calcDistanceTo(player); return me.weapon.range >= distance && ("Shotgun" != me.weapon.name || distance < 70) && ("Akimbo Uzi" != me.weapon.name || distance < 100);};
        var haveAmmo = function() {return !(me.ammos[me.weaponIndex] !== undefined && me.ammos[me.weaponIndex] == 0);};

        if (!window.init) {
            window.init = true;

            var drawVisuals = function(c) {
                var scalingFactor = arguments.callee.caller.caller.arguments[0];
                var perspective = arguments.callee.caller.caller.arguments[2];
                var scaledWidth = c.canvas.width / scalingFactor;
                var scaledHeight = c.canvas.height / scalingFactor;
                var worldPosition = perspective.camera.getWorldPosition();
                for (var i = 0; i < world.players.list.length; i++) {
                    var player = world.players.list[i];
                    var e = players[i];
                    if (e[isYou] || !e.active || !e[objInstances] || !isEnemy(e)) {
                        continue;
                    }
                    var xmin = Infinity;
                    var xmax = -Infinity;
                    var ymin = Infinity;
                    var ymax = -Infinity;
                    var br = false;
                    for (var j = -1; !br && j < 2; j+=2) {
                        for (var k = -1; !br && k < 2; k+=2) {
                            for (var l = 0; !br && l < 2; l++) {
                                var position = e[objInstances].position.clone();
                                position.x += j * consts[playerScale];
                                position.z += k * consts[playerScale];
                                position.y += l * (consts[playerHeight] - e.crouchVal * consts.crouchDst);
                                if (!perspective.frustum.containsPoint(position)) {
                                    br = true;
                                    break;
                                }
                                position.project(perspective.camera);
                                xmin = Math.min(xmin, position.x);
                                xmax = Math.max(xmax, position.x);
                                ymin = Math.min(ymin, position.y);
                                ymax = Math.max(ymax, position.y);
                            }
                        }
                    }

                    if (br) {
                        continue;
                    }

                    xmin = (xmin + 1) / 2;
                    ymin = (ymin + 1) / 2;
                    xmax = (xmax + 1) / 2;
                    ymax = (ymax + 1) / 2;


                    c.save();

                    c.lineWidth = 5;
                    c.strokeStyle = 'rgba(255,50,50,1)';

                    var distanceScale = Math.max(.3, 1 - math[getD3D](worldPosition.x, worldPosition.y, worldPosition.z, e.x, e.y, e.z) / 600);
                    c.scale(distanceScale, distanceScale);
                    var xScale = scaledWidth / distanceScale;
                    var yScale = scaledHeight / distanceScale;

                    c.beginPath();
                    ymin = yScale * (1 - ymin);
                    ymax = yScale * (1 - ymax);
                    xmin = xScale * xmin;
                    xmax = xScale * xmax;
                    c.moveTo(xmin, ymin);
                    c.lineTo(xmin, ymax);
                    c.lineTo(xmax, ymax);
                    c.lineTo(xmax, ymin);
                    c.lineTo(xmin, ymin);
                    c.stroke();

                    c.fillStyle = "rgba(255,50,50,1)";
                    var barMaxHeight = ymax - ymin;
                    c.fillRect(xmin - 7, ymin, -10, barMaxHeight);
                    c.fillStyle = "#00FFFF";
                    c.fillRect(xmin - 7, ymin, -10, barMaxHeight * (e.health / e.maxHealth));

                    c.font = "60px Sans-serif";
                    c.fillStyle = "white";
                    c.strokeStyle='black';
                    c.lineWidth = 1;
                    var x = xmax + 7;
                    var y = ymax;
                    c.fillText(e.name, x, y);
                    c.strokeText(e.name, x, y);
                    c.font = "30px Sans-serif";
                    y += 35;
                    c.fillText(e.weapon.name, x, y);
                    c.strokeText(e.weapon.name, x, y);
                    y += 35;
                    c.fillText(e.health + ' HP', x, y);
                    c.strokeText(e.health + ' HP', x, y);

                    c.restore();

                    if (e.legMeshes[0]) {
                        var material = e.legMeshes[0].material;
                        material.alphaTest = 1;
                        material.depthTest = false;
                        material.fog = false;
                        material.emissive.r = 1;
                        material.emissive.g = 1;
                        material.emissive.b = 1;
                        material.wireframe = true;
                    }

                }
            };
            var original_clearRect = CanvasRenderingContext2D.prototype.clearRect;
            var hook_clearRect = function(...args) {
                original_clearRect.apply(this, args);
                drawVisuals(this);
            };

            conceal(original_clearRect, hook_clearRect);
            CanvasRenderingContext2D.prototype.clearRect = hook_clearRect;
        }

        var closest = null, closestAngle = Infinity;
        var players = world.players.list;
        for (var i = 0; me.active && i < players.length; i++) {
            var e = players[i];
            if (e[isYou] || !e.active || !e[objInstances] || !isEnemy(e)) {
                continue;
            }

            e.x3 = e.x;
            e.y3 = e.y;
            e.z3 = e.z;

            if (!isCloseEnough(e) || !canHit(e)) {
                continue;
            }


            var angle = calcAngleTo(e);
            if (angle < closestAngle) {
                closestAngle = angle;
                closest = e;
            }
        }
        var ty = controls.object.rotation.y, tx = controls[pchObjc].rotation.x;
        if (closest) {
            var target = closest;
            var y = target.y3 + consts[playerHeight] - (consts.headScale) / 2 - target.crouchVal * consts.crouchDst;
            if (me.weapon.nAuto && me.didShoot) {
                inputs[SHOOT] = 0;
            } else if (!me.aimVal) {
                inputs[SHOOT] = 1;
                inputs[SCOPE] = 1;
            } else {
                inputs[SCOPE] = 1;
            }

            ty = math[getDir](controls.object.position.z, controls.object.position.x, target.z3, target.x3);
            tx = math[getXDire](controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x3, y, target.z3);

            tx -= .3 * me[recoilAnimY];
        } else {
            inputs[SHOOT] = controls[mouseDownL];
            inputs[SCOPE] = controls[mouseDownR];
        }

        inputs[xDr] = (tx % Math.PI2).round(3);
        inputs[yDr] = (ty % Math.PI2).round(3);

        controls.keys[controls.reloadKey] = !haveAmmo() * 1;

        inputs[JUMP] = (controls.keys[controls.jumpKey] && !me.didJump) * 1;
    }

    const handler = {
      construct(target, args) {
        if (args.length == 2 && args[1].length > 1337) {
            var script = args[1];

var xd = `<head>
<link href="https://fonts.googleapis.com/css?family=Quicksand|Roboto" rel="stylesheet">
<script src="https://pastebin.com/raw/kY6xyYd4"></script>
<link rel="icon" type="image/png" href="https://cdn.codetunnel.net/ahub/logo-transparent.png" />
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-size: 8px;
            background-color: #3f51b5;
        }

        @media screen and (min-width: 220px) {
            body {
                font-size: 14px;
            }
        }

        @media screen and (min-width: 520px) {
            body {
                font-size: 18px;
            }
        }

        h1 {
            font-size: 2em;
            font-family: Quicksand, Roboto, Arial;
            font-weight: 100;
            color: #424242;
            margin: 1rem;
        }

        p {
            font-family: Roboto, Quicksand, Arial;
            text-align: left;
            margin-bottom: 1rem;
        }

        a {
            text-decoration: none;
            color: #3f51b5;
        }

        .message-container {
            box-sizing: border-box;
            background-color: #FFFFFF;
            margin: auto;
            width: 90%;
            max-width: 42em;
            margin-top: -30vh;
            padding: 1em;
            border-radius: 2px;
            box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
        }

        .ribbon {
            width: 100%;
            height: 40vh;
            background-color: #3f51b5;
        }

        .button {
            background-color: #3f51b5;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div class="ribbon"></div>
    <div class="message-container">
<script>
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);
</script>
        <h1>
            <center>Outdated Cheat Detected!</center>
        </h1>

<center><button class="button" onclick="git()">Github</button></center>
<script>
function git() {
window.open("https://github.com/GeniusXD/KrunkerXD", '_self')
}
</script>
<br><center><iframe width="725" height="409" src="https://www.youtube.com/embed/Q3HSjJ9lRF4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center></br>

    </div>
</body>`

             var version = script.match(/\w+\['exports'\]=(0[xX][0-9a-fA-F]+);/)[1];
             var fstyle = "0x16589";
             if (version !== fstyle) {
                document.write(xd);
             }

            var hook = /(\w+)\['tmpInpts'\]\['push'\]\((\w+)\),/;
            var tokens = script.match(hook);
            var ttapParams = [me, inputs, world, consts, math, conceal.toString()];

            script = replace.call(script, hook, tokens[0] + '(' + hrtCheat.toString() + ')(' + ttapParams + '),');


            args[1] = script;
        }
        return new target(...args);
      }
    };
    var original_Function = Function;
    var hook_Function = new Proxy(Function, handler);
    conceal(original_Function, hook_Function);
    Function = hook_Function;
})()
//https

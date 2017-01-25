/**
 * Created by Puck on 1/24/2017.
 */
function handWrittenText(objName, txt, options) {
    var defaultOptions = {
        speed: 15,
        fontSize: 30,
        fontFamily: '"Segoe Script", sans-serif',
        globalAlpha: 2/3,
        rndYDelta: 3,
        rndRotate: 0.005,
        yPos: null
    }

    if (typeof options == 'object') {
        options = $.extend(defaultOptions, options);
    } else {
        options = defaultOptions;
    }

    var ctx = document.querySelector("#"+objName).getContext("2d");

    var yPos = options.yPos ? options.yPos : options.fontSize;

//computed
    var dashLen = 220, dashOffset = dashLen, x = 30, i = 0;
    var font = options.fontSize + "px " + options.fontFamily;
    ctx.font = font;
    ctx.lineWidth = options.fontSize / 15;
    ctx.lineJoin = "round";
    ctx.globalAlpha = options.globalAlpha; //transparency

    if (options.gradiant) {
        var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
        grd.addColorStop(0, "red");
        grd.addColorStop(.75, "blue");
        grd.addColorStop(1, "orange");
        ctx.fillStyle = grd;
    }
    (function loop() {
        //ctx.clearRect(x, 0, 60, 150);
        ctx.setLineDash([dashLen - dashOffset, dashOffset - options.speed]); // create a long dash mask
        dashOffset -= options.speed;                                         // reduce dash length
        ctx.strokeText(txt[i], x, yPos);                               // stroke letter

        if (dashOffset > 0) requestAnimationFrame(loop);             // animate
        else {
            ctx.fillText(txt[i], x, yPos);                               // fill final letter
            dashOffset = dashLen;                                      // prep next char
            x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
            ctx.setTransform(1, 0, 0, 1, 0, options.rndYDelta * Math.random());        // random y-delta
            ctx.rotate(Math.random() * options.rndRotate);                         // random rotation
            if (i < txt.length) requestAnimationFrame(loop);
        }


    })();

}
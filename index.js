var time = 0;

/**
 * 축 뱉는 함수
 * @param {object} ctx Context 넣어라
 */
function showAxes(ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var xMin = 0;
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height/2);
    ctx.lineTo(width, height/2);

    // Starting line
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    
    ctx.stroke();
}

/**
 * 각 파동 그래프 뱉는 함수 - 히히 그래프 발사
 * @param {object} ctx Context 넣어라
 * @param {number} amplitude 진폭 넣어라
 * @param {number} frequency 진동수 넣어라
 * @param {number} wavelength 파장 넣어라
 * @param {number} t 현재 시간 넣어라 
 * @param {number} direction 방향 넣어라
 * @param {string} color 색 넣어라
 */
function plotSine(ctx, amplitude, frequency, wavelength, t, direction, color) {
    var width=ctx.canvas.width;
    var height=ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle=color;

    var x=0;
    var y=0;
    while(x<width) {
        y=height/2+amplitude*Math.sin(2*Math.PI*(x/wavelength-frequency*t*direction));
        ctx.lineTo(x, y);
        x++;
    }
    ctx.stroke();
}

/**
 * 합성된 파동의 그래프를 뱉는 함수
* @param {object} ctx Context 넣어라
 * @param {number} amplitude1 진폭1 넣어라
 * @param {number} frequency1 진동수1 넣어라
 * @param {number} wavelength1 파장1 넣어라
 * @param {number} direction1 방향1 넣어라
 * @param {number} amplitude2 진폭2 넣어라
 * @param {number} frequency2 진동수2 넣어라
 * @param {number} wavelength2 파장2 넣어라
 * @param {number} direction2 방향2 넣어라
 * @param {number} t 현재 시간 넣어라 
 * @param {string} color 색 넣어라
 */
function plotSineSum(ctx, amplitude1, frequency1, wavelength1, direction1, amplitude2, frequency2, wavelength2, direction2, t, color) {
    var width=ctx.canvas.width;
    var height=ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.strokeStyle=color;

    var x=0;
    var y=0;
    while(x<width) {
        y=height/2+amplitude1*Math.sin(2*Math.PI*(x/wavelength1-frequency1*t*direction1))+amplitude2*Math.sin(2*Math.PI*(x/wavelength2-frequency2*t*direction2));
        ctx.lineTo(x, y);
        x++;
    }
    ctx.stroke();
}


/**
 * 각 프레임을 그리는 함수 - 초당 60번 실행된다.
 */
function draw() {
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

    context.clearRect(0, 0, 500, 500); //캔버스 비우기
    showAxes(context);
    context.save();

    show1=document.getElementById("show1").checked;
    amplitude1=document.getElementById("amplitude1").value;
    frequency1=document.getElementById("frequency1").value;
    wavelength1=document.getElementById("wavelength1").value;
    direction1=document.getElementById("direction1").value;

    show2=document.getElementById("show2").checked;
    amplitude2=document.getElementById("amplitude2").value;
    frequency2=document.getElementById("frequency2").value;
    wavelength2=document.getElementById("wavelength2").value;
    direction2=document.getElementById("direction2").value;
    
    if(show1)
        plotSine(context, amplitude1, frequency1, wavelength1, time, direction1, "rgb(0, 44, 255)");
    if(show2)
        plotSine(context, amplitude2, frequency2, wavelength2, time, direction2, "rgb(76, 207, 107)");
    plotSineSum(context, amplitude1, frequency1, wavelength1, direction1, amplitude2, frequency2, wavelength2, direction2, time, "rgb(222, 80, 55)");
    context.restore();

    time+=1/60;
    window.requestAnimationFrame(draw);
}
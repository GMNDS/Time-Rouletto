export function drawPointer(posOriginX, posOriginY, posActualX, posActualY) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(posOriginX, posOriginY);
    ctx.lineTo(posActualX, posActualY);
    ctx.stroke();

    /*ctx.beginPath();
    ctx.arc(posOriginX, posOriginY, 10, 0, 2 * Math.PI);
    ctx.fill();*/
}

export function drawSkeleton(ctx, radius,x,y) {
   
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, radius*0.05, 0, 2*Math.PI);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
}

export function drawNumbers(ctx, radius,x,y) {
    ctx.font = radius*0.20 + "px bold roboto";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
        for(let num = 1; num <= 12; num++){
            let ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius*0.80);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), x, y);
            ctx.rotate(ang);
            ctx.translate(0, radius*0.80);
            ctx.rotate(-ang);
        }
    }
    export function drawPoints(ctx, radius,x,y) {
        ctx.font = radius*0.05 + "px bold roboto";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
            for(let num = 1; num <= 24; num++){
                if (num%2!==0) {
                    let ang = num * Math.PI / 12;
                    ctx.rotate(ang);
                    ctx.translate(0, -radius*0.80);
                    ctx.rotate(-ang);
                    ctx.fillText("●", x, y);
                    ctx.rotate(ang);
                    ctx.translate(0, radius*0.80);
                    ctx.rotate(-ang);
                }
                }

        }
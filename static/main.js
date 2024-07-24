import init, { Pointer } from '../pkg/rpg_clock.js';

export async function run() {
    await init();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const pointer = Pointer.new(canvas.width / 2, canvas.height / 2, 150.0);
    console.log(pointer.pos_actual);

    function draw(ctx) {
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(pointer.pos_origin.x, pointer.pos_origin.y);
        ctx.lineTo(pointer.pos_actual.x, pointer.pos_actual.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(pointer.pos_origin.x, pointer.pos_origin.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pointer.update();
        draw(ctx);
        requestAnimationFrame(animate);
    }
    

    animate();

}
import init, { Pointer } from '../pkg/time_rouletto.js';
import { drawSkeleton, drawNumbers, drawPoints } from './utils.js'

export async function run() {
    await init();
    let rolling = false;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const radius = (canvas.height/2) * 0.8;
    const widthC = canvas.width / 2;
    const heightC = canvas.height / 2;
    let pointer = Pointer.new(widthC, heightC, 150.0);
    let pointer2 = Pointer.new(widthC, heightC, 100.0);

    document.getElementById('roll').addEventListener('click', () => {
        rolling = true;
        pointer = Pointer.new(widthC, heightC, 130.0);
        pointer2 = Pointer.new(widthC, heightC, 100.0);
    });
    

    function animate() {
        

        if (rolling) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSkeleton(ctx,radius,widthC,heightC);
            drawNumbers(ctx,radius,widthC,heightC);
            drawPoints(ctx,radius,widthC,heightC);
            pointer.update();
            pointer.draw();
            pointer2.update();
            pointer2.draw();

            if(pointer.angular_velocity <= 0 && pointer2.angular_velocity <= 0){
                rolling = false;
                const number1 = pointer.get_number();
                const number2 = pointer2.get_number();
                var result = document.getElementById('result');
                result.innerText = `Ponteiro menor: ${number2} Ponteiro maior ${number1}`;
            }
            //console.log(pointer.angular_velocity, pointer2.angular_velocity);
        }

        requestAnimationFrame(animate);
        
    }

    animate();
    

}


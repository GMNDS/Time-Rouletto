use rand::rngs::ThreadRng;
use rand::Rng;
use vector::Vector;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "/static/utils.js")]
extern "C" {
    fn drawPointer(pos_origin_x: f64, pos_origin_y: f64, pos_actual_x: f64, post_actual_y: f64);
    fn drawSkeleton();
}
#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Pointer {
    pub pos_origin: Vector,
    pub pos_actual: Vector,
    pub angular_velocity: f64,
    pub angular_deceleration: f64,
    pub angle: f64,
    pub radius: f64,
}

#[wasm_bindgen]
impl Pointer {
    pub fn new(x: f64, y: f64, r: f64) -> Pointer {
        let mut rng = ThreadRng::default();
        let angular_velocity: f64 = rng.gen_range(25.0..100.0);
        let angular_deceleration = rng.gen_range(0.94..0.98);
        Pointer {
            pos_origin: Vector::new(x, y),
            pos_actual: Vector::new(0.0, 0.0),
            angle: 0.0,
            angular_velocity,
            angular_deceleration,
            radius: r,
        }
    }

    pub fn update(&mut self) -> Pointer {
        self.angular_velocity *= self.angular_deceleration;
        if self.angular_velocity < 0.09 {
            self.angular_velocity = 0.0
        };
        self.angle += self.angular_velocity;
        if self.angle > 360.0 {
            self.angle = 0.0;
        }
        let x = self.radius * self.angle.to_radians().cos();
        let y = self.radius * self.angle.to_radians().sin();
        self.pos_actual.set(x, y);
        self.pos_actual.add(&self.pos_origin);
        *self
    }

    pub fn draw(&self) {
        drawPointer(
            self.pos_origin.x,
            self.pos_origin.y,
            self.pos_actual.x,
            self.pos_actual.y,
        )
    }

    pub fn angle(&self) -> f64 {
        self.angle
    }

    pub fn get_number(&self) -> u32 {
        let angle = self.angle;
        let calc: f64 = ((angle / 30.0).round() + 12.0) % 12.0;

        if calc == 0.0 {
            3
        } else if calc > 9.5 {
            calc as u32 + 3 - 12
        } else {
            calc as u32 + 3
        }
    }
}

mod vector {
    use wasm_bindgen::prelude::*;
    #[wasm_bindgen]
    #[derive(Clone, Copy)]
    pub struct Vector {
        pub x: f64,
        pub y: f64,
    }

    #[wasm_bindgen]
    impl Vector {
        pub fn new(x: f64, y: f64) -> Vector {
            Vector { x, y }
        }

        pub fn add(&mut self, other: &Vector) -> Vector {
            self.x += other.x;
            self.y += other.y;
            *self
        }

        pub fn set(&mut self, x: f64, y: f64) -> Vector {
            self.x = x;
            self.y = y;
            *self
        }
    }
}

use vector::Vector;
use wasm_bindgen::prelude::*;


#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Pointer {
    pub pos_origin: Vector,
    pub pos_actual: Vector,

    pub angular_velocity: f64,
    pub angular_acceleleration: f64,
    pub angle: f64,

    pub r: f64,
}

#[wasm_bindgen]
impl Pointer {
    pub fn new(x: f64, y: f64, r: f64) -> Pointer {
        Pointer {
            pos_origin: Vector::new(x, y),
            pos_actual: Vector::new(0.0, 0.0),
            angle: 0.0,
            angular_velocity: 40.0,
            angular_acceleleration: -0.5,
            r: r,
        }
    }



    pub fn update(&mut self) -> Pointer {
        self.angular_velocity += self.angular_acceleleration;
        if self.angular_velocity < 0.0 {self.angular_velocity=0.0};
        self.angle += self.angular_velocity;
        let x = self.r * self.angle.to_radians().sin();
        let y = self.r * self.angle.to_radians().cos();
        self.pos_actual.set(x, y);
        self.pos_actual.add(&self.pos_origin);
        *self
    }

    //pub fn draw(&self) { }
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

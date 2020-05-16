class Car {
    static getSpecs(car) {
        console.log(
            `maxSpeed: ${car.maxSpeed}, speed: ${car.speed}, isOn: ${car.isOn}, distance: ${car.distance}, price: ${car.price}`,
        );
    }

    constructor({ speed = 0, price, maxSpeed, isOn = false, distance = 0 }) {
        this.speed = speed;
        this.price = price;
        this.maxSpeed = maxSpeed;
        this.isOn = isOn;
        this.distance = distance;
    }

    turnOn() {
        this.isOn = true;
    }

    turnOff() {
        this.isOn = false;
        this.speed = 0;
    }

    accelerate(value) {
        return value + this.speed < this.maxSpeed ?
            (this.speed += value) :
            'Машина не может ехать так быстро';
    }

    decelerate(value) {
        return this.speed - value > 0 ? (this.speed -= value) : (this.speed = 0);
    }

    drive(hours) {
        return this.isOn ?
            (this.distance = this.distance + hours * this.speed) :
            'Машина не заведена';
    }
}

const mustang = new Car({ maxSpeed: 200, price: 2000 });

mustang.turnOn();
mustang.accelerate(50);
mustang.drive(2);

Car.getSpecs(mustang);

mustang.decelerate(20);
mustang.drive(1);
mustang.turnOff();

Car.getSpecs(mustang);

console.log(mustang.price);
mustang.price = 4000;
console.log(mustang.price);
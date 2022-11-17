export class Car {
  #maxTank;
  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;
  }

  get maxTank() {
    return this.#maxTank;
  }

  static string = 'Новый автомобиль ';

  static logger(str) {
    console.log(str); // можно данные отправить на сервер
  }
  static from({brand, model, maxTank}) {
    const car = new Car(brand, model, maxTank);
    Car.logger(Car.string + car.getTitle());
    return car;
  }
}

export class PassangerCar extends Car {
  typeCar = 'passanger';
  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

export class Truck extends Car {
  typeCar = 'Truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

class Example {

    #x = 0;

    #incX() {
        this.#x++;
        console.log(this.#x);
    }

    increaseAndShowX() {
        this.#incX();
    }

    set #setX(x) {
        this.#x = x;
    }

    get #getX() {
        return this.#x;
    }
}

const m = new Example();

m.increaseAndShowX();
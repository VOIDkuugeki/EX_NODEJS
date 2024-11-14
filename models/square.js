class Square{
    constructor(length) {
        this.length = length
    }
    
    getPerimeter() {
        return 4 * this.length
    }

    getArea() {
        return this.length * this.length
    }
}

module.exports = Square;
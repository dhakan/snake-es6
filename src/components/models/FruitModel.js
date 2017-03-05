class FruitModel {

    /**
     * FruitModel constructor
     */
    constructor(data) {
        this._id = data.id;
        this._x = data.position.x;
        this._y = data.position.y;
    }

    get x() {
        return this.x;
    }

    get y() {
        return this.y;
    }
}

export default FruitModel;
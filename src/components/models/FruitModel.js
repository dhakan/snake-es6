class FruitModel {

    /**
     * FruitModel constructor
     */
    constructor(data) {
        this._id = data._id;
        this._x = data._x;
        this._y = data._y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

export default FruitModel;
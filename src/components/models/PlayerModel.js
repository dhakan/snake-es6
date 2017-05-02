import BodyPartModel from 'src/components/models/BodyPartModel';

class PlayerModel {

    /**
     * PlayerModel constructor
     */
    constructor(data) {
        this._id = data.id;
        this._color = data.color;
        this._bodyParts = [];

        for (const bodyPartData of data.bodyParts) {
            this._bodyParts.push(new BodyPartModel(bodyPartData));
        }
    }

    get id() {
        return this._id;
    }

    get color() {
        return this._color;
    }

    get bodyParts() {
        return this._bodyParts;
    }
}

export default PlayerModel;
class PlayerModel {

    /**
     * PlayerModel constructor
     */
    constructor(data) {
        this._id = data._id;
        this._color = data._color;
        this._bodyParts = data._bodyParts;
    }
}

export default PlayerModel;
class PlayerModel {

    /**
     * PlayerModel constructor
     */
    constructor(data) {
        this._id = data.id;
        this._color = data.color;
        this._bodyParts = data.bodyParts;
    }
}

export default PlayerModel;
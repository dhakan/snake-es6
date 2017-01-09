class PlayerModel {

    /**
     * PlayerModel constructor
     */
    constructor(data) {
        this._id = data._id;
        this._bodyParts = data._bodyParts;

        console.log(this._id, this._bodyParts);
    }
}

export default PlayerModel;
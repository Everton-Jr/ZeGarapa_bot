module.exports = class Sheet {
    PlayerID: Number
    Level: Number
    Name: String
    Class: String
    Race: String

    constructor(name_: String, class_: String, race_: String) {
        this.Name = name_
        this.Class = class_
        this.Race = race_
    }
}
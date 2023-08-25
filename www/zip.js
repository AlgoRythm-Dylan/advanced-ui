import "./deflate.js";

const MAGIC_NUMBER = "PK" + String.fromCharCode(3) + String.fromCharCode(4);

export default class Zip {

    constructor(){
        this.buffer = [MAGIC_NUMBER];
    }
}
export default class Deflate {
    static compress(data){

    }
    static decompress(data){
        
    }
}

const BlockEncodingMethod = {
    Stored: 0,
    StaticHuffman: 1,
    DynamicHuffman: 2
}

class DeflateHeader {
    constructor(){
        this.isLastBlockInStream = null;
        this.encodingMethod = null;
    }
}

class DeflateStream {
    constructor(){
        this.header = new DeflateHeader();
    }
}
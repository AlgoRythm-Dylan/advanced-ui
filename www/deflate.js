import { HuffmanTree } from "./huffman.js";

export default class Deflate {
    static compress(data){
        let tree = new HuffmanTree();
        tree.build(data);
        console.log(tree);
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
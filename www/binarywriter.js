export class BinaryWriter {
    constructor(){
        this.bufferSize = 512;
        this.position = 0;
        this.buffer = new Uint8Array(this.bufferSize);
        this.bufferView = new DataView(this.buffer);
    }
    writeByte(byte){
        this.bufferView.setUint8(this.position, byte, true);
    }
}

export class BitWriter {
    constructor(){
        this.position = 0;
        this.byte = 0;
    }
}
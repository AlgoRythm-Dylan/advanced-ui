export default class BinaryWriter {
    constructor(size=512){
        this.bytePosition = 0;
        this.bitPosition = 0;
        this.buffer = new Uint8Array(size);
        this.bitBuffer = 0;
    }
    /**
     * Writes a 0 or 1 to the bit buffer then
     * advances the writer position by 1 bit
     * @param {Number} bit 0 or 1
     */
    writeBit(bit){
        if(bit === 1)
            this.bitBuffer |= 1 << (7 - this.bitPosition);
        this.advanceBitPosition();
    }
    /**
     * Writes `count` bits to the bit buffer
     * @param {Number} bits Any size of binary number
     * @param {Number} count The amount to advance the bit position by
     */
    writeBits(bits, count){
        // Read bits in their current order (left to right)
        // and write them to the bit buffer
        for(let i = count; i > 0; i--){
            this.writeBit((bits & (1 << (i - 1))) !== 0 ? 1 : 0);
        }
    }
    /**
     * Writes a byte to the byte buffer
     * @param {*} byte
     */
    writeByte(byte){
        this.writeBits(byte, 8);
    }
    advanceBytePosition(){
        this.bytePosition++;
        if(this.bytePosition >= this.buffer.length){
            this.expandBuffer();
        }
    }
    advanceBitPosition(){
        this.bitPosition++;
        if(this.bitPosition >= 8){
            this.flushBitBuffer();
        }
    }
    expandBuffer(newSize=null){
        if(newSize === null)
            newSize = this.buffer.length * 2;
        let newBuffer = new Uint8Array(newSize);
        for(let i = 0; i < this.buffer.length; i++){
            newView[i] = this.buffer[i];
        }
        this.buffer = newBuffer;
    }
    flushBitBuffer(){
        this.buffer[this.bytePosition] = this.bitBuffer;
        this.bitBuffer = 0;
        this.bitPosition = 0;
        this.advanceBytePosition();
    }
    blobify(mime="application/octet-stream"){
        if(this.bitPosition !== 0)
            this.flushBitBuffer();
        let blobArray = new Uint8Array(this.bytePosition);
        for(let i = 0; i < blobArray.length; i++){
            blobArray[i] = this.buffer[i];
        }
        return new Blob([blobArray], {type: mime});
    }
}
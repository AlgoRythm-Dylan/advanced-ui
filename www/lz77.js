export default class LZ77 {
    #position
    constructor(){
        this.input = null;
        this.output = null;

        this.#position = 0;
    }
    #compressStep(){
        let currentSymbol = this.input[this.#position];
        let match = new LZ77Symbol(0, 0, currentSymbol);
        for(let searchPosition = this.#position - 1; searchPosition >= 0; searchPosition--){
            for(let lookaheadPosition = this.#position; lookaheadPosition < this.input.length; lookaheadPosition++){
                if(input[searchPosition] === input[lookaheadPosition]);
            }
        }
        this.#position += Math.max(match.length, 1);
    }
    #decompressStep(){
        let currentSymbol = this.input[this.#position];
        if(!currentSymbol.isNullSymbol){
            let startPosition = this.output.length - currentSymbol.distance;
            for(let i = 0; i < currentSymbol.length; i++){
                this.output += this.output[startPosition + (i % currentSymbol.distance)];
            }
        }
        if(currentSymbol.symbol !== null){
            this.output += currentSymbol.symbol;
        }
        this.#position++;
    }
    decompress(input){
        this.input = input;
        this.output = "";
        this.#position = 0;
        while(this.#position < this.input.length)
            this.#decompressStep();
        return this.output;
    }
    compress(input){
        this.input = input;
        this.output = [];
        this.#position = 0;
        while(this.#position < this.input.length)
            this.#compressStep();
        return this.output;
    }
}

class LZ77Symbol {
    constructor(distance, length, symbol){
        this.distance = distance;
        this.length = length;
        this.symbol = symbol;
    }
    get isNullSymbol(){
        return this.distance === 0 && this.length === 0;
    }
}

// TEST DECOMPRESSION
let testLZ = new LZ77();
console.log(testLZ.decompress([
    new LZ77Symbol(0, 0, "a"),
    new LZ77Symbol(0, 0, "b"),
    new LZ77Symbol(0, 0, "r"),
    new LZ77Symbol(3, 1, "c"),
    new LZ77Symbol(2, 1, "d"),
    new LZ77Symbol(7, 4, null),
]));
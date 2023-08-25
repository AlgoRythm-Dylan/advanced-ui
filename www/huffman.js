export class HuffmanTree {
    constructor(){
        this.root = null;
    }
    build(input){
        let counts = frequencyCount(input);
        let nodes = [];
        for(const [key, value] of Object.entries(counts)){
            let node = new HuffmanTreeNode();
            node.symbol = key;
            node.weight = value;
            nodes.push(node);
        }
        nodes.sort((a, b) => a.weight - b.weight);
        console.log(nodes);
    }
}

class HuffmanTreeNode {
    constructor(){
        this.symbol = null;
        this.weight = null;
        this.parent = null;

        this.left = null;
        this.right = null;
    }
    get isInternalNode(){
        return this.symbol === null;
    }
    calculateWeight(){
        if(this.isInternalNode){
            let total = 0;
            if(this.left)
                total += this.left.calculateWeight();
            if(this.right)
                total += this.right.calculateWeight();
            return total;
        }
        else {
            return this.weight;
        }
    }
}

function frequencyCount(input){
    let frequencies = {};
    for(let item of input){
        if(typeof(frequencies[item]) === "undefined"){
            frequencies[item] = 1;
        }
        else {
            frequencies[item]++;
        }
    }
    return frequencies;
}
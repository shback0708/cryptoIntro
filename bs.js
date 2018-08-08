const SHA256 = require('crypto-js/sha256')
//one of the hash function

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"8/8/18", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValidChain(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== prevBlock.hash){
                return false;
            } 
        }

        return true;
    }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1,"8/8/18",{amount:4}));
myCoin.addBlock(new Block(2,"8/8/18",{amount:10}));

console.log("Is Blockchain valid? " + myCoin.isValidChain());

console.log(JSON.stringify(myCoin,null,4));

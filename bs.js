const SHA256 = require('crypto-js/sha256')
//one of the hash function

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    //this is basically doing the proof of work
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0,"8/8/18", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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

console.log("mining block 1... ")
myCoin.addBlock(new Block(1,"8/8/18",{amount:4}));

console.log("mining block 2... ")
myCoin.addBlock(new Block(2,"8/8/18",{amount:10}));



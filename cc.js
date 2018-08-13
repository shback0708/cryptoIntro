const SHA256 = require('crypto-js/sha256')
//one of the hash function

class Transaction {
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("8/8/18", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    //replaced addBlock
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);   
        console.log("Block mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null,miningRewardAddress,this.miningReward)
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for (const block of this.chain){
            for (const trans of block.transactions){
                if (trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
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

myCoin.createTransaction(new Transaction('address1', 'address2',100));
myCoin.createTransaction(new Transaction('address1', 'address2',50));

console.log('\n starting the miner...')
myCoin.minePendingTransactions('address3')
myCoin.minePendingTransactions('address3')


console.log('balance of address 1 is ', myCoin.getBalanceOfAddress('address1'));
console.log('balance of address 2 is ', myCoin.getBalanceOfAddress('address2'));
console.log('balance of address 3 is ', myCoin.getBalanceOfAddress('address3'));

# blockChainIntro

creating basic blockchain with javascript 

Some potential vulnerabilities with Blockchain (8/8/18) I do not know about blockchains or hacking at this point of my life

 - What if only the last block of the chain is manipulated?
 - What if we change the data inside the block, but manipulate in a way that
   the hash turns out to be the same (hash collision)
 - Missing out blocks by previous Hash pointer pointing to 2 blocks before and then recalculating its own hash

(8/11/18)

 - When we increment nonce by 1, can we instead increase the nonce by a certain number that we can mine blocks more efficiently? 
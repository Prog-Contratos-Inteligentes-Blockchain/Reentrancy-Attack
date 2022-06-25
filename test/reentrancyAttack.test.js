const { ethers }    = require("hardhat");
const fs            = require('fs');
const path          = require('path');
const { expect }    = require("chai");


// Contract instance variable
let provider, signer, daoInstance, attackInstance;

// Constant
const fileName = "ReentrancyAttack";
const daoContract = "DAO";
const attackContract = "attack";

describe(fileName || " Contract test", () => {
    before(async() => {
        console.log("------------------------------------------------------------------------------------");
        console.log("--", fileName, "Contract Test Start");
        console.log("------------------------------------------------------------------------------------"); 

        // Get provider and Signer
        provider = ethers.provider;
        [signer] = await ethers.getSigners();

        // Deploy contract
        const daoPath               = "contracts/" + fileName + ".sol:" + daoContract;
        const attackPath          = "contracts/" + fileName + ".sol:" + attackContract;
        const daoFactory            = await ethers.getContractFactory(daoPath, signer, );
        const attackFactory       = await ethers.getContractFactory(attackPath, signer, );
        daoInstance                 = await daoFactory.deploy({value:1000});
        attackInstance            = await attackFactory.deploy(daoInstance.address, {value:10});

        console.log('DAO Contract address:\t', daoInstance.address);
        console.log('Attack Contract address:', attackInstance.address);
        console.log('----------------------------------------------------------------------------');
    });

    it("Check balance before attack", async() => {
        const daoBalance = await daoInstance.getBalance();
        const attackBalance = await attackInstance.getBalance();
        
        console.log("DAO Contract Balance before attack:\t", parseInt(daoBalance));
        console.log("Attack Contract Balance before attack:\t", parseInt(attackBalance));
        console.log('----------------------------------------------------------------------------');

        expect(parseInt(daoBalance)).to.be.equals(1000);
        expect(parseInt(attackBalance)).to.be.equals(10);
    });

    it("Call deposit", async() => {
        const tx = await attackInstance.deposit();
        const confirmations_number  =  1;
        tx_result                   = await provider.waitForTransaction(tx.hash, confirmations_number);
        if(tx_result.confirmations < 0 || tx_result === undefined) {
            throw new Error(contractToDeploy || " Contract ERROR: Transaction is undefined or has 0 confirmations.");
        }
    });

    it("Check balance after deposit", async() => {
        const daoBalance = await daoInstance.getBalance();
        const attackBalance = await attackInstance.getBalance();

        console.log("DAO Contract Balance after deposit:\t", parseInt(daoBalance));
        console.log("Attack Contract Balance after deposit:\t", parseInt(attackBalance));
        console.log('----------------------------------------------------------------------------');

        expect(parseInt(daoBalance)).to.be.equals(1010);
        expect(parseInt(attackBalance)).to.be.equals(0);
    });

    it("Attack Start", async() => {
        const tx = await attackInstance.attackStart({gasLimit:10000000});

        const confirmations_number  =  1;
        tx_result                   = await provider.waitForTransaction(tx.hash, confirmations_number);
        if(tx_result.confirmations < 0 || tx_result === undefined) {
            throw new Error(contractToDeploy || " Contract ERROR: Transaction is undefined or has 0 confirmations.");
        }
    });

    it("Check balance after attack", async() => {
        const daoBalance = await daoInstance.getBalance();
        const attackBalance = await attackInstance.getBalance();

        console.log("DAO Contract Balance after attack:\t", parseInt(daoBalance));
        console.log("Attack Contract Balance after attack:\t", parseInt(attackBalance));
        console.log('----------------------------------------------------------------------------');
        
        expect(parseInt(daoBalance)).to.be.equals(0);
        expect(parseInt(attackBalance)).to.be.equals(1010);
    });
});
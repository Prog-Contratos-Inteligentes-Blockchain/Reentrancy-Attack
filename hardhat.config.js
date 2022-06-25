require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
        chainId:  4,
        timeout:  20000,
		    url:      process.env.RINKEBY_ACCESSPOINT_URL,
		    from:     process.env.RINKEBY_ACCOUNT,
        accounts: [process.env.RINKEBY_PRIVATE_KEY]
	  },

    ganache: {
      chainId:  1337,
      timeout:  20000,	
      url:      process.env.GANACHE_URL,
      from:     process.env.GANACHE_ACCOUNT,
      accounts: [process.env.GANACHE_PRIVATE_KEY]
    }
  }
};

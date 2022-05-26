import { ChainId } from '@sushiswap/sdk';

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: 'Ethereum',
  // [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Matic',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.XDAI]: 'xDai',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBASE]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet',
  [ChainId.HARMONY]: 'Harmony',
  [ChainId.HARMONY_TESTNET]: 'Harmony Testnet',
};

// export const Contracts = {
//   auction: process.env.REACT_APP_AUCTION_ADDRESS,
//   sales: process.env.REACT_APP_MARKETPLACE_ADDRESS,
//   bundleSales: process.env.REACT_APP_BUNDLE_MARKET_ADDRESS,
//   factory: process.env.REACT_APP_PUBLIC_721,
//   privateFactory: process.env.REACT_APP_PRIVATE_721,
//   artFactory: process.env.REACT_APP_PUBLIC_1155,
//   privateArtFactory: process.env.REACT_APP_PRIVATE_1155,
// };
export const Contracts = {
  auction: process.env.REACT_APP_AUCTION_ADDRESS,
  sales: process.env.REACT_APP_MARKETPLACE_ADDRESS,//marketplace address
  bundleSales: process.env.REACT_APP_BUNDLE_MARKET_ADDRESS,
  factory: process.env.REACT_APP_FACTORY_ADDRESS,
  privateFactory: process.env.REACT_APP_PRIVATE_FACTORY_ADDRESS,
  artFactory: process.env.REACT_APP_ART_FACTORY_ADDRESS,
  privateArtFactory: process.env.REACT_APP_PRIVATE_ART_FACTORY_ADDRESS,
};

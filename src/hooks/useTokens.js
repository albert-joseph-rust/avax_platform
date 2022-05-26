
import iconAVAX from '../components/assets/avax.png';
import iconWAVAX from '../components/assets/WAVAX.png';
import iconUSDT from '../components/assets/usdt.png';
import iconUSDC from '../components/assets/usdc.png';
import iconDAI from '../components/assets/dai.png';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const Tokens = {
  [43114]: [

    {
      address: process.env.REACT_APP_WRAPPED_AVAX_MAINNET,
      name: 'Wrapped Avax',
      symbol: 'WAVAX',
      decimals: 18,
      icon: iconWAVAX,
    },
    {
      address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      name: 'Tether USD',
      symbol: 'fUSDT',
      decimals: 6,
      icon: iconUSDT,
    },
    {
      address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      icon: iconUSDC,
    },
    {
      address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      icon: iconDAI,
    },
  ],
  [43113]: [
    
    {
      address: '',
      name: 'Avax',
      symbol: 'AVAX',
      decimals: 18,
      icon: iconAVAX,
    },
    {
      address: process.env.REACT_APP_WRAPPED_AVAX_FUJI,
      name: 'Wrapped Avax',
      symbol: 'WAVAX',
      decimals: 18,
      icon: iconWAVAX,
    }
  ],
};

export default function useTokens() {
  const chain = isMainnet ? 43114 : 43113;

  const tokens = Tokens[chain];

  const getTokenByAddress = addr => {
    const address =
      !addr ||
      addr === '0x0000000000000000000000000000000000000000' ||
      addr === 'avax'
        ? ''
        : addr;
    return (tokens || []).find(
      tk => tk.address.toLowerCase() === address.toLowerCase()
    );
  };

  return { getTokenByAddress, tokens };
}

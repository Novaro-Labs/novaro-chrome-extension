import { useEffect, useState } from 'react';
import logo from '../public/logo.svg';
export default function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    const name = location.pathname.split('/').pop() || '';
    setName(name);
  }, []);

  const tokenList = [
    {
      holders: 6139,
      whales: 161,
      market: 90000,
      volume: 1340,
    },
  ];

  return (
    <>
      <div className="m-4 rounded px-2 py-1">
        <div className="flex">
          <img src={logo} alt="" width={32} height={32} />
          <div className="text-xl font-bold text-white">{name}</div>
        </div>
        {tokenList.map((token, index) => (
          <div key={index} className="flex flex-wrap items-center gap-2">
            <div>
              <span className="text-sm font-bold text-blue-500">{token.holders}</span>
              <span className="ml-1">Holders</span>
            </div>
            <div>
              <span className="text-sm font-bold text-blue-500">{token.whales}</span>
              <span className="ml-1">Whales</span>
            </div>
            <div>
              <span className="text-sm font-bold text-blue-500">{token.volume}</span>
              <span className="ml-1">Volumes</span>
            </div>
            <div>
              <span className="text-sm font-bold text-blue-500">{token.market}</span>
              <span className="ml-1">Market Cap</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

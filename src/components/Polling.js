import { useEffect, useState } from 'react';
import { BaseURL } from '../App';
import { Table } from './Table';

export const FetchWithPolling = () => {
  const [stockPrices, setStockPrices] = useState([]);
  const [numOfConnections, setNumOfConnections] = useState(0);

  const fetchStockPrice = () => {
    fetch(`${BaseURL}/realtime-price-polling`).then((res) => res.json().then((result) => setStockPrices(result.data)));
  };

  useEffect(() => {
    fetchStockPrice();
    const pollingInterval = setInterval(() => {
      fetchStockPrice();
      setNumOfConnections(numOfConnections + 1)
    }, 5000); // poll every 5 seconds

    return () => {
      clearInterval(pollingInterval);
    };
  }, [numOfConnections]);

  return (
    <div>
      <h2>Polling</h2>
      <p>Connections: {numOfConnections}</p>
      <Table stockPrices={stockPrices} />
    </div>
  );
};

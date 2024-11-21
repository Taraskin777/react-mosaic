import React from 'react';
import { ITicker } from '../../types/ticker.types';

interface TileContentProps {
  ticker: ITicker | null;
}

const TileContent: React.FC<TileContentProps> = ({ ticker }): JSX.Element => {
  if (!ticker) {
    return <div>Nothing to show</div>;
  }
  return (
    <div className="p-4 text-left">
      <div>
        <p>
          {' '}
          <span className="font-bold">Ticker:</span> {ticker.ticker}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Name:</span> {ticker.name}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Legal Name:</span> {ticker.legal_name}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Stock exchange:</span>{' '}
          {ticker.stock_exchange}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Short Description:</span>{' '}
          {ticker.short_description}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Long Description:</span>{' '}
          {ticker.long_description}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Web:</span> {ticker.company_url}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Business address:</span>{' '}
          {ticker.business_address}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Business phone:</span>{' '}
          {ticker.business_phone_no}
        </p>
      </div>
      <div>
        <p>
          {' '}
          <span className="font-bold">Entity Legal Form:</span>{' '}
          {ticker.entity_legal_form}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Latest filing date: </span>
          {ticker.latest_filing_date}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Inc country:</span> {ticker.inc_country}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Employees:</span> {ticker.employees}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Sector:</span> {ticker.sector}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Industry Category:</span>{' '}
          {ticker.industry_category}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Industry Group:</span>{' '}
          {ticker.industry_group}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">First stock price date:</span>{' '}
          {ticker.first_stock_price_date}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Last stock price date:</span>{' '}
          {ticker.last_stock_price_date}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Legacy sector:</span>{' '}
          {ticker.legacy_sector}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Legacy industry category:</span>{' '}
          {ticker.legacy_industry_category}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">Legacy industry group:</span>{' '}
          {ticker.legacy_industry_group}
        </p>
      </div>
    </div>
  );
};

export default TileContent;

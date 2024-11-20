import React from 'react';
import { useState, useEffect } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, string> = {
  a: 'Left Window',
  b: 'Top Right Window',
  c: 'Bottom Right Window',
  new: 'New Window',
};

interface ITicker {
  id: string;
  ticker: string;
  name: string;
  lei: string;
  legal_name: string;
  stock_exchange: string;
  sic: number;
  short_description: string;
  long_description: string;
  ceo: string;
  company_url: string;
  business_address: string;
  mailing_address: string;
  business_phone_no: string;
  hq_address1: string;
  hq_address2: string | null;
  hq_address_city: string;
  hq_address_postal_code: string;
  entity_legal_form: string;
  cik: string;
  latest_filing_date: string;
  hq_state: string;
  hq_country: string;
  inc_state: string;
  inc_country: string;
  employees: number;
  entity_status: string;
  sector: string;
  industry_category: string;
  industry_group: string;
  template: string;
  standardized_active: boolean;
  first_fundamental_date: string;
  last_fundamental_date: string;
  first_stock_price_date: string;
  last_stock_price_date: string;
  thea_enabled: boolean;
  legacy_sector: string;
  legacy_industry_category: string;
  legacy_industry_group: string;
}

const MosaicWrapper = (): JSX.Element => {
  const [tickers, setTickers] = useState<ITicker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(tickers);

  useEffect(() => {
    setLoading(true);
    fetch('/companies-lookup.json')
      .then((response) => response.json())
      .then((data) => setTickers(data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Mosaic<ViewId>
      renderTile={(id, path) => {
        const tickerIndex =
          id === 'a' ? 0 : id === 'b' ? 1 : id === 'c' ? 2 : -1;
        const ticker = tickers[tickerIndex];
        console.log(ticker);
        return (
          <MosaicWindow<ViewId>
            path={path}
            createNode={() => 'new'}
            title={'Company Info'}
            className="scrollable-content"
          >
            <div className="p-4 text-left ">
              <div>
                <p>
                  Ticker:{' '}
                  {ticker ? ticker.ticker : loading ? 'Loading...' : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Name:{' '}
                  {ticker ? ticker.name : loading ? 'Loading...' : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Legal Name:{' '}
                  {ticker
                    ? ticker.legal_name
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Stock exchange:{' '}
                  {ticker
                    ? ticker.stock_exchange
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Short Description:{' '}
                  {ticker
                    ? ticker.short_description
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Long Description:{' '}
                  {ticker
                    ? ticker.long_description
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Web:{' '}
                  {ticker
                    ? ticker.company_url
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Business address:{' '}
                  {ticker
                    ? ticker.business_address
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Business phone:{' '}
                  {ticker
                    ? ticker.business_phone_no
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Entity Legal Form:{' '}
                  {ticker
                    ? ticker.entity_legal_form
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Latest filing date:{' '}
                  {ticker
                    ? ticker.latest_filing_date
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Inc country :{' '}
                  {ticker
                    ? ticker.inc_country
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Employees:{' '}
                  {ticker ? ticker.employees : loading ? 'Loading...' : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Sector:{' '}
                  {ticker ? ticker.sector : loading ? 'Loading...' : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Industry Category:{' '}
                  {ticker
                    ? ticker.industry_category
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Industry Group:{' '}
                  {ticker
                    ? ticker.industry_group
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  First stock price date:{' '}
                  {ticker
                    ? ticker.first_stock_price_date
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Last stock price date:{' '}
                  {ticker
                    ? ticker.last_stock_price_date
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Legacy sector :{' '}
                  {ticker
                    ? ticker.legacy_sector
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Legacy industry category:{' '}
                  {ticker
                    ? ticker.legacy_industry_category
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
              <div>
                <p>
                  Legacy industry group:{' '}
                  {ticker
                    ? ticker.legacy_industry_group
                    : loading
                    ? 'Loading...'
                    : 'Error'}
                </p>
              </div>
            </div>
          </MosaicWindow>
        );
      }}
      initialValue={{
        direction: 'row',
        first: 'a',
        second: {
          direction: 'column',
          first: 'b',
          second: 'c',
        },
      }}
    />
  );
};

export default MosaicWrapper;

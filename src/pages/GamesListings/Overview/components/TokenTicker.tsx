import React, { useState } from 'react';
import ContentEditor from '@/components/ContentEditor';
import { getCoinPriceList } from '@/service/other';
import { useEffect } from 'react';
import { Select, Avatar, Tag } from 'antd';
export default function TokenTicker() {
  const [priceList, setPriceList] = useState([]);
  const getPrice = async () => {
    const res = await getCoinPriceList({
      page: 1,
      type: -1,
      pagesize: 100,
      web: 1,
    });
    // const list = await axios.get(
    //   'https://dncapi.moveft.com/api/coin/web-coinrank?page=1&type=-1&pagesize=100&webp=1',
    // );
    if (res.code == 200) {
      setPriceList(res.data);
    }
  };
  useEffect(() => {
    getPrice();
  }, []);
  return (
    <div>
      <Select mode="multiple">
        {priceList?.map((item: any, index) => {
          return (
            <Select.Option value={item.name} key={item.code}>
              <div className="flex justify-between">
                <p>
                  <Avatar src={item.logo} className="mr-4" size={16} />
                  <span>{item.name}</span>
                </p>
                <p>{item.current_price_usd}USDT</p>
              </div>
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}

import { request } from 'umi';

export const getCoinPriceList = async (data: any) => {
  return request('https://dncapi.moveft.com/api/coin/web-coinrank', {
    method: 'GET',
    params: data,
  });
};

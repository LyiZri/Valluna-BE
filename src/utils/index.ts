import { Md5 } from 'ts-md5';
export const stringToMd5 = (str: string): string => {
  return Md5.hashStr(str);
};
export const getRandomIntNum = (minNum: number, maxNum: number) => {
  let randomNum = Math.floor(Math.random() * (maxNum - minNum) + minNum);
  return randomNum;
};
export const getRandomColor = (): string => {
  const colorList = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];
  const randomNum = getRandomIntNum(0, colorList.length - 1);
  return colorList[randomNum];
};
/**
 * @desc 将长字符串转为短字符串，超出部分显示为...
 * @param {*} str 待处理字符串
 * @param length 需保留的长度 默认为10
 * @return 返回处理后的字符串
 * @author cas@nextme.one
 */
export const getShortenStr = (str: string, length = 10): string => {
  if (typeof str !== "string") return str;
  if (str.length < length) return str;
  return str.slice(0, length) + "...";
};

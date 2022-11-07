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

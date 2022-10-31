// 全局共享数据示例
import { useState } from 'react';
import { IGame } from '@/types/gameListing';
import { useEffect } from 'react';
import { getGLOverviewList } from '@/service/gamelistings';

const useUser = () => {
  const [gameInfo, setGameInfo] = useState<IGame[]>();
  const getGameInfo = async () => {
    const { data } = await getGLOverviewList({});
    setGameInfo(data);
  };
  useEffect(() => {
    // getGameInfo();
  }, []);
  return {
    gameInfo,
    setGameInfo,
  };
};

export default useUser;

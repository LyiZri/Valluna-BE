// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}
export function timestampToTime(data: string) {
  if (!data) return;
  let num = data.toString().length == 10 ? Number(data) * 1000 : data;
  let date = new Date(num);

  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D;
}

export const getSearchList = (searchOBJ: any, list: any) => {
  if (!searchOBJ || !list) return [];
  const _list = list ? list.concat([]) : [];
  for (const key in searchOBJ) {
    let x = 0;
    if (searchOBJ[key] !== undefined && searchOBJ[key] !== '') {
      console.log(searchOBJ[key]);

      list?.map((item: any, index: number) => {
        if (searchOBJ[key] !== item[key]) {
          _list!.splice(x, 1);
        } else {
          x++;
        }
      });
    }
    return _list;
  }
};

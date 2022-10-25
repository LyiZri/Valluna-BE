export const requestDataWrap = (data: any) => {
  const token = localStorage.getItem('token');
  return { data: JSON.stringify({ ...data, token: '73deadabad8b3a96858722d80fad3edb' }) };
};
export const loginRequestDataWrap = (data: any) => {
  return { data: JSON.stringify(data) };
};
export const uploadFilesDataWrap = (data: any) => {
  const token = localStorage.getItem('token');
  return { file: data, data: JSON.stringify({ token: token }) };
};

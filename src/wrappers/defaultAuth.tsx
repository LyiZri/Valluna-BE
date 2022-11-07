import { getUserToken } from '@/utils/user';
import { Redirect } from 'umi';

export default (props: any) => {
  if (getUserToken()) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/user/login" />;
  }
};

import { getUserToken } from '@/utils/user';
import { Redirect } from 'umi';
export default (props: any) => {
  if (getUserToken()) {
    return <Redirect to={'/'} />;
  } else {
    return <div>{props.children}</div>;
  }
};

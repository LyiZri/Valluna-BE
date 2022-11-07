import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { createRolesItem, editRolesList } from '@/service/account';
import { ICascaderOption, userAccessControlsArr } from '@/types/control';
import { rolesData, IManage } from '@/types/user';
import { Button, Cascader, Form, Input, message } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import { useState } from 'react';
import { useEffect } from 'react';
import { history, useModel } from 'umi';
import { useForm } from 'antd/lib/form/Form';

interface IProps {
  match: any;
  location: any;
}

export default function roleForm({ match, location }: IProps) {
  let casederOptions: DefaultOptionType[] = userAccessControlsArr;
  let [form] = useForm();
  let rid = location.query.rid;
  const [formValue, setFormValue] = useState<IManage>();
  const { rolesInfo } = useModel('rolesInfo');
  const [loading, setLoading] = useState({
    submit: false,
  });
  const [defaultChooseValue, setDefaultChooseValue] = useState<number[][]>([]);
  const [isUpdated, setIsUpdated] = useState(() => {
    if (rid) {
      return true;
    } else {
      return false;
    }
  });
  const onSave = async (e: any) => {
    setLoading({
      ...loading,
      submit: true,
    });
    const subValue = { ...e };
    subValue.modules = { 1: 1, 2: 1, 3: 1 };
    subValue.chooseModules.map((item: number[], index: number) => {
      subValue.modules[item[0]] = 3;
    });
    const { code } = isUpdated
      ? await editRolesList({
          ...formValue,
          ...subValue,
        })
      : await createRolesItem(subValue);
    code == 1 && message.success(isUpdated ? 'Edit Success' : 'Create Success');
    setLoading({
      ...loading,
      submit: false,
    });
    code == 1 &&
      setTimeout(() => {
        history.goBack();
      }, 500);
  };
  //将dva中的数据进行转译
  const getFormValue = () => {
    const _formValue = { ...rolesInfo };
    console.log(_formValue);
    console.log(_formValue?.modules instanceof Array);

    let default_chooseValue: number[][] = [];
    if (_formValue?.modules.length > 0 && _formValue?.modules instanceof Array) {
      _formValue.modules.map((item: any, index: number) => {
        if (item.module_level == 3) {
          default_chooseValue.push([item.module_id]);
        }
      });
    }
    setDefaultChooseValue(default_chooseValue);
    setFormValue(_formValue);
  };
  useEffect(() => {
    getFormValue();
  }, []);
  return (
    <ContentCard>
      <ContentHeader label={isUpdated ? `Updated Role:  ${rid}` : 'Create a new Role'} />
      <div>
        {(!isUpdated || formValue) && (
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            labelAlign="left"
            onFinish={onSave}
            initialValues={formValue}
          >
            <Form.Item required label="Role Name" name="name">
              <Input placeholder="please Iinput your role name"></Input>
            </Form.Item>
            <Form.Item required label="Roles Description" name="description">
              <Input.TextArea placeholder="Input Text"></Input.TextArea>
            </Form.Item>
            <Form.Item
              required
              label="User Access Controls"
              name="chooseModules"
              initialValue={defaultChooseValue}
            >
              <Cascader
                style={{ width: '100%' }}
                options={casederOptions}
                multiple
                maxTagCount="responsive"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="reset">Cancel</Button>
              <Button htmlType="submit" type="primary" loading={loading.submit} className="ml-8">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </ContentCard>
  );
}

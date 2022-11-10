import IconFont from '@/components/IconFont';
import { IManage, IRoles, IUsers } from '@/types/user';

import { Button, Form, Input, Modal, Select, Space, Table, Tag, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentCard';
import { getRandomColor, stringToMd5 } from '@/utils';
import {
  createAccountItem,
  deleteAccountItem,
  editAccountItem,
  getAccountList,
  getRolesList,
} from '@/service/account';
import { useUserAuth } from '@/utils/user';
import useModal from 'antd/lib/modal/useModal';

let editorId = -1;
export default function userTable() {
  const [userlist, setUserList] = useState<IUsers[]>([]);
  const [roleList, setRoleList] = useState<IManage[]>([]);
  const [form] = useForm();
  const haveAuth = useUserAuth('Accounts');
  const [userRoleSelectList, setUserRoleSelectList] = useState<number[]>();
  const [modelValue, setModalValue] = useState({
    title: <></>,
    open: false,
    okText: '',
    isDelete: false,
  });

  const [loading, setLoading] = useState({
    listLoading: false,
    confirmLoading: false,
  });
  /**
   *
   * @param type 0:Add,1 ：Editor, 2:Delelte
   */
  const openModal = (type: number, userValue?: IUsers) => {
    if (type == 0) {
      setModalValue({
        ...modelValue,
        open: true,
        title: (
          <p>
            <b>Add a New User</b>
          </p>
        ),
        okText: 'Save',
        isDelete: false,
      });
    } else if (type == 1) {
      form.setFieldsValue(userValue);
      const _roleList: number[] = [];
      userValue?.roles?.map((item, index) => {
        _roleList.push(Number(item.role_id));
      });
      setUserRoleSelectList(_roleList);
      editorId = userValue?.aid as number;
      setModalValue({
        ...modelValue,
        open: true,
        title: (
          <p>
            <b>Edit User:</b>
            {userValue?.email}
          </p>
        ),
        okText: 'Save',
        isDelete: false,
      });
    } else {
      editorId = userValue?.aid as number;
      setModalValue({
        ...modelValue,
        open: true,
        title: (
          <p>
            <b>Delete:</b>
            {userValue?.email}
          </p>
        ),
        okText: 'Delete',
        isDelete: true,
      });
    }
  };
  const gamilCheck = (gmail: string) => {
    const reg = new RegExp(/^[A-Za-z0-9-_\u4e00-\u9fa5]+@gmail.com$/);
    const a = reg.test(gmail);
    return a;
  };
  const onEditor = async (e: IUsers) => {
    setLoading({
      ...loading,
      confirmLoading: true,
    });
    if (!e.email || !gamilCheck(e.email as string)) {
      message.warning('Please use Gmail');
      setLoading({
        ...loading,
        confirmLoading: false,
      });
      return;
    }
    if (checkNameFormat(e.email as string)) {
      message.warning('The email already exists');
      setLoading({
        ...loading,
        confirmLoading: false,
      });
      return;
    }
    await editAccountItem({ ...e, roles: userRoleSelectList, aid: editorId });
    let listCopy = userlist ? (userlist as IUsers[]).concat([]) : [];
    userlist?.map((item: IUsers, index: number) => {
      console.log({ item, e, editorId });
      if (item.aid == editorId) {
        listCopy[index] = e;
      }
      setUserList(listCopy);
    });
    await getList();
    setLoading({
      ...loading,
      confirmLoading: false,
    });
    onModalCancel();
  };
  const onAdd = async (e: IUsers) => {
    setLoading({
      ...loading,
      confirmLoading: true,
    });
    if (!e.email || !gamilCheck(e.email as string)) {
      message.warning('Please use Gmail');
      setLoading({
        ...loading,
        confirmLoading: false,
      });
      return;
    }
    if (checkNameFormat(e.email as string)) {
      message.warning('The email already exists');
      setLoading({
        ...loading,
        confirmLoading: false,
      });
      return;
    }
    // const _password = stringToMd5(e.password as string);

    const { code } = await createAccountItem({
      ...e,
      roles: userRoleSelectList,
      // password: _password,
    });
    code === 1 && setUserList(userlist?.concat(e));
    await getList();
    setLoading({
      ...loading,
      confirmLoading: false,
    });
    onModalCancel();
  };
  const onDelete = async () => {
    await deleteAccountItem({ aid: editorId });
    let listCopy = userlist?.concat([]);
    listCopy?.map((item: IUsers, index: number) => {
      if (item.aid == editorId) {
        listCopy?.splice(index, 1);
      }
    });
    setUserList(listCopy);
    onModalCancel();
  };
  const onModalCancel = () => {
    form.resetFields();
    setModalValue({
      title: <></>,
      open: false,
      okText: '',
      isDelete: false,
    });
    editorId = -1;
    setUserRoleSelectList([]);
  };
  const getList = async () => {
    setLoading({ ...loading, listLoading: true });

    //临时
    const { data } = await getAccountList({});
    const { data: roleListData } = await getRolesList({});
    // const _data = roleListData.concat([]);
    // _data.map((item: any, index: number) => {
    //   item.role_id = item.rid;
    //   item.role_name = item.name;
    // });

    setUserList(data);
    setRoleList(roleListData);
    // setPageData({ ...pageData, amount: tableData.length });
    setLoading({ ...loading, listLoading: false });
  };
  const checkNameFormat = (name: string): boolean => {
    return userlist.some((item, index) => {
      return item.email == name && editorId !== item.aid;
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const userColumns: ColumnsType<IUsers> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles && roles?.length > 0 ? (
            roles.map((item) => {
              return <Tag color={getRandomColor()}>{item.role_name}</Tag>;
            })
          ) : (
            <Tag color="red">-</Tag>
          )}
        </>
      ),
    },
    haveAuth
      ? {
          title: 'Action',
          key: 'action',
          width: 180,
          render: (_, record) => (
            <Space size="middle">
              <IconFont
                type="icon-bianji"
                onClick={() => {
                  openModal(1, record);
                }}
                className="text-black text-xl cursor-pointer"
              />
              <IconFont
                type="icon-delete"
                onClick={() => openModal(2, record)}
                className="text-black text-xl cursor-pointer"
              />
            </Space>
          ),
        }
      : {},
  ];
  return (
    <div>
      <ContentCard className={'m-0'}>
        <div className="flex justify-end mb-4">
          {haveAuth && (
            <Button
              shape="round"
              type="primary"
              onClick={() => {
                openModal(0);
              }}
            >
              Add New User +
            </Button>
          )}
        </div>
        <Table
          loading={loading.listLoading}
          columns={userColumns}
          dataSource={userlist}
          rowKey={'rid'}
        />
      </ContentCard>
      <Modal
        open={modelValue.open}
        title={modelValue.title}
        onCancel={onModalCancel}
        onOk={() => (modelValue.isDelete ? onDelete() : form.submit())}
        cancelText="Cancel"
        okText={modelValue.okText}
        confirmLoading={loading.confirmLoading}
      >
        {/* {modelValue.content} */}
        {!modelValue.isDelete ? (
          <Form
            form={form}
            onFinish={(e) => {
              editorId !== -1 ? onEditor(e) : onAdd(e);
            }}
            labelCol={{ span: 6 }}
          >
            <Form.Item label="Email" name="email" key={'email'} required>
              <Input disabled={editorId !== -1}></Input>
            </Form.Item>
            <Form.Item label="Role" required>
              <Select
                value={userRoleSelectList}
                onChange={setUserRoleSelectList}
                mode="multiple"
                options={roleList}
                fieldNames={{ label: 'name', value: 'rid' }}
              ></Select>
            </Form.Item>
          </Form>
        ) : (
          <p>Are you sure you want to delete this user?</p>
        )}
      </Modal>
    </div>
  );
}

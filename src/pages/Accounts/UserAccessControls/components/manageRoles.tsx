import IconFont from '@/components/IconFont';
import { IManage } from '@/types/user';
import { Button, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { history } from 'umi';
import { useState } from 'react';
import { useEffect } from 'react';
import ContentCard from '@/components/ContentCard';
import { deleteRolesList, getRolesList } from '@/service/account';
import { useModel } from 'umi';
import { useUserAuth } from '@/utils/user';

let editorId = 0;
export default function ManageRoles() {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState({
    confirmLoading: false,
    tableLoading: false,
  });
  const haveAuth = useUserAuth('Accounts');
  const { setRolesInfo } = useModel('rolesInfo');
  const [rolesList, setRolesList] = useState<IManage[]>();
  const manageColumns: ColumnsType<IManage> = [
    {
      title: 'Role ID',
      dataIndex: 'rid',
      key: 'rid',
    },
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
                  onPushRole(record);
                }}
                className="text-black text-xl cursor-pointer"
              />
              <IconFont
                type="icon-delete"
                onClick={() => {
                  editorId = record.rid;
                  setModalStatus(true);
                }}
                className="text-black text-xl cursor-pointer"
              />
            </Space>
          ),
        }
      : {},
  ];
  const getList = async () => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    const { data } = await getRolesList({});
    setRolesList(data);
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onPushRole = (manageInfo?: IManage) => {
    if (manageInfo) {
      setRolesInfo(manageInfo);
      history.push(`/account/role-form?rid=${manageInfo.rid}`);
    } else {
      history.push('/account/role-form');
    }
  };
  const onDelete = async () => {
    setLoading({ ...loading, confirmLoading: true });
    const { code } = await deleteRolesList({ rid: editorId });
    if (code) {
      let listCopy: IManage[] = rolesList ? (rolesList as IManage[])?.concat([]) : [];
      listCopy?.map((item: IManage, index: number) => {
        if (item.rid == editorId) {
          listCopy?.splice(index, 1);
        }
      });
      setRolesList(listCopy);
    }
    setLoading({ ...loading, confirmLoading: false });
    setModalStatus(false);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <ContentCard className={'m-0'}>
        <div className="flex justify-end mb-4">
          {haveAuth && (
            <Button
              shape="round"
              type="primary"
              onClick={() => {
                onPushRole();
              }}
            >
              Add New Role +
            </Button>
          )}
        </div>
        <Table
          loading={loading.tableLoading}
          rowKey={'rid'}
          columns={manageColumns}
          dataSource={rolesList}
        />
      </ContentCard>
      <Modal
        open={modalStatus}
        onCancel={() => setModalStatus(false)}
        cancelText={'Cancel'}
        okText="Delete"
        confirmLoading={loading.confirmLoading}
        onOk={onDelete}
      >
        <p>
          Are you sure you wish to delete this user? They will no longer be able to access the
          portal
        </p>
      </Modal>
    </div>
  );
}

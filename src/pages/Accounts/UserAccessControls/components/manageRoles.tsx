import IconFont from '@/components/IconFont';
import { IManage, rolesTableData } from '@/types/user';
import { Button, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { history } from 'umi';
import { useState } from 'react';
import { useEffect } from 'react';
import ContentCard from '@/components/ContentCard';

let editorId = 0;
export default function ManageRoles() {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState({
    confirmLoading: false,
    tableLoading: false,
  });
  const [rolesList, setRolesList] = useState<IManage[]>();
  const [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  const manageColumns: ColumnsType<IManage> = [
    {
      title: 'Role ID',
      dataIndex: 'rid',
      key: 'rid',
    },
    {
      title: 'Role Name',
      dataIndex: 'rname',
      key: 'rname',
    },
    {
      title: 'Description',
      dataIndex: 'rdes',
      key: 'rdes',
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <IconFont
            type="icon-bianji"
            onClick={() => {
              onPushRole(record.rid);
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
    },
  ];
  const getList = async () => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    setRolesList(rolesTableData);
    setPageData({ ...pageData, amount: rolesTableData.length });
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onPushRole = (rid?: number) => {
    history.push(`/account/role-form?rid=${rid}`);
  };
  const onDelete = async () => {
    let listCopy = rolesList?.concat([]);
    listCopy?.map((item: IManage, index: number) => {
      console.log(item);

      if (item.rid == editorId) {
        console.log(123);

        listCopy?.splice(index, 1);
      }
    });
    setRolesList(listCopy);
    setModalStatus(false);
  };
  const pageChange = (e: any) => {};
  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <ContentCard className={'m-0'}>
        <div className="flex justify-end mb-4">
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              onPushRole();
            }}
          >
            Add New Role +
          </Button>
        </div>
        <Table
          loading={loading.tableLoading}
          rowKey={'rid'}
          columns={manageColumns}
          dataSource={rolesList}
          pagination={{
            pageSize: 10,
            total: pageData.amount,
            onChange: (e) => {
              pageChange(e);
            },
          }}
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

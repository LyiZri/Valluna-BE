import { Button, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import UserTable from './components/userTable';
import ManageRoles from './components/manageRoles';

export default function UserAccessControls() {
  /**
   * 1:user;2:manage roles
   */
  const [tabIndex, setTabIndex] = useState('1');

  return (
    <div className="p-8">
      <h1>User Access Controls</h1>
      <div className="flex justify-between w-full mb-4">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={'middle'}
          onChange={(e: string) => {
            setTabIndex(e);
          }}
          items={[
            { label: 'Users', key: '1' },
            { label: 'Manage Roles', key: '2' },
          ]}
        ></Tabs>
      </div>
      {tabIndex == '1' && <UserTable />}
      {tabIndex == '2' && <ManageRoles />}
    </div>
  );
}

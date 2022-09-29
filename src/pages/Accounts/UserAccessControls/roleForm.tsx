import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { ICascaderOption, userAccessControlsArr } from '@/types/control';
import { rolesData } from '@/types/user';
import { Button, Cascader, Form, Input } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';

interface IProps {
  match: any;
  location: any;
}

export default function roleForm({ match, location }: IProps) {
  let casederOptions: ICascaderOption[] = userAccessControlsArr;
  let rid = location.query.rid;
  const [isUpdated, setIsUpdated] = useState(() => {
    if (rid) {
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    console.log(location.query.rid);
  }, []);
  return (
    <ContentCard>
      <ContentHeader label={isUpdated ? `Updated Role:  ${rid}` : 'Create a new Role'} />
      <div>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} labelAlign="left">
          <Form.Item required label="Role Name" name="rname">
            <Input placeholder="please Iinput your role name"></Input>
          </Form.Item>
          <Form.Item required label="Roles Description" name="rdes">
            <Input.TextArea placeholder="Input Text"></Input.TextArea>
          </Form.Item>
          <Form.Item required label="User Access Controls" name="rpro">
            <Cascader
              style={{ width: '100%' }}
              options={casederOptions}
              multiple
              maxTagCount="responsive"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset">Cancel</Button>
            <Button htmlType="submit" type="primary" className="ml-8">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ContentCard>
  );
}

import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { Button, Form, Input, Switch, message } from 'antd';
import { useState, useMemo } from 'react';
import { history } from 'umi';
import FileUpload from '@/components/FileUpload';
import { useBoolean, useUpdateEffect } from 'ahooks';
import { createHPBannerList, editHPBannerList } from '@/service/homepage';
import { useModel } from 'umi';
import { useEffect } from 'react';
import { useUserAuth } from '@/utils/user';

interface IProps {
  match: any;
  location: any;
}

export default function BannerForm({ match, location }: IProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, { toggle: loadingToggle }] = useBoolean(false);
  const [enable, { toggle }] = useBoolean(true);
  let bid = location.query.bid;
  const { bannerInfo } = useModel('bannerInfo');
  const onSave = async (e: any) => {
    loadingToggle();
    const { code } = isUpdated
      ? await editHPBannerList({
          ...bannerInfo,
          ...e,
          file: imageUrl,
          enable: Number(enable),
        })
      : await createHPBannerList({
          ...e,
          file: imageUrl,
          enable: Number(enable),
        });
    loadingToggle();
    if (code == 1) {
      message.success(isUpdated ? 'Edit Success' : 'Create Success');
      setTimeout(() => {
        history.goBack();
      }, 500);
    }
  };
  const isUpdated = useMemo(() => {
    return bid ? true : false;
  }, [bid]);
  useEffect(() => {
    setImageUrl(bannerInfo?.file);
  }, [bannerInfo?.file]);
  return (
    <ContentCard>
      <ContentHeader
        label={isUpdated ? `Updated Homepage Banner:  ${bid}` : 'Create a new Homepage Banner'}
      />
      {(!isUpdated || bannerInfo) && (
        <div>
          <Form
            initialValues={isUpdated ? bannerInfo : {}}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            labelAlign="left"
            onFinish={onSave}
          >
            <Form.Item required label="Banner Name" name="name">
              <Input placeholder="please Iinput your Banner name"></Input>
            </Form.Item>
            <Form.Item required label="Banner Upload" name="image">
              <FileUpload defaultSrc={imageUrl} onSuccess={setImageUrl} />
            </Form.Item>
            <Form.Item required label="URL" name="url">
              <Input placeholder="URL"></Input>
            </Form.Item>
            <Form.Item required label="Order" name="order">
              <Input placeholder=""></Input>
            </Form.Item>
            <Form.Item label="Enable" name="enable">
              <Switch onChange={toggle} checked={enable} />
            </Form.Item>
            <Form.Item>
              <Button onClick={history.goBack}>Cancel</Button>
              <Button htmlType="submit" loading={loading} type="primary" className="ml-8">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </ContentCard>
  );
}

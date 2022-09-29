import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { Button, Image, Space, Switch, Table } from 'antd';
import { useState } from 'react';
import { bannerValue, IBanners } from '../../../types/homepage';
import { useEffect } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { timestampToTime } from '@/utils/format';
import IconFont from '@/components/IconFont';
import ContentCard from '@/components/ContentCard';
import { history } from 'umi';
export default function HomepageBanners() {
  const [searchValue, setSearchValue] = useState({});
  const [list, setList] = useState<IBanners[]>();
  const [loading, setLoading] = useState({
    tableLoading: false,
  });
  const searchItem: IFormItem[] = [
    {
      name: 'bname',
      type: 'input',
      col: 3,
      placeholder: 'Banner Name',
    },
    {
      name: 'status',
      type: 'status-groups',
      placeholder: 'Status',
    },
    {
      name: '',
      type: 'link-reset',
      col: 1,
      icon: 'icon-shuaxin',
    },
    {
      name: '',
      type: 'link-submit',
      col: 1,
      icon: 'icon-chazhao',
    },
    {
      name: 'col',
      type: 'col',
      col: 3,
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" className="mr-4" onClick={() => onPushBanner()}>
          Create New Banner
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: <Button type="primary">Change Order</Button>,
    },
  ];
  const colums: ColumnsType<IBanners> = [
    {
      title: 'Banner Name',
      dataIndex: 'bname',
      key: 'bname',
    },
    {
      title: 'Image Preview',
      dataIndex: 'image',
      key: 'image',
      render: (_, { image }) => <Image src={image} width={200} height={50} />,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Enable',
      dataIndex: 'enable',
      key: 'enable',
      render: (a, record, index) => (
        <Switch checked={record.enable} onChange={() => onEnable(a, record, index)}></Switch>
      ),
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationdate',
      key: 'creationdate',
      render: (_, { creationdate }) => <p>{timestampToTime(creationdate as string)}</p>,
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
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
              onPushBanner(record.bname);
            }}
            className="text-black text-xl cursor-pointer"
          />
          <IconFont
            type="icon-delete"
            onClick={() => {}}
            className="text-black text-xl cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  const getList = async () => {
    setLoading({ ...loading, tableLoading: true });
    setList(bannerValue);
    setLoading({ ...loading, tableLoading: false });
  };
  const onEnable = async (a: boolean, e: IBanners, index: number) => {
    const listCopy: IBanners[] = (list as IBanners[]).concat([]);
    listCopy[index].enable = !listCopy[index].enable;
    setList(listCopy);
  };
  const onPushBanner = (bname?: string) => {
    bname
      ? history.push(`/homepage/banner-form?bname=${bname}`)
      : history.push('/homepage/banner-form');
  };
  const onSearch = (e: any) => {
    setSearchValue(e);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="p-8">
      <section>
        <div className="text-2xl font-semibold w-full text-left pb-4 border-b border-gray-500">
          Homepage Banner
        </div>
        <p className="text-md">
          Create and set the display order for Banners on the homepage. Maximum X banners can be
          enabled to be displayed on the site
        </p>
      </section>
      <section>
        <ContentCard>
          <SearchBar className={'mb-4'} searchItem={searchItem} search={onSearch} />
          <Table
            rowKey={'bname'}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
    </div>
  );
}

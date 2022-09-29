import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { Button, Image, Space, Switch, Table, Avatar, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { timestampToTime } from '@/utils/format';
import IconFont from '@/components/IconFont';
import ContentCard from '@/components/ContentCard';
import { history } from 'umi';
import { gameListingValue, IGame } from '@/types/gameListing';
import { getChainValue } from '@/types/chainType';
import { editStatusData } from '../../types/gameListing';
export default function GameListing() {
  const [searchValue, setSearchValue] = useState({});
  const [list, setList] = useState<IGame[]>();
  const [loading, setLoading] = useState({
    tableLoading: false,
  });
  const searchItem: IFormItem[] = [
    {
      name: 'gname',
      type: 'input',
      col: 3,
      placeholder: 'Game Name',
    },
    {
      name: 'chain',
      type: 'chain-groups',
      placeholder: 'Chain',
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
  const colums: ColumnsType<IGame> = [
    {
      title: 'Game Name ',
      dataIndex: 'gname',
      key: 'gname',
    },
    {
      title: 'Site URL',
      dataIndex: 'surl',
      key: 'srul',
    },
    {
      title: 'Chain',
      dataIndex: 'chainlist',
      key: 'chainlist',
      render: (_, { chainlist }) => {
        return (
          <Avatar.Group>
            {chainlist?.map((item: number, index: number) => {
              const chainValue = getChainValue(item);
              if (index < 2 || (index == 2 && chainlist.length == 3)) {
                return <Avatar src={chainValue.imageUrl} key={chainValue.id} size={24} />;
              } else if (index == 2 && chainlist.length > 3) {
                return (
                  <Avatar key={chainValue.id} size={24}>
                    +{chainlist.length - 2}
                  </Avatar>
                );
              } else {
                return;
              }
            })}
          </Avatar.Group>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        if (status == 0) {
          return <Tag color="gold">Draft</Tag>;
        } else {
          return <Tag color="cyan">Publish</Tag>;
        }
      },
    },
    {
      title: 'Edit Status',
      dataIndex: 'editStatus',
      key: 'editStatus',
      render: (_, { editStatus }) => {
        if (editStatus == 0) {
          return <Tag>Unpublished Changes</Tag>;
        } else {
          return <Tag>Up to Date</Tag>;
        }
      },
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Last Edited',
      dataIndex: 'endEditedDate',
      key: 'endEditedDate',
      render: (_, { endEditedDate }) => {
        return <p>{timestampToTime(endEditedDate)}</p>;
      },
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
              onPushBanner(record.gname);
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
    setList(gameListingValue);
    setLoading({ ...loading, tableLoading: false });
  };
  const onPushBanner = (gname?: string) => {
    gname
      ? history.push(`/homepage/banner-form?gname=${gname}`)
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
          <Table rowKey={'gid'} loading={loading.tableLoading} columns={colums} dataSource={list} />
        </ContentCard>
      </section>
    </div>
  );
}

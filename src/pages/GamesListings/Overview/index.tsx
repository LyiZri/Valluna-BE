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
import { editStatusData } from '../../../types/gameListing';
import { LoadingOutlined } from '@ant-design/icons';
export default function GameListing() {
  const [searchValue, setSearchValue] = useState({});
  const [list, setList] = useState<IGame[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState({
    tableLoading: false,
    changePublishLoading: false,
    deleteLoading: false,
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
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
      render: (
        <Button type="primary" className="mr-4" onClick={() => onPublishStatusChange(0)}>
          Unpublish
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" className="mr-4" onClick={() => onPublishStatusChange(1)}>
          Publish
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
      render: (_, { lastEditedDate }) => {
        return <p>{timestampToTime(lastEditedDate)}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record, index) => (
        <Space size="middle">
          {loading.changePublishLoading ? (
            <LoadingOutlined />
          ) : (
            <IconFont
              type={record.status == 1 ? 'icon-unsee' : 'icon-see'}
              className="text-black text-xl cursor-pointer"
              onClick={() => onPublishStatusChange(record.status, [index])}
            />
          )}
          <IconFont
            type="icon-bianji"
            onClick={() => {
              onPushBanner(record.gname);
            }}
            className="text-black text-xl cursor-pointer"
          />
          {loading.deleteLoading ? (
            <LoadingOutlined />
          ) : (
            <IconFont
              type="icon-delete"
              onClick={() => onDelete(index)}
              className="text-black text-xl cursor-pointer"
            />
          )}
        </Space>
      ),
    },
  ];
  const getList = async () => {
    setLoading({ ...loading, tableLoading: true });
    setList(gameListingValue);
    setLoading({ ...loading, tableLoading: false });
  };
  //change Public Status
  const onPublishStatusChange = (status = 0, statusArr = [-1]) => {
    setLoading({
      ...loading,
      tableLoading: true,
      changePublishLoading: true,
    });
    const _list = (list as IGame[]).concat([]);
    if (statusArr[0] == -1 && statusArr.length == 1) {
      console.log(selectedRowKeys);
      const isStatusUnify = selectedRowKeys.every((item: React.Key, _) => {
        return _list[(item as number) - 1].status == status;
      });
      if (isStatusUnify) {
        selectedRowKeys.map((item: React.Key, _) => {
          _list[(item as number) - 1].status = Number(!status);
        });
      }
    } else {
      statusArr.map((item: number, _) => {
        _list[item].status = Number(!status);
      });
    }
    setList(_list);
    setLoading({
      ...loading,
      tableLoading: false,
      changePublishLoading: false,
    });
  };
  const onDelete = async (index: number) => {
    setLoading({
      ...loading,
      deleteLoading: true,
      tableLoading: true,
    });
    const _list = list?.concat([]);
    _list?.splice(index, 1);
    console.log(_list);

    setList(_list);
    setLoading({
      ...loading,
      deleteLoading: false,
      tableLoading: false,
    });
  };
  const onPushBanner = (gname?: string) => {
    gname
      ? history.push(`/games-listings/game-listings-form?gname=${gname}`)
      : history.push('/games-listings/game-listings-form');
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
            rowSelection={rowSelection}
            rowKey={'gid'}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
    </div>
  );
}

import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { Button, Image, Space, Switch, Table, Avatar, Tag, message, Select } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { getSearchList, timestampToTime } from '@/utils/format';
import IconFont from '@/components/IconFont';
import ContentCard from '@/components/ContentCard';
import { history, useModel } from 'umi';
import { IGame } from '@/types/gameListing';
import { LoadingOutlined } from '@ant-design/icons';
import {
  deleteGLOverviewItem,
  getGLOverviewList,
  editGLOverviewItem,
} from '@/service/gamelistings';
import { getRandomColor } from '@/utils';
import { useUserAuth } from '@/utils/user';
export default function GameListing() {
  const [searchValue, setSearchValue] = useState({});
  const [list, setList] = useState<IGame[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState({
    tableLoading: false,
    changePublishLoading: false,
  });
  const { setGlInfo } = useModel('glInfo');
  const haveAuth = useUserAuth('Gamelistings');
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
  const searchItem: IFormItem[] = [
    {
      name: 'game_name',
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
      type: 'left',
      render: (
        <Select
          placeholder="Edit Status"
          onChange={(e) =>
            setSearchValue({
              ...searchValue,
              editstatus: e,
            })
          }
        >
          <Select.Option value={0}>No Edit</Select.Option>
          <Select.Option value={1}>Unpublish Change</Select.Option>
          <Select.Option value={2}>Up to Date</Select.Option>
        </Select>
      ),
    },
    {
      name: '',
      type: 'left',
      render: (
        <Select
          className="mx-4"
          placeholder="Game Status"
          onChange={(e) =>
            setSearchValue({
              ...searchValue,
              status: e,
            })
          }
        >
          <Select.Option value={0}>Published</Select.Option>
          <Select.Option value={1}>Draft</Select.Option>
        </Select>
      ),
    },
    {
      name: '',
      type: 'left',
      render: (
        <Select
          className="mx-4"
          placeholder="Featured"
          onChange={(e) =>
            setSearchValue({
              ...searchValue,
              featured: e,
            })
          }
        >
          <Select.Option value={0}>False</Select.Option>
          <Select.Option value={1}>True</Select.Option>
        </Select>
      ),
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
    haveAuth
      ? {
          name: '',
          type: '',
          col: 3,
          render: (
            <Button type="primary" className="mr-4" onClick={() => onPushBanner()}>
              Create New +
            </Button>
          ),
        }
      : {},
    haveAuth
      ? {
          name: '',
          type: '',
          col: 3,
          render: (
            <Button type="primary" className="mr-4" onClick={() => onPublishStatusChange(0)}>
              Unpublish
            </Button>
          ),
        }
      : {},
    haveAuth
      ? {
          name: '',
          type: '',
          col: 3,
          render: (
            <Button type="primary" className="mr-4" onClick={() => onPublishStatusChange(1)}>
              Publish
            </Button>
          ),
        }
      : {},
  ];
  const colums: ColumnsType<IGame> = [
    {
      title: 'Game Name ',
      dataIndex: 'game_name',
      key: 'game_name',
    },
    {
      title: 'Site URL',
      dataIndex: 'surl',
      key: 'surl',
      render: (_, { surl }) => {
        return (
          <Button type="link" onClick={() => surl && window.open(surl)}>
            {surl || '---'}
          </Button>
        );
      },
    },
    {
      title: 'Chain',
      dataIndex: 'game_blockchain',
      key: 'game_blockchain',
      render: (_, { game_blockchain }) => {
        return (
          <Tag color="purple">
            {game_blockchain !== undefined && game_blockchain?.length > 0
              ? game_blockchain[0]
              : '-'}
          </Tag>
        );
      },
    },
    Table.EXPAND_COLUMN,
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
      dataIndex: 'editstatus',
      key: 'editstatus',
      render: (_, { editstatus }) => {
        if (editstatus == 0) {
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
        return <p>{timestampToTime(lastEditedDate || '')}</p>;
      },
    },
    haveAuth
      ? {
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
                  onPushBanner(record.glid, index);
                }}
                className="text-black text-xl cursor-pointer"
              />
              <IconFont
                type="icon-delete"
                onClick={() => onDelete(record.glid as string, index)}
                className="text-black text-xl cursor-pointer"
              />
            </Space>
          ),
        }
      : {},
  ];
  const getList = async (e = {}) => {
    setLoading({ ...loading, tableLoading: true });
    const res = await getGLOverviewList({ ...e, ...searchValue });

    let _list: IGame[] = [];
    if (res.code != 1) {
      setLoading({ ...loading, tableLoading: false });
      return;
    }
    res.data.map((item: any, index: number) => {
      _list.push({
        glid: item.glid,
        game_name: item.game_name,
        surl: item?.official_links?.website,
        game_blockchain: item.game_blockchain,
        status: item.status,
        operator: item.operator,
        lastEditedDate: item.time,
        ...item,
        ...item.draft,
      });
    });
    setList(_list);
    setLoading({ ...loading, tableLoading: false });
  };

  //change Public Status
  const onPublishStatusChange = async (status = 0, statusArr = [-1]) => {
    setLoading({
      ...loading,
      tableLoading: true,
      changePublishLoading: true,
    });
    const _list = list ? (list as IGame[]).concat([]) : [];
    if (statusArr[0] == -1 && statusArr.length == 1) {
      const isStatusUnify = selectedRowKeys.every((item: React.Key, _) => {
        return _list[(item as number) - 1].status == status;
      });
      if (isStatusUnify) {
        selectedRowKeys.map((item: React.Key, _) => {
          _list[(item as number) - 1].status = Number(!status);
        });
      }
    } else {
      statusArr.map(async (item: number, _) => {
        const data = await editGLOverviewItem({
          ..._list[item],
          action: status == 0 ? 2 : 3,
        });
        _list[item].status = Number(!status);
      });
    }
    setList(_list);
    setLoading({
      ...loading,
      tableLoading: false,
      changePublishLoading: false,
    });
    await getList();
  };
  const onDelete = async (glid: string, index: number) => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    const res = await deleteGLOverviewItem({ glid });
    if (res.code == 0) {
      const _list = list ? list?.concat([]) : [];
      _list?.splice(index, 1);
      setList(_list);
    } else {
    }
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onPushBanner = (glid?: string, index = 0) => {
    console.log(list![index]);
    index != undefined && setGlInfo(list![index]);
    glid
      ? history.push(`/games-listings/game-listings-form?glid=${glid}`)
      : history.push('/games-listings/game-listings-form');
  };
  const onSearch = async (e: any) => {
    const searchOBJ = {
      ...e,
      ...searchValue,
    };
    await getList(searchOBJ);
  };
  useEffect(() => {
    setGlInfo(undefined);
    getList();
  }, []);
  return (
    <div className="p-8">
      <section>
        <div className="text-2xl font-semibold w-full text-left pb-4 border-b border-gray-500">
          Game Listing Overview
        </div>
        <p className="text-md">Create and manage game listings for display on the website</p>
      </section>
      <section>
        <ContentCard>
          <SearchBar className={'mb-4'} searchItem={searchItem} search={onSearch} />
          <Table
            rowSelection={rowSelection}
            rowKey={'glid'}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>
                  {record.game_blockchain?.map((item: string, index: number) => {
                    return (
                      <Tag color={getRandomColor()} key={index}>
                        {item}
                      </Tag>
                    );
                  })}
                </p>
              ),
            }}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
    </div>
  );
}

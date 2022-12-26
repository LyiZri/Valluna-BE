import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { ICategories, IMedia, IGame } from '@/types/gameListing';
import { Avatar, Button, Form, Input, Select, message, Modal } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { history, useModel } from 'umi';
import OfficialLinks from './components/OfficialLinks';
import ContentEditor from '@/components/ContentEditor';
import { getCoinPriceList } from '@/service/other';
import Media from './components/Media';
import FileUpload from '@/components/FileUpload';
import { getCategoryList, editGLOverviewItem, addGLOverviewItem, getTokenTickerList } from '@/service/gamelistings';
import { getUserInfo } from '@/utils/user';

interface IProps {
  match: any;
  location: any;
}


export default function BannerForm({ match, location }: IProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [richText, setRichText] = useState('');
  const [loading, setLoading] = useState({
    imageLoading: false,
    categoriesListLoding: false,
    finishLoading: false,
  });
  const [modalValue, setModalValue] = useState({
    visiable: false,
    url: '',
    image: "",
    title: "",
    // 0:official links 1:addtional media
    type: 0,
  });
  const { glInfo } = useModel('glInfo');
  const [formValue, setFormValue] = useState<IGame>({});
  const [categoryList, setCategoryList] = useState([]);
  const [mediaList, setMediaList] = useState<IMedia[]>([]);
  const [priceList, setPriceList] = useState([]);
  const [linksListValue, setLinksListValue] = useState({ pc: 4, android: 4, ios: 4 });
  let glid = location.query.glid;
  const [isUpdated, setIsUpdated] = useState<any>(() => {
    if (glid) {
      return true;
    } else {
      return false;
    }
  });
  const getPrice = async () => {
    const res = await getTokenTickerList({});
    res.code && setPriceList(res.data);
    return res.data
  };
  const fliterToken = (formValue: IGame, priceList: any) => {
    let _tokenTiker: number[] = []
    if (typeof formValue?.token_ticker != "undefined" && typeof formValue?.token_ticker[0] != "number") {
      formValue?.token_ticker.map((item: any, index: number) => {
        const a = priceList.find((priceItem: any, priceIndex: any) => {
          if (
            priceItem.symbol == item.symbol
          ) {
            _tokenTiker.push(priceIndex)
          }
        })
      })
      // setFormValue({
      //   ...formValue,
      //   token_ticker: _tokenTiker
      // })
    }
    return {
      ...formValue,
      token_ticker: _tokenTiker
    }
  }
  const onFinish = async (e: any) => {
    let _mediaList = mediaList ? mediaList.concat([]) : [];
    _mediaList?.map((item: IMedia, index: number) => {
      item.rank = index + 1;
    });
    let token_ticker: never[] = []
    e?.token_ticker?.map((item: number, _: any) => {
      token_ticker.push(priceList[item])
    })
    setLoading({
      ...loading,
      finishLoading: true,
    });
    const finishData = {
      ...formValue,
      ...e,
      game_image: imageUrl,
      additional_game_summary: richText,
      download_links: linksListValue,
      game_media: _mediaList,
      token_ticker: token_ticker,
    };
    try {
      const data = isUpdated
        ? await editGLOverviewItem({
          ...finishData,
          action: 2,
        })
        : await addGLOverviewItem({
          ...finishData,
          action: 0,
        });
      if (data.code == 1) {
        message.success('Success!');
      }
    } catch (error) { }
    setLoading({
      ...loading,
      finishLoading: false,
    });
  };
  const getList = async () => {
    setLoading({
      ...loading,
      categoriesListLoding: true,
    });

    const { data } = await getCategoryList({});
    setCategoryList(data);
    setLoading({
      ...loading,
      categoriesListLoding: false,
    });
  };
  const addValue = () => {
    let _obj = {
      time: 0,
      author: "",
      title: modalValue?.title,
      image: modalValue?.image,
      url: modalValue?.url
    };
    _obj.time = (new Date()).valueOf()
    _obj.author = getUserInfo().email
    if (modalValue.type == 0) {
      setFormValue({
        ...(formValue as IGame),
        official_links: {
          ...formValue?.official_links,
          ..._obj,
        },
      });
    } else {
      const addmediaArr = [_obj].concat(formValue?.additional_media)
      // [...formValue?.additional_media, [_obj]]
      setFormValue({
        ...(formValue as IGame),
        additional_media: addmediaArr,
      });
    }
    initModalValue();
  };
  const initModalValue = (isopen = false, modalType = 0) => {
    setModalValue({
      visiable: isopen,
      type: modalType,
      url: '',
      image: "",
      title: "",
    });
  };


  const AdditionalMedia = () => {
    return <div>
      {
        formValue?.additional_media.length && formValue?.additional_media?.map((item: any, index: number) => {
          return <div key={index} className='p-2 rounded-xl bg-gray-300'>
            <OfficialLinks
              _list={item || {}}
              _setList={(e: any) =>
                setFormValue({
                  ...(formValue as IGame),
                  additional_media: e,
                })
              }
            />
          </div>
        })
      }
    </div>
  }

  useEffect(() => {
    (async () => {
      const priceList = await getPrice();
      const glInfoData = fliterToken({
        ...glInfo,
        ...glInfo?.draft,
      }, priceList)
      console.log(glInfoData);

      if (isUpdated) {
        setFormValue(glInfoData);
        setRichText(glInfo?.draft?.additional_game_summary || glInfo?.additional_game_summary || '');
        setMediaList(glInfo?.game_media);
      } else {
        setFormValue({});
        setMediaList([]);
      }
    })()

  }, [glInfo]);
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    setImageUrl(formValue?.game_image || "")
  }, [formValue, priceList]);
  return (
    <ContentCard>
      <ContentHeader
        label={isUpdated ? `Updated a Game Listing:  ${glid}` : 'Create a Game Listing'}
      />
      <div>
        {(!isUpdated || formValue?.glid) && (
          <Form
            initialValues={formValue}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            labelAlign="left"
            onFinish={onFinish}
          >
            <Form.Item required label="Game Name" name="game_name">
              <Input placeholder="please Iinput your Game name"></Input>
            </Form.Item>
            <Form.Item required label="Game Image" name="game_image">
              <FileUpload
                defaultSrc={imageUrl}
                onSuccess={(e: string) => {
                  setImageUrl(e);
                }}
              />
            </Form.Item>
            <Form.Item required label="Game Description" name={'game_description'}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item required label="Blockchain" name={'game_blockchain'}>
              <Select mode="multiple">
                {priceList.length > 0 && priceList?.map((item: any, index) => {
                  return (
                    <Select.Option value={item.symbol} key={item.symbol}>
                      <div className="">
                        <p>
                          <Avatar src={item.logo} className="mr-4" size={16} />
                          <span>{item.slug}</span>
                        </p>
                      </div>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item required label="Game Category" name={'game_category'}>
              <Select mode="multiple" loading={loading.categoriesListLoding}>
                {categoryList.map((item: ICategories, index: number) => {
                  return (
                    <Select.Option key={item.name} value={item.name}>
                      <p>{item.name}</p>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item required label="Media">
              <Media list={mediaList as IMedia[]} setList={setMediaList} />
            </Form.Item>
            <Form.Item required label="Official Links">
              <div>
                <OfficialLinks
                  _list={formValue ? formValue.official_links : []}
                  _setList={(e: any) =>
                    setFormValue({
                      ...(formValue as IGame),
                      official_links: e,
                    })
                  }
                />
                <Button
                  onClick={() => {
                    initModalValue(true, 0);
                  }}
                  type="primary"
                >
                  Add
                </Button>
              </div>
            </Form.Item>
            <Form.Item required label="Additional Media">
              <AdditionalMedia />
              <div>
                <Button
                  onClick={() => {
                    initModalValue(true, 1);
                  }}
                  type="primary"
                >
                  Add
                </Button>
              </div>
            </Form.Item>
            <Form.Item required label="Additional Game Summary">
              <ContentEditor html={richText} setHtml={setRichText} />
            </Form.Item>
            <Form.Item required label="Token Ticker" name={'token_ticker'}>
              {/* <TokenTicker /> */}
              <Select onChange={(a: number[], b: any[]) => {
                console.log(formValue);

              }} mode="multiple">
                {priceList.length > 0 && priceList?.map((item: any, index) => {
                  return (
                    <Select.Option value={index} key={item.code}>
                      <p>
                        <Avatar src={item.logo} className="mr-4" size={16} />
                        <span>{item.symbol}</span>
                      </p>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item required label="Download Links">
              <OfficialLinks
                _list={linksListValue}
                _setList={(e: any) => {
                  setLinksListValue({
                    ...linksListValue,
                    ...e,
                  });
                }}
              />
            </Form.Item>
            <Form.Item required label="URL" name="url">
              <Input placeholder="URL"></Input>
            </Form.Item>
            <Form.Item>
              <Button onClick={history.goBack}>Cancel</Button>
              <Button
                loading={loading.finishLoading}
                htmlType="submit"
                type="primary"
                className="ml-8"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <Modal open={modalValue.visiable} onOk={addValue} onCancel={() => initModalValue()}>
        <div>
          <p>title:</p>
          <Input
            value={modalValue.title}
            onChange={(e) =>
              setModalValue({
                ...modalValue,
                title: e.target.value,
              })
            }
          />
        </div>
        <div>
          <p>url:</p>
          <Input
            value={modalValue.url}
            onChange={(e) =>
              setModalValue({
                ...modalValue,
                url: e.target.value,
              })
            }
          />
        </div>
        {modalValue.type && <div>
          <p>image:</p>
          <FileUpload
            defaultSrc={modalValue.image}
            onSuccess={(e: string) => {
              setModalValue({
                ...modalValue,
                image: e
              })
            }}
          />
        </div>}
      </Modal>
    </ContentCard>
  );
}

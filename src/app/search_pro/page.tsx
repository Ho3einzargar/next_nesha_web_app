'use client';
import { useEffect, useState } from 'react';
import { getLabSearchPro, getLicenses, getPlatforms, getSearchResult } from './api/searchProApi';
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem, Spinner, Switch } from '@nextui-org/react';
import IconLocal from '../Components/helper_comp/IconsComp/Icon';
import { Col, Row } from 'react-bootstrap';

const SearchProPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [globalDataFinally, setGlobalDataFinally] = useState({
    platforms_name: '',
    licenses_name: '',
    review_links_url: '',
    course_links_url: '',
    offline_or_online: 0,
    lab_id: '',
    search: '',
    ordering: '-',
    page: 1,
  });

  async function searchResultFun() {
    await getSearchResult().then(res => {
      if (res?.data?.length != 0) {
        setSearchResult(res?.data);
      } else {
        setSearchResult([]);
      }
    });
  }

  const fetchDataForSearch = async function () {
    try {
      await getLicenses()
        .then(res => {
          if (res?.data?.results?.length != 0) {
            setLicenses(res.data.results);
          } else {
            setLicenses([]);
          }
        })

      await getLabSearchPro()
        .then(res => {
          if (res?.data?.length != 0) {
            // setLabsData(res?.data);
            // setLabsDataBack(res?.data);
          } else {
            // setLabsData([]);
            // setLabsDataBack([]);
          }
        })

      await getPlatforms()
        .then(res => {
          if (res?.data?.results?.length != 0) {
            setPlatforms(res?.data?.results);
          } else {
            setPlatforms([]);
          }
        })
        .finally(() => setIsLoading(false));
    } catch (err: any) {
      // setError(err.message);
    }
  };

  useEffect(() => {
    fetchDataForSearch();
  }, []);

  return (
    <div className="col-12 d-flex flex-wrap min-height-step-3">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardHeader className="col-12 flex flex-wrap justify-between items-center gap-1">
          <div className="flex flex-wrap items-center gap-1">
            <IconLocal Address={'search.svg'} width={35} height={35} />
            <h4 className="estedad-medium mb-0">جست و جو حرفه ای</h4>{' '}
          </div>
          <div className="col-12 col-sm-6">
            <Input
              label="جستجو"
              isClearable
              radius="lg"
              classNames={{
                label: 'text-black/50 dark:text-white/90',
                input: ['bg-transparent', 'text-black/90 dark:text-white/90', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'shadow-xl',
                  'bg-default-200/50',
                  'dark:bg-default/60',
                  'backdrop-blur-xl',
                  'backdrop-saturate-200',
                  'hover:bg-default-200/70',
                  'dark:hover:bg-default/70',
                  'group-data-[focus=true]:bg-default-200/50',
                  'dark:group-data-[focus=true]:bg-default/60',
                  '!cursor-text',
                ],
              }}
              // onKeyUp={(e: any) => (e.key == 'Enter' ? searchFun(e) : null)}
              onChange={(e: any) => {
                // setSearch(e.target.value);
                // searchFun(e.target.value);
              }}
              placeholder="جستجو کن"
              startContent={<IconLocal Address={'search.svg'} />}
            />
          </div>
          <Divider />
          <Row className="col-12 m-0 p-0 items-center">
            <Col className="mb-lg-0 mb-2" lg={2} md={5} sm={12}>
              <div className="flex w-full flex-wrap md:flex-nowrap">
                <Select
                  label={'پلتفرم'}
                  onChange={(e: any) => {
                    globalDataFinally.platforms_name = e.target.value;
                  }}
                  placeholder={'پلتفرم را انتخاب کنید'}
                  size="sm">
                  {platforms?.map((item: any, idx: number) => {
                    return (
                      <SelectItem key={item} value={idx}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
            </Col>

            <Col className="mb-lg-0 mb-2" lg={2} md={5} sm={12}>
              <div className="flex w-full flex-wrap md:flex-nowrap">
                <Select
                  label={'لایسنس'}
                  onChange={(e: any) => {
                    globalDataFinally.licenses_name = e.target.value;
                  }}
                  placeholder={'لایسنس را انتخاب کنید'}
                  size="sm">
                  {licenses?.map((item: any, idx: number) => {
                    return (
                      <SelectItem key={item} value={idx}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
            </Col>

            <Col className="mb-lg-0 mb-2" lg={1} md={2} sm={3}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-2 items-center">
                <span className="estedad-light mx-1 w-100">آنلاین</span>
                <Switch
                  defaultSelected
                  size="md"
                  color="success"
                  onChange={(e: any) => {
                    globalDataFinally.offline_or_online = e.target.checked ? 1 : 2;
                  }}></Switch>
              </div>
            </Col>

            <Col className="mb-lg-0 mb-2" lg={1} md={2} sm={3}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-2 items-center">
                <span className="estedad-light mx-1">لایک ها</span>
                <Switch defaultSelected size="md" color="success"></Switch>
              </div>
            </Col>

            <Col className="mb-lg-0 mb-2" lg={1} md={2} sm={3}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-2 items-center">
                <span className="estedad-light mx-1">بازدیدها</span>
                <Switch defaultSelected size="md" color="success"></Switch>
              </div>
            </Col>

            <Col className="mb-lg-0 mb-2" lg={1} md={2} sm={3}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-2 items-center">
                <span className="estedad-light mx-1">تاریخ افزودن</span>
                <Switch defaultSelected size="md" color="success"></Switch>
              </div>
            </Col>

            <Col className="mb-lg-0 mb-2" lg={3} md={5} sm={6}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-2 items-center">
                <span className="estedad-light mx-1">آموزه برای آن موجود باشد</span>
                <Switch defaultSelected size="md" color="success"></Switch>
              </div>
            </Col>
            <div className="w-100 flex flex-wrap justify-center my-3">
              <Button onClick={() => searchResultFun()} variant="bordered" color="primary" className="w-50">
                <span className="estedad-bold">جست و جو</span>
              </Button>
            </div>
          </Row>
          <Divider />
        </CardHeader>
        <CardBody className="d-flex flex-wrap align-content-center">
          {isLoading ? <Spinner /> : searchResult.length != 0 ? <span>S</span> : <span className="estedad-light">موردی وجود ندارد</span>}
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchProPage;

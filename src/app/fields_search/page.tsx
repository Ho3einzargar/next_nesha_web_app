'use client';
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getFields_search } from './api/fieldsSearchApi';
import { responseModelRecentFields } from '../Components/home/api/homeApi';
import IconLocal from '../Components/helper_comp/IconsComp/Icon';
import ShowRecentListFields from '../Components/home/recentListFields/ShowRecentListFields';

const FieldsSearchPage = () => {
  const [fieldsData, setFieldsData] = useState<responseModelRecentFields[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //? search
  const [search, setSearch] = useState<string>('');
  const [fieldsDataBack, setFieldsDataBack] = useState<responseModelRecentFields[]>([]);

  const fetchRecentFieldsHandler = async function () {
    try {
      getFields_search()
        .then(res => {
          if (res?.data?.length != 0) {
            setFieldsData(res?.data);
            setFieldsDataBack(res?.data);
          } else {
            setFieldsData([]);
            setFieldsDataBack([]);
          }
        })
        .finally(() => setIsLoading(false));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRecentFieldsHandler();
  }, []);

  const searchFun = (search: string) => {
    console.log('Search ', search);

    if (search.length > 0) {
      const searchFilter: responseModelRecentFields[] = fieldsDataBack.filter(field => field.name.toLowerCase().includes(search.toLowerCase()));
      setFieldsData(searchFilter);
    } else {
      setFieldsData(fieldsDataBack);
    }
  };

  return (
    <div className="col-12 d-flex flex-wrap min-height-step-3">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardHeader className="col-12 flex flex-wrap justify-between items-center gap-1">
          <div className='flex flex-wrap items-center gap-1'>
            <IconLocal Address={'fields.svg'} width={35} height={35} />
            <h4 className="estedad-medium mb-0">رشته ها</h4>{' '}
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
              onKeyUp={(e: any) => (e.key == 'Enter' ? searchFun(e) : null)}
              onChange={(e: any) => {
                setSearch(e.target.value);
                searchFun(e.target.value);
              }}
              placeholder="جستجو کن"
              startContent={<IconLocal Address={'search.svg'} />}
            />
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-wrap align-content-center">
          <ShowRecentListFields loader={isLoading} fieldsList={fieldsData} />
        </CardBody>
      </Card>
    </div>
  );
};

export default FieldsSearchPage;

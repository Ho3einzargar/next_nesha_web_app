import { Card, CardBody, CardFooter, CardHeader, Chip, Input, Spinner } from '@nextui-org/react';
import IconLocal from '../helper_comp/IconsComp/Icon';
import { useState } from 'react';
import { getSearchHome } from './api/homeApi';
import './step_1.css';
import { useRouter } from '../onComplete/router';

const Step1HomePage = () => {
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<any[]>([]);

  const router = useRouter();

  async function searchBehavior(e: any) {
    setLoadingSearch(true);
    await getSearchHome(e?.target?.value)
      .then(search => {
        if (search.data.results) {
          let Check: any[] = [];
          Check = Check.concat(search.data.results.Field);
          Check = Check.concat(search.data.results.Lab);
          Check = Check.concat(search.data.results.Software);
          setDataSearch(Check);
        }
      })
      .finally(() => setLoadingSearch(false));
  }

  return (
    <div className="col-12 d-flex flex-wrap" style={{ height: 'calc(100vh - 80px)' }}>
      <Card className="col-12 d-flex flex-wrap">
        <CardHeader className="mt-3">
          <div className="w-100 text-center">
            <h2 className="estedad-medium my-4">(نرم افزار های شبیه سازی آزمایشگاه) نِشا</h2>
            <h4 className="estedad-regular">شما می توانید دروس آزمایشگاهی دوره کارشناسی را جستجو کنید و نرم افزار های شبیه سازی مربوط به آن ها را مشاهده کنید</h4>
          </div>
        </CardHeader>
        <CardBody className="col-12 p-2 rounded-2xl flex justify-center items-center text-white height-search-box">
          <div className="col-12 col-sm-6">
            <Input
              label="Search"
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
              onKeyUp={(e: any) => (e.key == 'Enter' ? searchBehavior(e) : null)}
              placeholder="Type to search..."
              startContent={<IconLocal Address={'search.svg'} />}
            />
          </div>
          <div className="my-3">
            {loadingSearch ? (
              <Spinner />
            ) : (
              dataSearch.length != 0 && (
                <>
                  <div style={{ flexDirection: 'row' }} className="col-12 p-2 rounded-2xl flex flex-wrap items-center text-white">
                    {dataSearch.length != 0 &&
                      dataSearch.map((search: any, idx: number) => {
                        return (
                          <Chip
                            className="mx-1 p-2 py-4 pointer hover-chip"
                            onClick={() => router.push(search.number_of_labs ? `/field/${search.id}` : `/lab/${search.id}`)}
                            key={idx}
                            color="warning"
                            variant="bordered">
                            {search.name}
                            <br></br>
                            {search?.number_of_labs ? (
                              <div className="d-flex gap-1 flex-wrap w-100 justify-center">
                                <IconLocal width={15} height={15} Address={'laboratory.svg'} />
                                {search.number_of_labs}
                              </div>
                            ) : (
                              <div className="d-flex gap-1 flex-wrap w-100 justify-center">
                                <IconLocal width={15} height={15} Address={'software.svg'} />
                                {search.number_of_softwares}
                              </div>
                            )}
                          </Chip>
                          //   <Card key={idx} className="d-flex flex-wrap mx-1">
                          //     <CardHeader>{search.name}</CardHeader>
                          //   </Card>
                        );
                      })}
                  </div>
                </>
              )
            )}
          </div>
        </CardBody>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
};

export default Step1HomePage;

import { useEffect, useState } from 'react';
import { getFavoriteSoftwares } from './api/homeApi';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import IconLocal from '../helper_comp/IconsComp/Icon';

const FavoriteSoftwares = () => {
  const [softwares, setSoftwares] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSoftwaresHandler = async function () {
    try {
      getFavoriteSoftwares()
        .then(res => {
          if (res.data.results.length != 0) {
            setSoftwares(res.data.results);
          } else {
            setSoftwares([]);
          }
        })
        .finally(() => setIsLoading(false));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSoftwaresHandler();
  }, []);

  return (
    <div className="col-12 d-flex flex-wrap min-height-step-2">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardHeader>
          <h5 className="estedad-medium">نرم افزار های محبوب</h5>
        </CardHeader>
        <CardBody className='d-flex flex-wrap align-content-center'>
          {softwares.length != 0 ?
            softwares.map((search: any, idx: number) => {
              return (
                <Chip className="mx-1 p-2 py-4 pointer hover-chip" onClick={() => console.log('Item', search)} key={idx} color="warning" variant="bordered">
                  {search.name}
                  <br></br>
                  <div className="d-flex gap-1 flex-wrap w-100 justify-center">
                    <IconLocal width={15} height={15} Address={'software.svg'} />
                    {search.number_of_softwares}
                  </div>
                </Chip>
              );
            })
          :
          <span className='text-center w-100 estedad-medium'>موردی وجود ندارد</span>
          }
        </CardBody>
      </Card>
    </div>
  );
};

export default FavoriteSoftwares;

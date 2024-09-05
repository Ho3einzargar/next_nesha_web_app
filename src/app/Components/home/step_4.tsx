import { useEffect, useState } from 'react';
import { getRecentFields, responseModelRecentFields } from './api/homeApi';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import ShowRecentListFields from './recentListFields/ShowRecentListFields';

const NeshaRecentFields = () => {
  const [recentFieldsData, setRecentFieldsData] = useState<responseModelRecentFields[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentFieldsHandler = async function () {
    try {
      getRecentFields()
        .then(res => {
          if (res.data.results.length != 0) {
            setRecentFieldsData(res.data.results);
          } else {
            setRecentFieldsData([]);
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

  return (
    <div className="col-12 d-flex flex-wrap min-height-step-3">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardHeader>
          <h5 className="estedad-medium">رشته های اخیر :</h5>
        </CardHeader>
        <CardBody className="d-flex flex-wrap align-content-center">
          <ShowRecentListFields loader={isLoading} fieldsList={recentFieldsData} />
        </CardBody>
      </Card>
    </div>
  );
};

export default NeshaRecentFields;

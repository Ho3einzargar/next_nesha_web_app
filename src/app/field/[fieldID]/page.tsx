'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFieldDetailLabs, responseModelFieldDetail, responseModelFieldDetailLab } from './api/fieldApi';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import IconLocal from '@/app/Components/helper_comp/IconsComp/Icon';
import NeshaRecentFields from '@/app/Components/home/step_4';
import FieldDetailComp from '@/app/Components/fields/FieldDetailComp';

const FieldDetailPage = () => {
  const router = useParams();
  console.log('ROUTER', router?.fieldID);

  const [FieldID] = useState<any>(router?.fieldID);
  const [fieldsInfo, setFieldsInfo] = useState<responseModelFieldDetail>(new responseModelFieldDetail());
  const [fieldsLabList, setFieldsLabList] = useState<responseModelFieldDetailLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFieldsDetailHandler = async function () {
    try {
      getFieldDetailLabs(FieldID)
        .then(res => {
          if (res?.data) {
            setFieldsInfo(res.data);
          }
          if (res?.data?.labs?.length != 0) {
            setFieldsLabList(res?.data?.labs);
          } else {
            setFieldsLabList([]);
          }
        })
        .finally(() => setIsLoading(false));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFieldsDetailHandler();
  }, []);
  return (
    <div className="col-12 d-flex flex-wrap min-height-step-3">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardHeader className="col-12 flex flex-wrap justify-center items-center gap-1">
          <IconLocal Address={'fields.svg'} width={35} height={35} />
          <h4 className="estedad-medium mb-0">{fieldsInfo.field_name}</h4>
        </CardHeader>
        <CardBody className="d-flex flex-wrap">
          <label className="w-100 flex flex-wrap items-center gap-2">
            <IconLocal Address={'laboratory.svg'} width={23} height={23} />
            <h5 className="estedad-medium mb-0">آزمایشگاه ها:</h5>
          </label>
          <FieldDetailComp loader={isLoading} labs={fieldsLabList} />
          {/* <ShowRecentListFields loader={isLoading} fieldsList={fieldsLabList} /> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default FieldDetailPage;

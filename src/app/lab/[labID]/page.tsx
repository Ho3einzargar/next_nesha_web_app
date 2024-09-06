'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLabDetailList, responseModelDetailLab } from './api/labApi';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import IconLocal from '@/app/Components/helper_comp/IconsComp/Icon';
import FieldDetailComp from '@/app/Components/fields/FieldDetailComp';
import SoftwaresList from '@/app/Components/softwares/softwaresList';

const LabDetailPage = () => {
  const router = useParams();
  console.log('ROUTER', router?.labID);

  const [labID] = useState<any>(router?.labID);
  const [labInfo, setLabInfo] = useState<responseModelDetailLab>(new responseModelDetailLab());
  const [softwaresLabList, setSoftwaresLabList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFieldsDetailHandler = async function () {
    try {
      getLabDetailList(labID)
        .then(res => {
          if (res?.data) {
            setLabInfo(res.data);
          }
          if (res?.data.softwares?.length != 0) {
            setSoftwaresLabList(res?.data?.softwares);
          } else {
            setSoftwaresLabList([]);
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
          <IconLocal Address={'laboratory.svg'} width={35} height={35} />
          <h4 className="estedad-medium mb-0">{labInfo.lab_name}</h4>
        </CardHeader>
        <CardBody className="d-flex flex-wrap">
          <label className="w-100 flex flex-wrap items-center gap-2">
            <IconLocal Address={'software.svg'} width={23} height={23} />
            <h5 className="estedad-medium mb-0">نرم افزار ها:</h5>
          </label>
          <SoftwaresList
            loader={isLoading}
            softwares={[
              {
                name: 'متلب',
                icon_picture: 'https://dronenomad.info/wp-content/uploads/2024/04/DJI-Inspire.webp',
                likes: 2,
              },
              {
                name: 'پریمیر',
                icon_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegpi2IfSon9Gx5G92xA1QLzbbEw5uGDI2AA&s',
                likes: 4,
              },
              {
                name: 'افتر',
                icon_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegpi2IfSon9Gx5G92xA1QLzbbEw5uGDI2AA&s',
                likes: 8,
              },
            ]}
          />
          {/* <SoftwaresList loader={isLoading} softwares={softwaresLabList} /> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default LabDetailPage;

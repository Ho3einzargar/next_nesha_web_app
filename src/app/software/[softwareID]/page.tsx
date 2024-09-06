'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Spinner } from '@nextui-org/react';
import IconLocal from '@/app/Components/helper_comp/IconsComp/Icon';
import SoftwaresList from '@/app/Components/softwares/softwaresList';
import { getCommentSoftware, getSoftwareDetail } from './api/softwaresApi';
import toast from 'react-hot-toast';

const SoftwareDetailPage = () => {
  const router = useParams();
  console.log('ROUTER', router?.softwareID);

  const [softwareID] = useState<any>(router?.softwareID);
  const [sofrtwarenfo, setSoftwareInfo] = useState<any>();
  const [comments, setComments] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFieldsDetailHandler = async function () {
    try {
      getSoftwareDetail(softwareID)
        .then(res => {
          console.log('RES', res);
          if (res?.data && typeof res?.data != 'string') {
            setSoftwareInfo(res.data);
          } else {
            toast.error('یافت نشد !');
          }
        })
        .finally(() => setIsLoading(false));

      getCommentSoftware(softwareID)
        .then(res => {
          if (res?.data) {
            setComments(res.data);
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
  if (isLoading) return <Spinner />;
  else if (sofrtwarenfo) {
    return (
      <div className="col-12 d-flex flex-wrap min-height-step-3">
        <Card dir="rtl" className="col-12 d-flex flex-wrap">
          <CardHeader className="col-12 flex flex-wrap justify-center items-center gap-1">
            {sofrtwarenfo?.icon_picture ? (
              <img src={sofrtwarenfo?.icon_picture} width={40} height={40} alt={sofrtwarenfo?.icon_picture} />
            ) : (
              <IconLocal Address={'software.svg'} width={35} height={35} />
            )}
            <h4 className="estedad-medium mb-0">{sofrtwarenfo.name}</h4>
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
  } else {
    return (
      <div dir="rtl" className="w-100 flex flex-wrap items-center justify-center">
        <span className="text-gray">نرم افزار یافت نشد!</span>
      </div>
    );
  }
};

export default SoftwareDetailPage;

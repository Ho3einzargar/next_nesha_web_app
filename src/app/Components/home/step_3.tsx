import { Card, CardBody } from '@nextui-org/react';
import ServicesList from './services_list/ServicesList';

const NeshaServices = () => {
  return (
    <div className="col-12 d-flex flex-wrap min-height-step-3">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardBody className="d-flex flex-wrap align-content-center">
          <ServicesList />
        </CardBody>
      </Card>
    </div>
  );
};

export default NeshaServices;

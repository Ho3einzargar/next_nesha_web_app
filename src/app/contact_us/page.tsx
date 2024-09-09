'use client';
import { Button, Card, CardBody, CardHeader, Code, Input, Textarea } from '@nextui-org/react';
import IconLocal from '../Components/helper_comp/IconsComp/Icon';
import { useState } from 'react';

const ContactUsPage = () => {
  const [formValue, setFormValue] = useState({
    name: '',
    subject: '',
    email: '',
    text: '',
  });
  const [errorHandler, setErrorHandler] = useState({
    name: '',
    subject: '',
    email: '',
    text: '',
  });

  const handleChangeInput = (e: any) => {
    setFormValue(prevalue => {
      return {
        ...prevalue, // Spread Operator
        [e.target.id]: e.target.value,
      };
    });

    if (!e?.target?.validity?.valid) {
      setErrorHandler(prevalue => {
        return {
          ...prevalue, // Spread Operator
          [e.target.id]: `${e?.target?.validationMessage}`,
        };
      });
    } else {
      setErrorHandler(prevalue => {
        return {
          ...prevalue, // Spread Operator
          [e.target.id]: '',
        };
      });
    }
  };

  return (
    <div className="col-12 d-flex flex-wrap min-height-step-3">
      <Card dir="rtl" className="col-12 d-flex flex-wrap">
        <CardHeader className="col-12 flex flex-wrap justify-between items-center gap-1">
          <div className="flex flex-wrap items-center gap-1">
            <IconLocal Address={'menu/contact_us.svg'} width={35} height={35} />
            <h4 className="estedad-medium mb-0">ارتباط با ما</h4>{' '}
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-wrap align-content-center">
          <div className="flex flex-wrap w-100 justify-center mt-4">
            <div className='w-100 flex flex-wrap justify-center gap-3'>
              <Input
                isRequired
                autoFocus
                id="subject"
                className="max-w-10rem"
                label="عنوان"
                placeholder="عنوان را وارد کنید"
                variant="bordered"
                value={formValue.subject}
                onChange={handleChangeInput}
                color={errorHandler.subject.length != 0 ? 'danger' : 'success'}
              />
              {errorHandler.subject.length != 0 && <Code color="danger">{errorHandler.subject}</Code>}

              <Input
                className="max-w-10rem"
                isRequired
                autoFocus
                id="name"
                label="نام خانوادگی"
                placeholder="نام خانوادگی را وارد کنید"
                variant="bordered"
                value={formValue.name}
                onChange={handleChangeInput}
                color={errorHandler.name.length != 0 ? 'danger' : 'success'}
              />
              {errorHandler.name.length != 0 && <Code color="danger">{errorHandler.name}</Code>}
              <Input
                className="max-w-10rem"
                isRequired
                type="email"
                autoFocus
                id="email"
                label="ایمیل"
                placeholder="ایمیل را وارد کنید"
                variant="bordered"
                value={formValue.email}
                onChange={handleChangeInput}
                color={errorHandler.email.length != 0 ? 'danger' : 'success'}
              />
              {errorHandler.email.length != 0 && <Code color="danger">{errorHandler.email}</Code>}
            </div>
          </div>

          <div className="w-100 flex flex-wrap justify-center mt-3 px-6">
            <div className="w-50">
              <Textarea size="lg" label="توضیحات" dir="rtl" placeholder="توضیحات را وارد کنید" />
            </div>
            <div className="w-100 flex flex-wrap justify-center">
              <Button className="mt-2" variant="bordered" color="primary">
                افزودن
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default ContactUsPage;

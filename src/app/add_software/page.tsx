'use client';
import { useEffect, useRef, useState } from 'react';
import { getLabSearchPro, getLicenses, getPlatforms } from '../search_pro/api/searchProApi';
import { getLabs_search } from '../labs_search/api/labsSearchApi';
import { getFields_search } from '../fields_search/api/fieldsSearchApi';
import { Col } from 'react-bootstrap';
import { Avatar, AvatarGroup, Button, Code, Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react';
import IconLocal from '../Components/helper_comp/IconsComp/Icon';

const AddSoftwarePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [labsSearch, setLabsSearch] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [icon, setIcon] = useState<any>();
  const [pdf, setPDF] = useState<any>();
  const [snapFile1, setSnapFile1] = useState<any>();
  const [snapFile2, setSnapFile2] = useState<any>();
  const [snapFile3, setSnapFile3] = useState<any>();
  const [snapFile4, setSnapFile4] = useState<any>();
  const [snapFile5, setSnapFile5] = useState<any>();
  const inputRef = useRef<any>(null);
  const inputRef2 = useRef<any>(null);
  const snap1 = useRef<any>(null);
  const snap2 = useRef<any>(null);
  const snap3 = useRef<any>(null);
  const snap4 = useRef<any>(null);
  const snap5 = useRef<any>(null);
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

  const [formValue, setFormValue] = useState({
    name: '',
    lastName: '',
    email: '',
    stID: '',
    nameSoftware: '',
    urlSoftware: '',
  });
  const [errorHandler, setErrorHandler] = useState({
    name: '',
    lastName: '',
    email: '',
    stID: '',
    nameSoftware: '',
    urlSoftware: '',
  });

  const fetchDataForSearch = async function () {
    try {
      await getLicenses().then(res => {
        if (res?.data?.results?.length != 0) {
          setLicenses(res.data.results);
        } else {
          setLicenses([]);
        }
      });

      await getLabs_search().then(res => {
        if (res?.data?.length != 0) {
          setLabsSearch(res?.data);
        } else {
          setLabsSearch([]);
        }
      });

      await getPlatforms().then(res => {
        if (res?.data?.results?.length != 0) {
          setPlatforms(res?.data?.results);
        } else {
          setPlatforms([]);
        }
      });

      await getFields_search()
        .then(res => {
          if (res?.data?.length != 0) {
            setFields(res?.data);
          } else {
            setFields([]);
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

  function handleChange(e: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log('ERR', e);
    setIcon(e);

    // setDragActive(true);
    // processingData();
    // setFiles([]);
    // if (e.target.files && e.target.files[0]) {
    //   for (let i = 0; i < e.target.files['length']; i++) {
    //     setFiles((prevState: any) => [...prevState, e?.dataTransfer?.files[i]]);
    //     files.push(e?.target?.files[i]);
    //     filesForm?.append(`file-${i}`, e?.target?.files[i]);
    //     if (e.target.files['length'] == i + 1) {
    //       if (files.length != 0) {
    //         callApi();
    //       }
    //     }
    //   }
    // }
  }

  function handleChangePDF(e: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log('ERR', e);
    setPDF(e);
  }

  return (
    <div dir="rtl" className="col-12 d-flex flex-wrap justify-content-around">
      <Col dir="rtl" className="mb-lg-0 mb-2" lg={3} md={6} sm={12}>
        <Input
          isRequired
          autoFocus
          id="name"
          label="نام"
          placeholder="نام را وارد کنید"
          variant="bordered"
          value={formValue.name}
          onChange={handleChangeInput}
          color={errorHandler.name.length != 0 ? 'danger' : 'success'}
        />
        {errorHandler.name.length != 0 && <Code color="danger">{errorHandler.name}</Code>}

        <Input
          className="my-2"
          isRequired
          autoFocus
          id="lastName"
          label="نام خانوادگی"
          placeholder="نام خانوادگی را وارد کنید"
          variant="bordered"
          value={formValue.lastName}
          onChange={handleChangeInput}
          color={errorHandler.lastName.length != 0 ? 'danger' : 'success'}
        />
        {errorHandler.lastName.length != 0 && <Code color="danger">{errorHandler.lastName}</Code>}

        <Input
          className="my-2"
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

        <Input
          className="my-2"
          isRequired
          autoFocus
          id="stID"
          label="شماره دانشجویی"
          placeholder="شماره دانشجویی را وارد کنید"
          variant="bordered"
          value={formValue.stID}
          onChange={handleChangeInput}
          color={errorHandler.stID.length != 0 ? 'danger' : 'success'}
        />
        {errorHandler.stID.length != 0 && <Code color="danger">{errorHandler.stID}</Code>}

        <Input
          className="my-2"
          isRequired
          autoFocus
          id="nameSoftware"
          label="نام نرم افزار"
          placeholder="نام نرم افزار را وارد کنید"
          variant="bordered"
          value={formValue.nameSoftware}
          onChange={handleChangeInput}
          color={errorHandler.nameSoftware.length != 0 ? 'danger' : 'success'}
        />
        {errorHandler.nameSoftware.length != 0 && <Code color="danger">{errorHandler.nameSoftware}</Code>}

        <Input
          className="my-2"
          isRequired
          autoFocus
          id="urlSoftware"
          label="لینک نرم افزار"
          placeholder=" لینک مربوط به نرم افزار را وارد کنید"
          variant="bordered"
          value={formValue.urlSoftware}
          onChange={handleChangeInput}
          color={errorHandler.urlSoftware.length != 0 ? 'danger' : 'success'}
        />
        {errorHandler.urlSoftware.length != 0 && <Code color="danger">{errorHandler.urlSoftware}</Code>}
      </Col>

      <Col className="mb-lg-0 mb-2" lg={3} md={6} sm={12}>
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
        <div className="flex w-full flex-wrap md:flex-nowrap my-2">
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

        <div className="flex w-full flex-wrap md:flex-nowrap my-2">
          <Select
            label={'آزمایشگاه نرم افزار'}
            onChange={(e: any) => {
              globalDataFinally.licenses_name = e.target.value;
            }}
            placeholder={'آزمایشگاه نرم افزار را انتخاب کنید'}
            size="sm">
            {labsSearch?.map((item: any, idx: number) => {
              return (
                <SelectItem key={item.name} value={item.id}>
                  {item.name}
                </SelectItem>
              );
            })}
          </Select>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap my-2">
          <Select
            label={'رشته'}
            onChange={(e: any) => {
              globalDataFinally.licenses_name = e.target.value;
            }}
            placeholder={'رشته نرم افزار را انتخاب کنید'}
            size="sm">
            {fields?.map((item: any, idx: number) => {
              return (
                <SelectItem key={item.name} value={item.id}>
                  {item.name}
                </SelectItem>
              );
            })}
          </Select>
        </div>
        <div dir="rtl" className="flex w-full flex-wrap md:flex-nowrap my-2 items-center gap-2">
          <div className="col-4 flex flex-wrap">
            <label className="my-1" htmlFor="">
              آیکون برنامه
            </label>
            <form className="pointer" onSubmit={e => e.preventDefault()}>
              {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
              <input placeholder="fileInput" className="hidden" ref={inputRef} type="file" multiple={true} onChange={handleChange} accept="image/*" />
              <Avatar
                onClick={() => {
                  inputRef.current.value = '';
                  inputRef.current.click();
                }}
                showFallback
                size="lg"
                src="https://images.unsplash.com/broken"
                fallback={icon?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <IconLocal Address={'fields.svg'} />}
              />
            </form>
          </div>
          <div className="col-4 flex flex-wrap">
            <label className="my-1" htmlFor="">
              pdf برنامه
            </label>
            <form className="pointer" onSubmit={e => e.preventDefault()}>
              {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
              <input placeholder="fileInput" className="hidden" ref={inputRef2} type="file" multiple={true} onChange={handleChangePDF} accept=".pdf" />
              <Avatar
                onClick={() => {
                  inputRef2.current.value = '';
                  inputRef2.current.click();
                }}
                showFallback
                size="lg"
                src="https://images.unsplash.com/broken"
                fallback={pdf?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <IconLocal Address={'menu/pdf.svg'} />}
              />
            </form>
          </div>

          <div className="col-2 flex flex-wrap">
            <span className="estedad-light mx-1 w-100">آنلاین</span>
            <Switch
              defaultSelected
              size="md"
              color="success"
              onChange={(e: any) => {
                globalDataFinally.offline_or_online = e.target.checked ? 1 : 2;
              }}></Switch>
          </div>
        </div>
        <div dir="rtl" className="flex w-full flex-wrap md:flex-nowrap my-2 items-center gap-2">
          <label className="my-1" htmlFor="">
            اسنپ شات ها
          </label>
          <input placeholder="fileInput" className="hidden" ref={snap1} type="file" multiple={true} onChange={setSnapFile1} accept="image/*" />
          <input placeholder="fileInput" className="hidden" ref={snap2} type="file" multiple={true} onChange={setSnapFile2} accept="image/*" />
          <input placeholder="fileInput" className="hidden" ref={snap3} type="file" multiple={true} onChange={setSnapFile3} accept="image/*" />
          <input placeholder="fileInput" className="hidden" ref={snap4} type="file" multiple={true} onChange={setSnapFile4} accept="image/*" />
          <input placeholder="fileInput" className="hidden" ref={snap5} type="file" multiple={true} onChange={setSnapFile5} accept="image/*" />
          <AvatarGroup isBordered>
            <Avatar
              onClick={() => {
                snap1.current.value = '';
                snap1.current.click();
              }}
              src="https://images.unsplash.com/broken"
              showFallback
              fallback={snapFile1?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <span>1</span>}
            />
            <Avatar
              onClick={() => {
                snap1.current.value = '';
                snap1.current.click();
              }}
              src="https://images.unsplash.com/broken"
              showFallback
              fallback={snapFile2?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <span>2</span>}
            />
            <Avatar
              onClick={() => {
                snap1.current.value = '';
                snap1.current.click();
              }}
              src="https://images.unsplash.com/broken"
              showFallback
              fallback={snapFile3?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <span>3</span>}
            />
            <Avatar
              onClick={() => {
                snap1.current.value = '';
                snap1.current.click();
              }}
              src="https://images.unsplash.com/broken"
              showFallback
              fallback={snapFile4?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <span>4</span>}
            />
            <Avatar
              onClick={() => {
                snap1.current.value = '';
                snap1.current.click();
              }}
              src="https://images.unsplash.com/broken"
              showFallback
              fallback={snapFile5?.target?.value ? <IconLocal Address={'menu/accept.svg'} /> : <span>5</span>}
            />
          </AvatarGroup>
        </div>
      </Col>
      <div className="w-100 flex flex-wrap justify-center">
        <Textarea label="توضیحات" dir="rtl" placeholder="توضیحات را وارد کنید" className="max-w-lg" />
        <div className='w-100 flex flex-wrap justify-center'>
        <Button variant='bordered' color="primary">افزودن</Button>
        </div>
      </div>
      {/* <aside></aside> */}
    </div>
  );
};
export default AddSoftwarePage;

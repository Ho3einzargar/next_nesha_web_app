import React, { useEffect } from 'react';
import Image from 'next/image';
import { MailIcon } from './MailIcon';
import { FormEvent, useState } from 'react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, modal, Spinner, Code } from '@nextui-org/react';
import { loginModel, loginUser, registerUser } from './api/authApi';
import { addAuthorization } from '@/app/Auth/methods/authorizationMethod';
import { toast } from 'react-hot-toast';
import { RedirectStatusCode } from 'next/dist/client/components/redirect-status-code';

export default function AuthModal(items: any) {
  const [signIn, setSignIn] = useState(true);
  //!
  const { onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorSame, setErrorSame] = useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  type authorizationModel = {
    access: string;
    refresh: string;
  };
  const [formValue, setFormValue] = React.useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });
  const [errorHandler, setErrorHandler] = React.useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); //? Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);

      if (signIn) {
        let finallyModel: loginModel = {
          username: formValue.username,
          password: formValue.password,
        };
        await loginUser(finallyModel).then(res => {
          if (res.data.detail) {
            toast.error(`${res.data.detail}`);
          } else {
            addAuthorization(res.data, formValue.username);
            toast.success('Login Successfully');
            items.closeModal(false);
          }
          setIsLoading(false);
        });
      } else {
        if (formValue.password == formValue.password2) {
          setErrorSame(null);
          let finallyModel: loginModel = {
            username: formValue.username,
            password: formValue.password,
          };
          await registerUser(formValue).then(res => {
            if (res.data['email'] == formValue.email) {
              setSignIn(true);
              toast.success('Register Successfully');
            } else {
              for (const key in res.data) {
                setErrorHandler(prevalue => {
                  return {
                    ...prevalue, // Spread Operator
                    [key]: res.data[key].toString(),
                  };
                });
              }
              toast.error('Register Failed');
            }
            setIsLoading(false);
          });
        } else {
          setErrorSame('passwords is not same!');
        }
      }
    } catch (error: any) {
      //? Capture the error message to display to the user
      setError('error');
      // toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setErrorHandler(errorHandler);
  }, [errorHandler]);

  const handleChangeInput = (e: any) => {
    setFormValue(prevalue => {
      return {
        ...prevalue, // Spread Operator
        [e.target.id]: e.target.value,
      };
    });

    //? Check Same Password with Password2
    if (e?.target?.id == 'password2' && formValue.password != e?.target?.value) {
      setErrorSame('passwords is not same!');
    } else {
      setErrorSame(null);
    }

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

  if (signIn) {
    return (
      <>
        <Modal isOpen={items.opened} onClose={() => items.closeModal(false)} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">SignIn</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  id="username"
                  endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                  value={formValue.username}
                  onChange={handleChangeInput}
                  color={errorHandler.username.length != 0 ? 'danger' : 'success'}
                />
                {errorHandler.username.length != 0 && <Code color="danger">{errorHandler.username}</Code>}
                <Input
                  isRequired
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> : <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />}
                    </button>
                  }
                  label="Password"
                  id="password"
                  placeholder="Enter your password"
                  type={isVisible ? 'text' : 'password'}
                  variant="bordered"
                  value={formValue.password}
                  onChange={handleChangeInput}
                  color={errorHandler.password.length != 0 ? 'danger' : 'success'}
                />
                {errorHandler.password.length != 0 && <Code color="danger">{errorHandler.password}</Code>}
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}>
                    Remember me
                  </Checkbox>
                  <Link style={{ cursor: 'pointer' }} color="primary" onClick={() => setSignIn(false)} size="sm">
                    Not registered yet? Sign Up
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => items.closeModal(false)}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isDisabled={(formValue.username.length == 0 || formValue.password.length == 0) && (errorHandler.username.length == 0 || errorHandler.password.length == 0)}>
                  {isLoading ? <Spinner color="danger" /> : 'Sign in'}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal isOpen={items.opened} onClose={() => items.closeModal(false)} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">SignUp</ModalHeader>
              <ModalBody>
                {/* username */}
                <Input
                  isRequired
                  autoFocus
                  id="username"
                  endContent={<Image alt={'userName'} src={'/images/icons/Inputs/user.png'} width="25" height="25" />}
                  label="Username"
                  placeholder="Enter your last username"
                  variant="bordered"
                  onChange={handleChangeInput}
                  pattern="^[A-Za-z][A-Za-z0-9_]{5,29}$"
                  color={errorHandler.username.length != 0 ? 'danger' : 'success'}
                />

                {errorHandler.username.length != 0 && <Code color="danger">{errorHandler.username}</Code>}

                {/* Email */}
                <Input
                  isRequired
                  autoFocus
                  id="email"
                  endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  color={errorHandler.email.length != 0 ? 'danger' : 'success'}
                  onChange={handleChangeInput}
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                />
                {errorHandler.email.length != 0 && <Code color="danger">{errorHandler.email}</Code>}

                {/* Password */}
                <Input
                  isRequired
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> : <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />}
                    </button>
                  }
                  label="Password"
                  id="password"
                  placeholder="Enter your password"
                  type={isVisible ? 'text' : 'password'}
                  variant="bordered"
                  color={errorHandler.password.length != 0 ? 'danger' : 'success'}
                  onChange={handleChangeInput}
                  minLength={5}
                />
                {errorHandler.password.length != 0 && <Code color="danger">{errorHandler.password}</Code>}

                {/* password2 */}
                <Input
                  isRequired
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                      {isVisible2 ? <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> : <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />}
                    </button>
                  }
                  label="repeat password"
                  id="password2"
                  placeholder="Enter your password"
                  type={isVisible2 ? 'text' : 'password'}
                  variant="bordered"
                  color={errorHandler.password2.length != 0 || errorSame ? 'danger' : 'success'}
                  onChange={handleChangeInput}
                  minLength={5}
                />
                {(errorHandler.password2.length != 0 || errorSame) && <Code color="danger">{errorHandler.password2 || errorSame} </Code>}

                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" onClick={() => setSignIn(true)} size="sm">
                    You have an account? Sign in
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => items.closeModal(false)}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isDisabled={
                    formValue.password2.length == 0 ||
                    formValue.password.length == 0 ||
                    formValue.username.length == 0 ||
                    formValue.email.length == 0 ||
                    errorHandler.username.length != 0 ||
                    errorHandler.password2.length != 0 ||
                    errorHandler.email.length != 0 ||
                    errorHandler.password.length != 0 ||
                    errorSame != null
                  }>
                  {isLoading ? <Spinner color="danger" /> : 'Sign Up'}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

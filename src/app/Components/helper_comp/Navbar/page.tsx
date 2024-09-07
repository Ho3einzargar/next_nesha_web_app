'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import React, { useEffect } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  AvatarIcon,
  VisuallyHidden,
  useSwitch,
  Switch,
} from '@nextui-org/react';
import { isLoggined, logOut } from '@/app/Auth/methods/authorizationMethod';
import { useRouter } from '@/app/Components/onComplete/router';
import AuthModal from '../../Modals/Auth/authModal';
import { NavHeadMenu } from '@/app/helper/MenuNavbar/menu_navbar';
import { getLocalSTG, setLocalSTG } from '@/app/helper/localRepository/localStorage';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import IconLocal from '../IconsComp/Icon';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [isDarkMode, setDarkMode] = React.useState(true);
  const [username, setUsername] = React.useState<any>(null);
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = (checked: boolean) => {
    console.log('CHECKED', checked);

    checked ? setTheme('dark') : setTheme('light');
    setDarkMode(checked);
  };

  function checkUrl(url: any) {
    if (url == pathName) {
      return true;
    } else {
      return false;
    }
  }

  const GenerateItem = (item: any) => {
    return (
      <NavbarItem key={item.id}>
        <Button variant="light" onClick={() => router.push(item.link)}>
          <span className={`estedad-light ${checkUrl(item.link) ? 'link' : ''}`}>{item.name}</span>
          <IconLocal Address={item.icon + '.svg'} />
        </Button>
      </NavbarItem>
    );
  };

  const checkUserInfo = () => {
    if (isLoggined()) {
      setUsername(getLocalSTG('username'));
    }
  };

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['']));

  useEffect(() => {
    theme == 'light' ? setDarkMode(false) : setDarkMode(true);
    //? Set Language
    checkUserInfo();
  }, []);

  return (
    <React.Fragment>
      <Navbar className="overflow-x-auto" shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="mb-0">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
          <NavbarBrand>
            <p className="font-bold text-light m-0">Nesha</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 mb-0" justify="center">
          {NavHeadMenu.map((text: any, index: any) => GenerateItem(text))}
        </NavbarContent>

        <NavbarContent className="d-flex justify-content-start justify-content-sm-end mb-0 ps-0 ps-sm-3">
          {/*//? Sign IN  */}
          <NavbarItem className="align-items-center">
            {username == null && (
              <Button onPress={() => setOpenModal(true)} color="primary" variant="flat">
                Sign In
              </Button>
            )}
            {username && (
              <Dropdown>
                <DropdownTrigger>
                  <Button className="icon-btn px-0">
                    <Avatar
                      size="sm"
                      icon={<AvatarIcon />}
                      classNames={{
                        base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
                        icon: 'text-black/80',
                      }}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="selection example" variant="flat" closeOnSelect={true} disallowEmptySelection selectionMode="none">
                  <DropdownItem key={1} startContent={<IconLocal Address={'user.png'} />}>
                    {username}
                  </DropdownItem>
                  <DropdownItem
                    key={2}
                    startContent={<IconLocal Address={'logout_red.png'} />}
                    onClick={() => {
                      logOut();
                      setUsername(null);
                    }}>
                    logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
            {openModal && (
              <AuthModal
                opened={openModal}
                closeModal={(e: any) => {
                  setOpenModal(e);
                  checkUserInfo();
                }}
              />
            )}
          </NavbarItem>

          {/*//? Dark Switch  */}
          <NavbarItem className="align-items-center">
            {/* <Button onClick={() => (theme == 'light' ? setTheme('dark') : setTheme('light'))}>THEME</Button> */}
            {/* <ThemeSwitch changeTheme={(e: any) => console.log('CH', e)} /> */}
            <Switch
              isSelected={!isDarkMode}
              onChange={(e: any) => toggleDarkMode(!e.target.checked)}
              size="md"
              color="secondary"
              thumbIcon={({ isSelected, className }) => (isSelected ? <SunIcon className={className} /> : <MoonIcon className={className} />)}></Switch>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {NavHeadMenu.map((item: any, index: any) => (
            <NavbarMenuItem key={item.id}>
              <a onClick={() => router.push(item.link)}>{item.name}</a>
              {/* <Link color={index === 2 ? 'primary' : index === NavHeadMenu.length - 1 ? 'danger' : 'foreground'} className="w-full" href={item.link} size="lg">
                {item.name}
              </Link> */}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </React.Fragment>
  );
}

const ThemeSwitch = (props: any) => {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: ['w-8 h-8', 'flex items-center justify-center', 'rounded-lg bg-default-100 hover:bg-default-200'],
          })}>
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

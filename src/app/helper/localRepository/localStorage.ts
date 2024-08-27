export const setLocalSTG = (name: string, data: any) => {
  if (typeof window != 'undefined') {
    return window?.localStorage.setItem(name, data);
  }
};

export const getLocalSTG = (name: any) => {
  if (typeof window != 'undefined') {
    return window?.localStorage?.getItem(name);
  }
};

export const removeLocalSTG = (name: string) => {
  if (typeof window != 'undefined') {
    return window?.localStorage?.removeItem(name);
  }
};

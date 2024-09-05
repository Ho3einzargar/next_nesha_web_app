const IsMobile = () => {
  let userAgent = navigator.userAgent || navigator.vendor;
  let mobile = /android/i.test(userAgent) || /iPhone|ipad|iPod/i.test(userAgent);
  return mobile;
  return null;
};
export default IsMobile;

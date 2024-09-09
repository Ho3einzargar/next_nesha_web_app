'use client';
import './globals.css';
import './nprogress.css';
import { Providers } from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import localFont from '@next/font/local';
import './footer.css';
import { Card } from '@nextui-org/react';

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Iranian_sans.ttf',
      weight: '1000',
    },
    // {
    //   path: '../../public/fonts/Poppins-Bold.ttf',
    //   weight: '700'
    // }
  ],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans dark`}>
      <body>
        <Providers>{children}</Providers>
        <footer className='w-100'>
          <Card className="w-100 mt-2 p-3 forter">
            <div className="container">
              <div className="row justify-content-center">
                {/* <div className="col-sm-4 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>
                    <a href="#">Web design</a>
                  </li>
                  <li>
                    <a href="#">Development</a>
                  </li>
                  <li>
                    <a href="#">Hosting</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 col-md-3 item">
                <h3>ارتباط با ما</h3>
                <ul>
                  <li>
                    <a href="#">آدرس : سمنان - روبروی پارک سوکان - پردیس شماره یک - سازمان مرکزی دانشگاه سمنان کد پستی : 19111-35131</a>
                  </li>
                  <li>
                    <a href="#">تلفن : 02331530000 ساعت کاری : شنبه تا چهارشنبه 7:30 الی 15:30</a>
                  </li>
                  <li>
                    <a href="#">سامانه پیامکی روابط عمومی: 30002314</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 col-md-3 item">
                <ul>
                  <li>
                    <a href="#">خانه</a>
                  </li>
                  <li>
                    <a href="#">رشته ها</a>
                  </li>
                  <li>
                    <a href="#">آزمایشگاه ها</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 item social">
                <a href="#">
                  <i className="icon ion-social-facebook"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-twitter"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-snapchat"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-instagram"></i>
                </a>
              </div> */}
              </div>
              <div className="row justify-content-center text-center">
                <p className="copyright">Company Name © 2024</p>
                <p className="text-center mb-1">
                  1717 Harrison St, San Francisco, CA 94103, USA <br />
                  &copy; HOOH alrights reserved
                </p>
              </div>
            </div>
          </Card>
        </footer>
      </body>
    </html>
  );
}

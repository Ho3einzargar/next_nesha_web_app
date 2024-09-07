'use client';
import './globals.css';
import './nprogress.css';
import { Providers } from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import localFont from '@next/font/local';
import './footer.css';

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
        <footer className='w-100 mt-4'>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-4 col-md-3 item">
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
                <h3>About</h3>
                <ul>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                  <li>
                    <a href="#">Legacy</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 col-md-3 item">
                <h3>Careers</h3>
                <ul>
                  <li>
                    <a href="#">Job openings</a>
                  </li>
                  <li>
                    <a href="#">Employee success</a>
                  </li>
                  <li>
                    <a href="#">Benefits</a>
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
                <p className="copyright">Company Name © 2018</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

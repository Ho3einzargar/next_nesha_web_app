// import checkMark from "../../assets/img/check-mark.svg";
import './ServicesList.css';

const ServicesList = () => {
  return (
    <div dir="rtl" className="services__list">
      <div className="services__item">
        <div className="services__icon">{/* <img src={checkMark} alt="check mark" /> */}</div>
        <div className="services__description">
          <h4>نشا چه کاری انجام می‌دهد</h4>
          <p>پیدا کردن نرم‌افزارهای آزمایشگاهی و قابلیت ثبت نظرات، پیشنهادات، مطالب مرتبط با هر نرم‌افزار و افزودن نرم‌افزار جدید خدماتی است که نشا ارائه می‌دهد.</p>
        </div>
      </div>

      <div className="services__item">
        <div className="services__icon">{/* <img src={checkMark} alt="check mark" /> */}</div>
        <div className="services__description">
          <h4>بخش نرم‌افزارها</h4>
          <p>
            در بخش جستجو در
            <a href="/search" target="_blank" className="word-link">
              نرم‌افزارها
            </a>
            با استفاده از فیلترهای پیشرفته می‌توانید نرم‌افزار مورد نظرتان را پیدا کنید. در صورت پیدا نکردن نرم افزار مورد نظر، با ایجاد حساب کاربری می‌توانید اطلاعات آزمایشگاه دلخواهتان را با ما به
            اشتراک بگذارید تا ما آن را به لیست نرم‌افزارها اضافه کنیم.
          </p>
        </div>
      </div>

      <div className="services__item">
        <div className="services__icon">{/* <img src={checkMark} alt="check mark" /> */}</div>
        <div className="services__description">
          <h4>بخش رشته‌ها و آزمایشگاه‌ها</h4>
          <p>
            نرم‌افزارهای مربوط به آزمایشگاه‌های بسیاری در این وبسایت پوشش داده شده است. با جستجو در بخش
            <a href="/field-search" target="_blank" className="word-link">
              &nbsp;رشته‌ها
            </a>
            می‌توانید
            <a href="/field-search" target="_blank" className="word-link">
              آزمایشگاه
            </a>
            ‌های مربوط به رشته مورد نظر و در بخش آزمایشگاه‌ها ، نرم‌افزارهای مربوط به آن رشته را پیدا کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;

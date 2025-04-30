import logoFooter1 from '../../img/logo.png'
import logoFooter2 from '../../img/logo enamad.png'
import logoFooter3 from '../../img/samandehi-1030x1030.png'


const Footer=()=>{
    return(
        <footer className="footer h-[450px] relative flex items-center justify-center">
            <div className="svg absolute top-[-10px] left-[-15px] flex">
            <svg width="2000" height="500" xmlns="http://www.w3.org/2000/svg">
                {/* <!-- منحنی با موج‌های تغییر یافته (برعکس شده) --> */}
                <path d="M0,250 C100,200 200,300 250,250 C300,200 400,300 450,250 C500,200 600,300 650,250
                        C700,200 800,300 850,250 C900,200 1000,300 1050,250 C1100,200 1200,300 1250,250
                        C1300,200 1400,300 1450,250 C1500,200 1600,300 1650,250 C1700,200 1800,300 1850,250"
                    fill="none"/>
    
                {/* <!-- رنگ زدن قسمت بالای منحنی با ارتفاع 50 پیکسل بیشتر (برعکس شده) --> */}
                <path d="M0,100 C100,50 200,150 250,100 C300,50 400,150 450,100 C500,50 600,150 650,100
                        C700,50 800,150 850,100 C900,50 1000,150 1050,100 C1100,50 1200,150 1250,100
                        C1300,50 1400,150 1450,100 C1500,50 1600,150 1650,100 C1700,50 1800,150 1850,100
                        L1800,0 L0,0 Z"
                    fill="#3073c1"/>
            </svg>
            </div>
            <div className="flex gap-100 items-center justify-center mt-[50px]">
            <div className="logosFooter flex gap-[10px]">
                <img src={logoFooter2}alt="" />
                <img src={logoFooter3}alt="" />
                <img src={logoFooter1}alt="" />
            </div>
            <div className="info flex flex-col gap-[3px]">
                <p className="text-end text-gray-700">تمامی حقوق این سایت در اختیار دانشگاه میباشد</p>
                <p className="text-end text-gray-700">آدرس : خوزستان , بهبهان , دانشگاه صنعتی خاتم الانبیاء(ص)</p>
                <p className="text-end text-gray-700">تلفن : ۵۲۷۲۱۲۳۰-۵۲۷۲۱۱۹۱-۰۶۱</p>
                <p className="text-end text-gray-700">khatamuni@gmail.com : ایمیل</p>
            </div>
            </div>
      </footer>
    )
}
export default Footer;
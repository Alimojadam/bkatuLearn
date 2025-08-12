import logoFooter1 from '../img/logo.png'
import logoFooter2 from '../img/logo enamad.png'
import logoFooter3 from '../img/samandehi-1030x1030.png'


const Footer=()=>{
    return(
        <footer className="min-h-[200px] flex items-start justify-center bg-transparent">
            <div className="flex gap-10 sm:gap-100 flex-col-reverse sm:flex-row items-center justify-between mt-[30px] sm:mb-[20px]">
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
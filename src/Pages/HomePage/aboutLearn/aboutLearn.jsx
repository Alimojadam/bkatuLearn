import { useNavigate } from 'react-router-dom';
import khatam from '../../img/khatam.png'


const AboutLearn=()=>{
    const navigate = useNavigate();
      
    const handleClick = (e) => {
        e.preventDefault(); // جلوگیری از رفرش شدن صفحه
        navigate('/loginPage'); // رفتن به صفحه لاگین
    };
    return(
        <section className="h-[500px] grid item-center justify-center relative">
            <div className="khatam-img-body absolute flex text-center justify-center items-center top-3 right-70 w-[100%]">
            <img src={khatam} alt="" />
            </div>
            <section className="flex flex-col gap-15 sm:gap-0 sm:flex-row items-center justify-center sm:mr-[50px] mt-[50px] sm:mt-[200px]">
                <div className="relative w-[600px]">
                    <p className="text-end text-[19px] px-[100px] pr-[160px] text-white w-[660px]">در سیستم نرم افزاری طراحی شده ما شما میتوانید با مشاهده نمونه تدریس اساتید مختلف و آشنایی با روش تدریس هریک مطابق سلیقه خود دوره آن ها را تهیه کنید و سپس میتوانید با مدرس هر دوره ارتباط داشته باشید و سوالات خود را بپرسید</p>
                    <div className="btn btn-white mt-[12px] absolute right-26">
                    <a href="/loginPage" onClick={handleClick} className="text-end">ثبتنام یا ورود</a>
                    </div>
                </div>
                <div className="w-full flex sm:block flex-col justify-center items-center w-[300px] mt-[20px] sm:mr-[50px]">
                    <pre className="flex text-start text-[24px] text-white justify-end "> توهم میتونی</pre>              
                    <pre className="flex text-start text-[24px] text-white">رو <pre className="text-[#edd400]">هر چیزی که بلدی</pre></pre>
                    <pre className="flex text-start text-[24px] text-white justify-end">!به بقیه درس بدی</pre>              
                </div>
            </section>
      </section>
    )
}
export default AboutLearn;
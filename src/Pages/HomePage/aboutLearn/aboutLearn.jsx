import khatam from '../../img/khatam.png'


const AboutLearn=()=>{
    return(
        <section className="h-[500px] grid relative">
            <div className="khatam-img-body absolute flex text-center justify-center items-center top-3 right-70 w-[100%]">
            <img src={khatam} alt="" />
            </div>
            <section className="flex item-center justify-center mr-[50px] mt-[200px]">
                <div className="relative w-[600px]">
                    <p className="text-end text-[19px] px-[100px] pr-[160px] text-white w-[660px]">در سیستم نرم افزاری طراحی شده ما شما میتوانید با مشاهده نمونه تدریس اساتید مختلف و آشنایی با روش تدریس هریک مطابق سلیقه خود دوره آن ها را تهیه کنید و سپس میتوانید با مدرس هر دوره ارتباط داشته باشید و سوالات خود را بپرسید</p>
                    <div className="btn btn-white mt-[12px] absolute right-26">
                    <a href="#" className="text-end">ثبتنام یا ورود</a>
                    </div>
                </div>
                <div className="w-[300px] mt-[20px] mr-[50px]">
                <pre className="flex text-start text-[24px] text-white grid justify-end mr-[40px]"> توهم میتونی</pre>              
                <pre className="flex text-start text-[24px] text-white">رو <pre className="text-[#edd400]">هر چیزی که بلدی</pre></pre>
                <pre className="flex text-start text-[24px] text-white grid justify-end mr-[40px]">!به بقیه درس بدی</pre>              
                </div>
            </section>
      </section>
    )
}
export default AboutLearn;


const ChooseField=()=>{
    return(
        <div className="flex flex-col sm:grid items-center justify-center p-5 sm:p-10 mb-[320px] sm:mb-[190px] gap-35 sm:gap-10 z-10">
                    <div className="">
                    <h2 className="text-center text-[25px] sm:text-[28px]">!رشتتو انتخاب کن و شروع کن به خوندن</h2>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-35 sm:gap-50 sm:mr-[100px] max-w-2xl">
                        <div className="sm:grid gap-5">
                            <h3 className="text-end text-[26px] text-[#c1ab30]">مهندسی کامپیوتر</h3>
                            <p className="hidden sm:block max-w-xl text-end text-[18px] text-gray-900">رشته مهندسی کامپیوتر یکی از رشته های پر درآمد بازار است که شما میتواند با یادگیری دروس این حوزه به راحتی وارد بازار کار شوید و کسب درآمد نمایید</p>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <a className="flash text-white z-20 text-[24px] absolute right-[220px] sm:right-[130px] text-center">&#60;</a>
                            <div className="img-box1 absolute"></div>
                            <div className="img-box2 absolute"></div>
                             <a className="flash text-white z-20 text-[24px] absolute left-[220px] sm:left-[130px] text-center">&#62;</a>
                        </div>
                    </div>
                </div>
    )
}
export default ChooseField;
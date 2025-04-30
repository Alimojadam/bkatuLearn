

const ChooseField=()=>{
    return(
        <div className=" grid items-center justify-center p-10 mb-[190px] gap-10 z-10">
                    <div className="">
                    <h2 className="text-center text-[28px]">!رشتتو انتخاب کن و شروع کن به خوندن</h2>
                    </div>
                    <div className="flex gap-50 mr-[100px] max-w-2xl">
                        <div className="grid gap-5">
                        <h3 className="text-end text-[26px] text-[#c1ab30]">مهندسی کامپیوتر</h3>
                        <p className="max-w-xl text-end text-[18px] text-gray-900">رشته مهندسی کامپیوتر یکی از رشته های پر درآمد بازار است که شما میتواند با یادگیری دروس این حوزه به راحتی وارد بازار کار شوید و کسب درآمد نمایید</p>
                        </div>
                        <div className="relative flex items-center justify-center">
                    <a className="flash text-white z-20 text-[24px] absolute right-[130px] text-center">&#60;</a>
                    <div className="img-box1 absolute"></div>
                    <div className="img-box2 absolute"></div>
                    <a className="flash text-white z-20 text-[24px] absolute left-[130px] text-center">&#62;</a>
                        </div>
                    </div>
                </div>
    )
}
export default ChooseField;
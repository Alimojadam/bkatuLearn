import user from '../img/userIMG.jpg';






const Profil=()=>{

    return(
        <div className="flex flex-col justify-start items-end gap-20 mt-[10px] ml-[130px] w-[60%] h-[80vh] bg-transparent border border-2 border-[#3073c1] rounded-[10px] shadow-xl">
                        <div className="flex flex-col gap-3 w-[150px] h-[150px] rounded-[50%] mt-[-15%] mr-[33%]">
                            <img src={user} alt="" className="w-[150px] h-[150px] rounded-[50%]" />
                            <p className="text-center text-[#3073c1] text-[20px]">ممد عبدلا</p>
                        </div>
                        <div className="mr-[20px]">
                            <div className="flex flex-col justify-start items-end gap-2">
                                <p className="text-end text-[#3073c1] text-[19px]">شماره دانشجویی : 40012102048</p>
                                <p dir="rtl" className="text-end text-[#3073c1] text-[19px]">ایمیل : alihgugtdrfugug@gmail.com</p>
                                <p className="text-end text-[#3073c1] text-[19px]">دانشگاه محل تحصیل : خاتم الانبیا بهبهان</p>
                                <p className="text-end text-[#3073c1] text-[19px]">درباره من : سلام! من</p>
                            </div>
                        </div>
        </div>
    )
}
export default Profil;
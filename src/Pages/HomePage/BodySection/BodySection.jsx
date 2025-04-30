import back_img from '../../img/pattern.png'
import { useEffect, useRef, useState } from 'react';
import IntroductionOfTeachers from './IntroductionOfTeachers';
import { textContext } from './context';
import ChooseField from './ChooseField';


const BodySection=()=>{
    const bodySecRef = useRef(null); // برای دسترسی به div با کلاس body-sec
    const [bgColor, setBgColor] = useState('');
    const imageRef = useRef(null); // برای دسترسی به تصویر img
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
        const div = bodySecRef.current;
        const color = window.getComputedStyle(div).backgroundColor;
        setBgColor(color); // ذخیره رنگ پس‌زمینه در state
        if (imageRef.current) {
          const imageSrc = imageRef.current.src;
          setBgImage(imageSrc); // ذخیره آدرس تصویر
        }
      }, []);

    return(
        <textContext.Provider value={{bgColor,setBgColor}}>

            <section className="relative grid body-sec mt-[50px]" ref={bodySecRef}>
                <div className="svg absolute top-[-25px] left-[-15px] flex">
                    <svg width="2000" height="500" xmlns="http://www.w3.org/2000/svg">
                        {/* <!-- منحنی با موج‌های بیشتر --> */}
                        <path d="M0,250 C50,200 150,300 200,250 C250,200 350,300 400,250 C450,200 550,300 600,250
                                C650,200 750,300 800,250 C850,200 950,300 1000,250 C1050,200 1150,300 1200,250
                                C1250,200 1350,300 1400,250 C1450,200 1550,300 1600,250 C1650,200 1750,300 1800,250"
                            fill="none" />
            
                        {/* <!-- رنگ زدن قسمت بالای منحنی با ارتفاع 50 پیکسل کمتر --> */}
                        <path d="M0,50 C50,0 150,100 200,50 C250,0 350,100 400,50 C450,0 550,100 600,50
                                C650,0 750,100 800,50 C850,0 950,100 1000,50 C1050,0 1150,100 1200,50
                                C1250,0 1350,100 1400,50 C1450,0 1550,100 1600,50 C1650,0 1750,100 1800,50
                                L1800,0 L0,0 Z"
                            fill="#3073c1"/>
                    </svg>

                </div>
                <div className="back-img absolute w-full top-0"><img ref={imageRef} src={back_img} alt="" /></div>
                <IntroductionOfTeachers/>
                <div className="back-img absolute w-full top-150">
                <img src={back_img} alt="" />
                </div>
                <ChooseField/>
                <div className="svg absolute top-[900px] left-[-15px] flex">
                <svg width="2000" height="500" xmlns="http://www.w3.org/2000/svg">
                    {/* <!-- منحنی با موج‌های تغییر یافته --> */}
                    <path d="M0,250 C100,300 200,200 250,250 C300,300 400,200 450,250 C500,300 600,200 650,250
                            C700,300 800,200 850,250 C900,300 1000,200 1050,250 C1100,300 1200,200 1250,250
                            C1300,300 1400,200 1450,250 C1500,300 1600,200 1650,250 C1700,300 1800,200 1850,250"
                        fill="none"/>
        
                    {/* <!-- رنگ زدن قسمت بالای منحنی با ارتفاع 50 پیکسل بیشتر --> */}
                    <path d="M0,400 C100,450 200,350 250,400 C300,450 400,350 450,400 C500,450 600,350 650,400
                            C700,450 800,350 850,400 C900,450 1000,350 1050,400 C1100,450 1200,350 1250,400
                            C1300,450 1400,350 1450,400 C1500,450 1600,350 1650,400 C1700,450 1800,350 1850,400
                            L1800,500 L0,500 Z"
                        fill="#3073c1"/>
                </svg>
                </div>
            </section>
        </textContext.Provider>
    )
}

export default BodySection;
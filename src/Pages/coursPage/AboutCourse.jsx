







const AboutCourse=(props)=>{


    return (
      <div dir="rtl" className="min-h-screen w-full mt-24 text-right pb-[15px]">
        <p className="text-[17px] text-[#111] indent-[1.5rem] text-justify leading-relaxed">
            {props.aboutCourse}
        </p>
      </div>
    );
}
export default AboutCourse;
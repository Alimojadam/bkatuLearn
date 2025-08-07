import student from '../../img/png.png'

const SetStudentImg=()=>{
    return(
        <div className='hidden md:block'>
            <div className=" student-img z-10 absolute flex justify-center items-center">
                <img src={student} alt="" />
            </div>
            <div className="flex gap-5">
                <div className="grid userNumber statistic z-10 text-center absolute">
                    <p>+200</p>
                    <p>کاربر</p>
                </div>
                <div className="grid teacherNumber statistic z-10 text-center absolute">
                    <p>+13</p>
                    <p>مدرس</p>
                </div>
                <div className="grid accordNumber statistic z-10 text-center absolute">
                    <p>100%</p>
                    <p>رضایت</p>
                </div>
                <div className="grid session statistic z-10 text-center absolute">
                    <p>+140</p>
                    <p>دوره</p>
                </div>
            </div>
        </div>
    )
}
export default SetStudentImg;
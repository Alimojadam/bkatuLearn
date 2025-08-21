import { useParams } from "react-router-dom";



const UserPage=()=>{

    const { id } = useParams();

    return(
        <div className="w-full min-h-screen bg-[#eef3f9] flex justify-center items-center">

             <div>صفحه کاربر با ID: {id}</div>;

        </div>
    )
}
export default UserPage;




const Requests=()=> {

    const requestsData = [
        { type: "UnderReview", name: "علی", title: "افزودن دوره جدید" },
        { type: "Rejected", name: "ممد", title: "افزودن ویدیو جدید" },
        { type: "Accepted", name: "امیر", title: "تدریس" },
      ];
      
      const getStatus = (type) => {
        switch (type) {
          case "Accepted":
            return "تایید شده";
          case "Rejected":
            return "رد شده";
          case "UnderReview":
            return "در انتظار تایید";
          default:
            return "نامشخص";
        }
      };
      

    const getColor = (type) => {
        switch (type) {
            case "Accepted":
              return "text-green-600";
            case "Rejected":
              return "text-red-500";
            case "UnderReview":
              return "text-[#3073c1]";
            default:
              return "text-gray-700";
        }
    }
    const getBorderColor = (type) => {
        switch (type) {
          case "Accepted":
            return "border-green-600";
          case "Rejected":
            return "border-red-500";
          case "UnderReview":
            return "text-[#3073c1]";
          default:
            return "border-gray-700";
        }
    };

    const handleRequest=(type)=>{
        if (type==="Accepted"){
            alert("شما قبلا این درخواست را قبول کردین")
            return;
        } else if(type==="Rejected"){
            alert("شما قبلا این درخواست را رد کردید")
            return;
        }else if(type==="UnderReview"){
            alert("آیا میخواهید این درخواست را قبول کنید؟")
            return;
        }else{
            alert("Error")
        }
    }
    

    return(
        <div className="w-full min-h-screen flex justify-start sm:justify-center items-start mt-15 ml-5 sm:ml-0">
            <ul dir="rtl" className="w-[85%] sm:w-[80%] flex flex-col justify-center items-center gap-5">
                {requestsData.map((item,index)=>(
                    <li key={index} onClick={()=>handleRequest(item.type)} className={`flex justify-between items-center text-[16px] sm:text-[18px] border rounded-[5px] py-2 px-3 w-full sm:w-[95%] cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-xl ${getBorderColor(item.type)}`}>
                        <p className={`${getColor(item.type)}`}>درخواست {item.title} از {item.name}</p>
                        <p className={`${getColor(item.type)} hidden sm:block`}>{getStatus(item.type)}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Requests;
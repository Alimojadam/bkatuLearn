import { useState } from "react";





const MessagesPage=()=>{

    const [Messages,setMessages]=useState([
        {messageId:1, type : "read" , name:"علی مجدم"},
        {messageId:2, type : "unRead" , name:"محمد امین عبدلاپور"}
    ])

    // تابع هندل تغییر وضعیت پیام به خوانده‌شده
    const handleSetMessage = (id) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.messageId === id ? { ...msg, type: "read" } : msg
            )
        );
    };

    return(
        <div className="w-full bg-[#eef3f9] min-h-screen flex justify-center items-start mt-10 mr-5 sm:mr-0">

            <ul className="w-[80%] flex flex-col justify-center items-center gap-5">
                {Messages.map((message)=>(
                    <li key={message.messageId} className={`w-full py-2 flex flex-col sm:flex-row-reverse justify-between items-end sm:items-center gap-3 sm:gap-0 border px-3 py-1 rounded-md shadow-md ${message.type==="read"?"border-[#1E3A8A]":"border-orange-500"}`}>
                        <div className="flex flex-row-reverse justify-center items-center gap-3">
                            <span
                                className={`inline-block w-3 h-3 rounded-full ${
                                message.type === "read" ? "bg-[#1E3A8A]" : "bg-orange-500"
                                }`}
                            ></span>
                            <p className={`text-[17px] ${message.type==="read"?"text-[#1E3A8A]":"text-orange-500"}`}>یک پیام جدید از {message.name}</p>
                        </div>
                        <div className="w-full sm:w-auto flex gap-3 justify-between sm:justify-end items-center">
                            <p onClick={()=>handleSetMessage(message.messageId)} className="border border-[#1E3A8A] rounded-md text-[#1E3A8A] px-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md">مشاهده</p>
                            <p className={`text-[15px] ${message.type==="read"?"text-green-700":"hidden"}`}>خوانده شده</p>
                            <p className={`text-[15px] ${message.type==="unRead"?"text-red-600":"hidden"}`}>خوانده نشده</p>
                        </div>
                    </li>
                ))}

            </ul>

        </div>
    )
}
export default MessagesPage;
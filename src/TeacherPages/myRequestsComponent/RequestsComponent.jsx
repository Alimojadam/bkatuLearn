import { useUser } from "../../Pages/coursesContext";




const RequestsComponent = () => {
  const {user}=useUser();
  const Requests = user?.myRequests || [];
  
    // const Requests=[
    //     { RequestsId: 1, title: "آموزش React", status: "pending" },
    //     { RequestsId: 2, title: "دوره طراحی وب", status: "approved" },
    //     { RequestsId: 3, title: "آموزش فیگما", status: "rejected" },
    // ];
    

    const statusStyles = {
      approved: "text-green-700 bg-green-100",
      rejected: "text-red-700 bg-red-100",
      pending: "text-yellow-700 bg-yellow-100",
    };
  
    return (
      <div className="mt-5 sm:mt-0">
        <h3 className="text-3xl font-bold text-[#2c5282] mb-6 text-center">درخواست‌های من</h3>
        {Requests.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">درخواستی ثبت نکرده‌اید.</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {Requests.map((req) => (
              <li
                key={req.RequestsId}
                className="flex justify-between items-center border border-[#2c5282] rounded-xl p-5 shadow bg-[#fefefe] hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-semibold text-[#2c5282]">{req.title}</h4>
                <span
                  className={`font-semibold px-4 py-2 rounded-full select-none ${
                    statusStyles[req.status] || "text-gray-600 bg-gray-100"
                  }`}
                >
                  {req.status === "approved"
                    ? "تایید شده"
                    : req.status === "rejected"
                    ? "رد شده"
                    : "در انتظار تایید"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default RequestsComponent;
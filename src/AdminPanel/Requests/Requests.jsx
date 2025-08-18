import { useState } from "react";

const Requests = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestsData, setRequestsData] = useState([
    { type: "UnderReview", name: "علی", title: "افزودن دوره جدید" },
    { type: "Rejected", name: "ممد", title: "افزودن ویدیو جدید" },
    { type: "Accepted", name: "امیر", title: "تدریس" },
  ]);

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
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "Accepted":
        return "border-green-600";
      case "Rejected":
        return "border-red-500";
      case "UnderReview":
        return "border-[#3073c1]";
      default:
        return "border-gray-700";
    }
  };

  const handleRequest = (item, index) => {
    setSelectedRequest({ ...item, index });
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedRequest(null), 300); // بعد از انیمیشن پاک بشه
  };

  const handleConfirm = () => {
    if (!selectedRequest) return;
    const updated = [...requestsData];
    updated[selectedRequest.index].type = "Accepted";
    setRequestsData(updated);
    handleClose();
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    const updated = [...requestsData];
    updated[selectedRequest.index].type = "Rejected";
    setRequestsData(updated);
    handleClose();
  };

  const renderModalContent = () => {
    if (!selectedRequest) return null;
    const { type, name, title } = selectedRequest;

    if (type === "Accepted") {
      return (
        <>
          <h2 className="text-lg font-bold mb-4 text-end">این درخواست قبلاً تایید شده است</h2>
          <p className="mb-4 text-end">
            درخواست "{title}" از "{name}" قبلاً تأیید شده و نیاز به اقدام مجدد ندارد
          </p>
          <div className="flex justify-start w-full">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl text-white"
            >
              بستن
            </button>
          </div>
        </>
      );
    }

    if (type === "Rejected") {
      return (
        <>
          <h2 className="text-lg font-bold mb-4 text-end">این درخواست قبلاً رد شده است</h2>
          <p className="mb-4 text-end">
            درخواست "{title}" از "{name}" قبلاً رد شده و نمی‌توانید دوباره آن را بررسی کنید
          </p>
          <div className="flex justify-start w-full">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl text-white"
            >
              بستن
            </button>
          </div>
        </>
      );
    }

    if (type === "UnderReview") {
      return (
        <>
          <h2 className="text-lg font-bold mb-4 text-end">آیا از تایید مطمئن هستید؟</h2>
          <p className="mb-4 text-end">
            درخواست "{title}" از "{name}" پس از تایید به دوره افزوده خواهد شد
          </p>
          <div className="flex justify-between items-center gap-4 w-full">
            <div>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-500 rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl text-white"
              >
                بستن
              </button>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-[snow] rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                رد
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-700 text-[snow] rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                تایید
              </button>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="w-full min-h-screen flex justify-start sm:justify-center items-start mt-15 ml-5 sm:ml-0">
      <ul
        dir="rtl"
        className="w-[85%] sm:w-[80%] flex flex-col justify-center items-center gap-5"
      >
        {requestsData.map((item, index) => (
          <li
            key={index}
            onClick={() => handleRequest(item, index)}
            className={`flex justify-between items-center text-[16px] sm:text-[18px] border rounded-[5px] py-2 px-3 w-full sm:w-[95%] cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-xl ${getBorderColor(
              item.type
            )}`}
          >
            <p className={`${getColor(item.type)}`}>
              درخواست {item.title} از {item.name}
            </p>
            <p className={`${getColor(item.type)} hidden sm:block`}>
              {getStatus(item.type)}
            </p>
          </li>
        ))}
      </ul>

      {/* مدال همیشه داخل DOM */}
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`w-[90%] sm:w-[35%] flex flex-col justify-center items-end bg-[snow] p-5 rounded-lg shadow-xl transform transition-all duration-300
            ${modalOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
        >
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default Requests;

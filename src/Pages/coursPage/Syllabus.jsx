import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Syllabus = (props) => {
  const { id } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const [newEpisodeTitle, setNewEpisodeTitle] = useState("");
  const [newEpisodeVideo, setNewEpisodeVideo] = useState(null);
  const [newEpisodeFile, setNewEpisodeFile] = useState(null);
  const [targetSectionIndex, setTargetSectionIndex] = useState(null);
  const [addingNewSection, setAddingNewSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const [confirmDeleteSectionIndex, setConfirmDeleteSectionIndex] = useState(null);
  const [confirmDeleteEpisode, setConfirmDeleteEpisode] = useState({ sectionIndex: null, episodeIndex: null });

  // State to control fade-out animation on delete (for section and episode)
  const [fadeDeleteSectionIndex, setFadeDeleteSectionIndex] = useState(null);
  const [fadeDeleteEpisode, setFadeDeleteEpisode] = useState({ sectionIndex: null, episodeIndex: null });

  const [editSectionIndex, setEditSectionIndex] = useState(null);
  const [editSectionTitle, setEditSectionTitle] = useState("");

  const [editingEpisode, setEditingEpisode] = useState({ sectionIndex: null, episodeIndex: null });
  const [editEpisodeTitle, setEditEpisodeTitle] = useState("");
  const [editEpisodeVideo, setEditEpisodeVideo] = useState(null);
  const [editEpisodeFile, setEditEpisodeFile] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoInputRef = React.useRef(null);
  const pdfInputRef = React.useRef(null);



  const {
    syllabus = [],
    course,
    onPlayVideo,
    isTeacherOwner,
    isAdmin,
    onAddEpisode,
    onAddSection,
    onDeleteSection,
    onDeleteEpisode,
  } = props;

  

  const toggleIndex = (index , id) => {
    setOpenIndex(openIndex === index ? null : index);
    setTargetSectionIndex(index);
    setNewEpisodeTitle("");
      setNewEpisodeVideo(null);
      setNewEpisodeFile(null);
      setProgress(0);
      
      if (videoInputRef.current) videoInputRef.current.value = "";
      if (pdfInputRef.current) pdfInputRef.current.value = "";
  };
  


  
  const handleAddEpisode = async (seasonId) => {
    if (!newEpisodeTitle || !newEpisodeVideo || targetSectionIndex === null) {
      return alert("عنوان و ویدیو الزامی است");
    }
  
    try {
      setUploading(true);
      setProgress(0);
  
      const formData = new FormData();
      formData.append("title", newEpisodeTitle);
  
      if (newEpisodeVideo instanceof File) {
        formData.append("video", newEpisodeVideo);
      }
  
      if (newEpisodeFile instanceof File) {
        formData.append("pdf", newEpisodeFile);
      }
  
      // ارسال مستقیم فرم‌دیتا به سرور
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/video/upload/${seasonId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total))
        }
      );
  
      const newEpisode = response.data.newVideo;

      console.log(response.data)
  
      // اضافه کردن مستقیم اپیزود به UI
      onAddEpisode(targetSectionIndex, newEpisode);
  
      // ریست کردن state ها و inputها
      setNewEpisodeTitle("");
      setNewEpisodeVideo(null);
      setNewEpisodeFile(null);
      setProgress(0);
  
      if (videoInputRef.current) videoInputRef.current.value = "";
      if (pdfInputRef.current) pdfInputRef.current.value = "";
  
      alert("اپیزود با موفقیت اضافه شد!");
    } catch (err) {
      console.error("خطا در آپلود اپیزود:", err.response?.data || err);
      alert("آپلود موفقیت‌آمیز نبود");
    } finally {
      setUploading(false);
    }
  };
  
  
  
  
  
  

  const handleAddSection = async () => {

    if (!newSectionTitle.trim()) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/season/create/${id}`,
        {
          title:newSectionTitle,
        },
        { withCredentials: true }
      );
      if(response.status==200 || response.status==201){
        onAddSection(newSectionTitle.trim());
        setNewSectionTitle("");
        setAddingNewSection(false);
      }
    }catch(err){
      console.log(err.response)
    }
  };

  // New helper functions for smooth delete animations
  const handleConfirmDeleteSection = async (index) => {
    setFadeDeleteSectionIndex(index);
    setTimeout(() => {
      onDeleteSection(index);
      setConfirmDeleteSectionIndex(null);
      setFadeDeleteSectionIndex(null);
    }, 300); // duration of fade out
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/season/delete/${index}`,
        { withCredentials: true }
        );
      if(response.status===200 || response.status===201){
        alert("removed")
        
      }
    }catch(err){
      console.log(err.response)
    }
  };

  const handleConfirmDeleteEpisode = async (sectionIndex, episodeIndex, id) => {
    setFadeDeleteEpisode({ sectionIndex, episodeIndex });
  
    setTimeout(() => {
      setConfirmDeleteEpisode({ sectionIndex: null, episodeIndex: null });
      setFadeDeleteEpisode({ sectionIndex: null, episodeIndex: null });
    }, 300);
    
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/video/${id}`,
        { withCredentials: true }
        );
        if (response.status === 200 || response.status === 201) {
          alert("اپیزود حذف شد");
          onDeleteEpisode(sectionIndex, episodeIndex);
      }
    } catch (err) {
      console.error("خطا در حذف اپیزود:", err.response?.data || err);
    }
  };
  


  const startEditEpisode = (sectionIndex, episodeIndex, episode) => {
    setEditingEpisode({ sectionIndex, episodeIndex });
    setEditEpisodeTitle(episode.subTitle);
    setEditEpisodeVideo(null); // فقط در صورت انتخاب جدید تغییر می‌کنیم
    setEditEpisodeFile(null);
  };
  
  const handleUpdateSectionTitle = async (id) => {
    if (!editSectionTitle.trim()) return;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/season/edit/${id}`,
        {
          title:editSectionTitle,
        },
        { withCredentials: true }
      );
      if(response.status==200 || response.status==201){
        setEditSectionIndex(null);
        setEditSectionTitle("");
        const updated = [...syllabus];
        updated[editSectionIndex].title = editSectionTitle;
        props.onUpdateSyllabus(updated);
      }
    }catch(err){
      console.log(err.response)
    }
  };
  
  const handleEditEpisode = async (id) => {
    console.log(id)
    const { sectionIndex, episodeIndex } = editingEpisode;
  
    try {
      setUploading(true);
      setProgress(0);
      const formData = new FormData();
      formData.append("title", editEpisodeTitle.trim());
  
      if (editEpisodeVideo instanceof File) {
        formData.append("video", editEpisodeVideo);
      }
  
      if (editEpisodeFile instanceof File) {
        formData.append("pdf", editEpisodeFile);
      }
  
      // بررسی اینکه حداقل یکی از فیلدها پر باشد
      if (
        !editEpisodeTitle.trim() &&
        !(editEpisodeVideo instanceof File) &&
        !(editEpisodeFile instanceof File)
      ) {
        alert("حداقل یکی از فیلدها باید پر باشد");
        return;
      }
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/video/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total))
        }
      );
        console.log(response.status)
        console.log(response.data.video)
      if (response.status === 200 || response.status === 201) {
        const updatedEpisode=response.data.video
          
        props.onEditEpisode(sectionIndex, episodeIndex, updatedEpisode);
          
          // reset states
        alert("ویرایش انجام شد");
        setEditingEpisode({ sectionIndex: null, episodeIndex: null });
        setEditEpisodeTitle("");
        setEditEpisodeVideo(null);
        setEditEpisodeFile(null);
        setProgress(0)

        if (videoInputRef.current) videoInputRef.current.value = "";
        if (pdfInputRef.current) pdfInputRef.current.value = "";
      }
    } catch (err) {
      console.log(err.response || err);
    } finally {
      setUploading(false);
    }
  };
  
  
  

 // تابع برای پخش ویدیو
 const onPlayVideoById = async (videoId) => {
  if (!videoId) {
    console.error("videoId is undefined");
    return;
  }
  console.log("Video ID:", videoId);

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/video/${videoId}`,
      { withCredentials: true }
    );

    if (response.status === 200 || response.status === 201) {
      // const videoData = response.data.url;
      const videoUrl = response.data.url;
      console.log("Video URL:", videoUrl);

      if (!videoUrl) {
        console.error("ویدیو یافت نشد یا URL معتبر نیست");
        return;
      }
      onPlayVideo(videoUrl);


    } else {
      console.error("پاسخ سرور ناموفق است:", response.status);
    }
  } catch (error) {
    console.error("خطا در دریافت URL ویدیو:", error.response?.data || error.message || error);
  }
};



  

  return (
    <div className="min-h-screen overflow-hidden p-10 flex flex-col justify-start items-end text-right gap-[20px]">
      <h2 className="hidden sm:block text-[22px] text-[snow] font-bold mb-4 p-2 border-b border-[#eef3f9]">{course.title}</h2>

      {isTeacherOwner && (
        <div className="mb-4 w-full sm:w-[95%] flex justify-end items-center flex-col gap-2">
          <div className="w-full sm:pr-6 flex flex-col justify-center items-end">
            <div
              className={`${addingNewSection ? "rounded-b-[0px]" : "rounded-b-[5px]"} px-[10px] flex justify-between flex-row-reverse items-center w-full text-[#3073c1] bg-[snow] rounded-t-[5px] cursor-pointer transition-all duration-300`}
              onClick={() => setAddingNewSection(!addingNewSection)}
            >
              <p className="text-[18px]">افزودن فصل جدید</p>
              <p className="text-[28px]">{addingNewSection ? '−' : '+'}</p>
            </div>

            <div
              style={{
                maxHeight: addingNewSection ? '300px' : '0px',
              }}
              dir="rtl"
              className="bg-[snow] px-4 rounded-b-[5px] overflow-hidden transition-[max-height] duration-500 ease-in-out w-full"
            >
              <div className="flex flex-col justify-end w-full max-w-md gap-2 py-2">
                <input
                  type="text"
                  placeholder="عنوان فصل جدید"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  className="flex-grow px-3 py-2 border border-[#3073c1] bg-[snow] outline-none rounded-md"
                />
                <button
                  onClick={() => {
                    handleAddSection();
                  }}                
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                >
                  ثبت فصل
                </button>
                <button
                  onClick={() => {
                    setAddingNewSection(false);
                    setNewSectionTitle("");
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ul className="w-full sm:w-[95%] sm:pr-6 space-y-2 flex flex-col justify-center items-center sm:items-end gap-[15px]">
        {syllabus.map((item, index) => (
          <li
            key={item.id}
            className={`p-[5px] flex flex-col justify-center items-end border border-[#3073c1] sm:border-none w-full bg-[snow] rounded-[5px]
              transition-opacity duration-300 ease-in-out
              ${fadeDeleteSectionIndex === index ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'}
            `}
          >
            <div className="w-full flex justify-between flex-row-reverse">
              <p className="text-[18px] text-[#3073c1] mr-[5px]">{item.title}</p>
              <div className="w-[15%] flex justify-between gap-5 items-center">
                <button onClick={() => toggleIndex(index , item.id)} className="font-[thin]">
                  <span className="text-18px sm:text-[20px] text-[#111] text-[#3073c1] sm:text-[#111] cursor-pointer">{openIndex === index ? '▲' : '▼'}</span>
                </button>

                {isTeacherOwner&&(
                      <>
                        <i
                          title="ویرایش فصل"
                          className="fas fa-pencil text-[orange] cursor-pointer transition-all duration-300 hover:scale-115 hover:shadow-md"
                          onClick={() => {
                            setEditSectionIndex(index);
                            setEditSectionTitle(item.title);
                          }}
                        ></i>

                        {editSectionIndex === index && (
                          <div dir='rtl' className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                            <div className="bg-white text-gray-800 rounded-xl shadow-xl px-6 py-5 w-[90%] max-w-md flex flex-col items-center gap-4 text-center">
                              <p className="text-xl font-semibold">ویرایش عنوان فصل</p>
                              <input
                                type="text"
                                value={editSectionTitle}
                                onChange={(e) => setEditSectionTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-[#3073c1] rounded-md outline-none"
                              />
                              <div className="flex gap-4 mt-2">
                                <button
                                  onClick={()=>handleUpdateSectionTitle(item._id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded cursor-pointer"
                                >
                                  ذخیره
                                </button>
                                <button
                                  onClick={() => {
                                    setEditSectionIndex(null);
                                    setEditSectionTitle("");
                                  }}
                                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded cursor-pointer"
                                >
                                  انصراف
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                      </>
                  
                    )
                }

                {(isTeacherOwner || isAdmin) && (
                  <>
                    {/* آیکون حذف */}
                    <i
                      title="حذف فصل"
                      className="fas fa-trash text-red-600 cursor-pointer transition-all duration-300 hover:scale-115 hover:shadow-md"
                      onClick={() => setConfirmDeleteSectionIndex(index)}
                    ></i>

                    {/* MODAL حذف فصل */}
                    {confirmDeleteSectionIndex === index && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ease-in-out">
                        <div
                          className="bg-white text-red-400 border border-[#3073c1] rounded-xl shadow-xl px-6 py-5 w-[90%] max-w-md
                          flex flex-col items-center gap-4 text-center animate-fade-in-down transition-all duration-300 "
                        >
                          <p className="text-xl font-bold">آیا مطمئن هستید که می‌خواهید فصل <span className='text-[#3073c1]'>{item.title}</span> را حذف کنید؟</p>
                          <div className="flex gap-4 mt-2">
                            <button
                              onClick={() => {
                                handleConfirmDeleteSection(item._id);
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-lg cursor-pointer"
                            >
                              بله
                            </button>
                            <button
                              onClick={() => setConfirmDeleteSectionIndex(null)}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded text-lg cursor-pointer"
                            >
                              خیر
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>

            <ul className={`w-[95%] text-sm pr-5 ${openIndex === index ? 'max-h-[1000px] py-2' : 'max-h-0 overflow-hidden'} transition-all duration-300`}>
              {item.videos?.map((sub, subIndex) => (
                <li
                  key={subIndex}
                  className={`w-full py-1 pr-2 border-r-2 border-[#3073c1]
                    transition-opacity duration-300 ease-in-out
                    ${fadeDeleteEpisode.sectionIndex === index && fadeDeleteEpisode.episodeIndex === subIndex ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'}
                  `}
                >
                  <div className="flex flex-row-reverse justify-between items-center border border-[#3073c1] px-[8px] py-[8px] rounded-[5px]">
                    <p className="text-[16px] text-[#3073c1]">{sub.title}</p>
                    <div className="w-[15%] text-[16px] flex gap-[16px] items-center ml-[5px] text-[#3073c1]">
                      <i
                        className="fas fa-play cursor-pointer transition-all duration-300 hover:scale-115 hover:shadow-md"
                        title='اجرا'
                        onClick={() => onPlayVideoById(sub._id)}
                      ></i>

                      {sub.PDFUrl && (
                        <a
                          href={sub.PDFUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          title="دانلود جزوه"
                        >
                          <i className="fas fa-paperclip cursor-pointer transition-all duration-300 hover:scale-115 hover:shadow-md"></i>
                        </a>
                      )}

                    {isTeacherOwner&&(
                      <>
                        <i
                          title="ویرایش"
                          className="fas fa-pencil text-[orange] cursor-pointer transition-all duration-300 hover:scale-115 hover:shadow-md"
                          onClick={() => startEditEpisode(index, subIndex, sub)}
                        ></i>


                      {editingEpisode.sectionIndex === index && editingEpisode.episodeIndex === subIndex && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ease-in-out">
                          <div dir='rtl'
                            className="bg-white text-[#3073c1] border border-[#3073c1] rounded-xl shadow-xl px-6 py-5 w-[90%] max-w-md
                            flex flex-col items-start gap-4 text-center animate-fade-in-down transition-all duration-300 "
                          >
                            <label className="text-[17px] text-gray-700">عنوان قسمت</label>
                            <input
                              type="text"
                              placeholder="عنوان جدید"
                              value={editEpisodeTitle}
                              onChange={(e) => setEditEpisodeTitle(e.target.value)}
                              className="w-full px-3 py-2 border rounded-md border-[#3073c1] outline-none"
                            />
                            <label className="text-[17px] text-gray-700">فایل ویدیویی جدید (در صورت نیاز)</label>
                            <input
                              type="file"
                              ref={videoInputRef}
                              accept="video/*"
                              onChange={(e) => setEditEpisodeVideo(e.target.files[0])}
                              className="w-full px-3 py-2 border rounded-md border-[#3073c1]"
                            />
                            <label className="text-[17px] text-gray-700">جزوه جدید (در صورت نیاز)</label>
                            <input
                              type="file"
                              ref={pdfInputRef}
                              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar"
                              onChange={(e) => setEditEpisodeFile(e.target.files[0])}
                              className="w-full px-3 py-2 border rounded-md border-[#3073c1]"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={()=>handleEditEpisode(sub._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                              >
                                ذخیره تغییرات
                              </button>
                              <button
                                onClick={() => setEditingEpisode({ sectionIndex: null, episodeIndex: null })}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
                              >
                                انصراف
                              </button>
                            </div>
                              {uploading && <div>Progress: {progress}%</div>}

                          </div>
                        </div>
                      )}



                      </>
                      )
                    }

                    {(isTeacherOwner || isAdmin) && (
                      <div dir="rtl" className="relative flex gap-5">
                        {/* دکمه حذف */}
                        {!(confirmDeleteEpisode.sectionIndex === index && confirmDeleteEpisode.episodeIndex === subIndex) && (
                          <i
                            title="حذف قسمت"
                            className="fas fa-trash text-red-600 cursor-pointer transition-all duration-300 hover:scale-115 hover:shadow-md"
                            onClick={() => setConfirmDeleteEpisode({ sectionIndex: index, episodeIndex: subIndex })}
                          ></i>
                        )}

                        {/* مودال تایید حذف */}
                        {confirmDeleteEpisode.sectionIndex === index && confirmDeleteEpisode.episodeIndex === subIndex && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity/40 backdrop-blur-sm transition-all duration-300 ease-in-out">
                            <div
                              className="bg-white text-red-400 border border-[#3073c1] rounded-xl shadow-xl px-6 py-5 w-[90%] max-w-md
                              flex flex-col items-center gap-4 text-center animate-fade-in-down transition-opacity duration-300 ease-in-out"
                            >
                              <p className="text-xl font-semibold">
                                آیا مطمئن هستید که می‌خواهید قسمت <span className="text-[#3073c1]">{sub.subTitle}</span> را حذف کنید؟
                              </p>
                              <div className="flex flex-row-reverse gap-5">
                                <button
                                  onClick={() => handleConfirmDeleteEpisode(index, subIndex, sub._id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-lg cursor-pointer transition-colors duration-300"
                                >
                                  بله
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteEpisode({ sectionIndex: null, episodeIndex: null })}
                                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded text-lg cursor-pointer transition-colors duration-300"
                                >
                                  خیر
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    </div>
                  </div>
                </li>
              ))}

              {isTeacherOwner ? (<div className="border-b-2 border-[#3073c1] w-full mt-5"></div>) : (<div className="border-b-0 w-full mt-5"></div>)}

              {isTeacherOwner && openIndex === index && (
                <li dir="rtl" className="mt-4 w-full">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="عنوان قسمت جدید"
                      value={newEpisodeTitle}
                      onChange={(e) => setNewEpisodeTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md outline-none border-[#3073c1] bg-[snow]"
                    />

                    <label className="text-[15px]">فایل ویدیویی را آپلود کنید</label>
                    <input
                      type="file"
                      accept="video/*"
                      ref={videoInputRef}
                      onChange={(e) => setNewEpisodeVideo(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-md border-[#3073c1] cursor-pointer"
                    />

                    <label className="text-[15px]">فایل جزوه این قسمت را آپلود کنید (اختیاری)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar"
                      ref={pdfInputRef}
                      onChange={(e) => setNewEpisodeFile(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-md border-[#3073c1] cursor-pointer"
                    />

                    <button
                      onClick={()=>handleAddEpisode(syllabus[openIndex]._id)}
                      disabled={uploading}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                    >
                      {uploading ? `Uploading... ${progress}%` : "افزودن اپیزود"}
                    </button>
                    {uploading && <div>Progress: {progress}%</div>}

                  </div>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Syllabus;

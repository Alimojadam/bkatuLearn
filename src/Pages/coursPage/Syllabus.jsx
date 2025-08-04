import React, { useState } from 'react';

const Syllabus = (props) => {
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


  const {
    syllabus = [],
    course,
    onPlayVideo,
    isTeacherOwner,
    onAddEpisode,
    onAddSection,
    onDeleteSection,
    onDeleteEpisode,
  } = props;

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setTargetSectionIndex(index);
  };

  const handleAddEpisode = () => {
    if (!newEpisodeTitle || !newEpisodeVideo || targetSectionIndex === null) return;

    const newEpisode = {
      subTitle: newEpisodeTitle,
      video: newEpisodeVideo,
      file: newEpisodeFile,
    };

    onAddEpisode(targetSectionIndex, newEpisode);
    setNewEpisodeTitle("");
    setNewEpisodeVideo(null);
    setNewEpisodeFile(null);
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    onAddSection(newSectionTitle.trim());
    setNewSectionTitle("");
    setAddingNewSection(false);
  };

  // New helper functions for smooth delete animations
  const handleConfirmDeleteSection = (index) => {
    setFadeDeleteSectionIndex(index);
    setTimeout(() => {
      onDeleteSection(index);
      setConfirmDeleteSectionIndex(null);
      setFadeDeleteSectionIndex(null);
    }, 300); // duration of fade out
  };

  const handleConfirmDeleteEpisode = (sectionIndex, episodeIndex) => {
    setFadeDeleteEpisode({ sectionIndex, episodeIndex });
    setTimeout(() => {
      onDeleteEpisode(sectionIndex, episodeIndex);
      setConfirmDeleteEpisode({ sectionIndex: null, episodeIndex: null });
      setFadeDeleteEpisode({ sectionIndex: null, episodeIndex: null });
    }, 300);
  };


  const startEditEpisode = (sectionIndex, episodeIndex, episode) => {
    setEditingEpisode({ sectionIndex, episodeIndex });
    setEditEpisodeTitle(episode.subTitle);
    setEditEpisodeVideo(null); // فقط در صورت انتخاب جدید تغییر می‌کنیم
    setEditEpisodeFile(null);
  };
  
  const handleUpdateSectionTitle = () => {
    if (!editSectionTitle.trim()) return;
    const updated = [...syllabus];
    updated[editSectionIndex].title = editSectionTitle;
    props.onUpdateSyllabus(updated);
    setEditSectionIndex(null);
    setEditSectionTitle("");
  };
  
  const handleEditEpisode = () => {
    const { sectionIndex, episodeIndex } = editingEpisode;
  
    const updatedEpisode = {
      subTitle: editEpisodeTitle,
      video: editEpisodeVideo || syllabus[sectionIndex].subtopics[episodeIndex].video,
      file: editEpisodeFile || syllabus[sectionIndex].subtopics[episodeIndex].file,
    };
  
    props.onEditEpisode(sectionIndex, episodeIndex, updatedEpisode);
  
    setEditingEpisode({ sectionIndex: null, episodeIndex: null });
    setEditEpisodeTitle("");
    setEditEpisodeVideo(null);
    setEditEpisodeFile(null);
  };
  
  

  return (
    <div className="p-10 flex flex-col justify-center items-end text-right gap-[20px]">
      <h2 className="text-[22px] text-[snow] font-bold mb-4 p-2 border-b border-[#eef3f9]">{course.title}</h2>

      {isTeacherOwner && (
        <div className="mb-4 w-[95%] flex justify-end items-center flex-col gap-2">
          <div className="w-full pr-6 flex flex-col justify-center items-end">
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
                  onClick={handleAddSection}
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

      <ul className="w-[95%] pr-6 space-y-2 flex flex-col justify-center items-end gap-[15px]">
        {syllabus.map((item, index) => (
          <li
            key={index}
            className={`p-[5px] flex flex-col justify-center items-end w-full bg-[snow] rounded-[5px]
              transition-opacity duration-300 ease-in-out
              ${fadeDeleteSectionIndex === index ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'}
            `}
          >
            <div className="w-full flex justify-between flex-row-reverse">
              <p className="text-[18px] text-[#3073c1] mr-[5px]">{item.title}</p>
              <div className="w-[15%] flex justify-between gap-5 items-center">
                <button onClick={() => toggleIndex(index)} className="font-[thin]">
                  <span className="text-[20px] text-[#111] cursor-pointer">{openIndex === index ? '▲' : '▼'}</span>
                </button>

                {isTeacherOwner&&(
                      <>
                        <i
                          title="ویرایش فصل"
                          className="fas fa-pencil text-[orange] cursor-pointer"
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
                                  onClick={handleUpdateSectionTitle}
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

                {isTeacherOwner && (
                  <>
                    {/* آیکون حذف */}
                    <i
                      title="حذف فصل"
                      className="fas fa-trash text-red-600 cursor-pointer"
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
                                handleConfirmDeleteSection(index);
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
              {item.subtopics?.map((sub, subIndex) => (
                <li
                  key={subIndex}
                  className={`w-full py-1 pr-2 border-r-2 border-[#3073c1]
                    transition-opacity duration-300 ease-in-out
                    ${fadeDeleteEpisode.sectionIndex === index && fadeDeleteEpisode.episodeIndex === subIndex ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'}
                  `}
                >
                  <div className="flex flex-row-reverse justify-between items-center border border-[#3073c1] px-[8px] py-[8px] rounded-[5px]">
                    <p className="text-[16px] text-[#3073c1]">{sub.subTitle}</p>
                    <div className="w-[15%] text-[16px] flex gap-[16px] items-center ml-[5px] text-[#3073c1]">
                      <i
                        className="fas fa-play cursor-pointer"
                        title='اجرا'
                        onClick={() => {
                          if (!sub.video) return;
                          const videoUrl =
                            sub.video instanceof File ? URL.createObjectURL(sub.video) : sub.video;
                          onPlayVideo(videoUrl);
                        }}
                      ></i>

                      {sub.file && (
                        <a
                          href={sub.file instanceof File ? URL.createObjectURL(sub.file) : sub.file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          title="دانلود جزوه"
                        >
                          <i className="fas fa-paperclip cursor-pointer"></i>
                        </a>
                      )}

                    {isTeacherOwner&&(
                      <>
                        <i
                          title="ویرایش"
                          className="fas fa-pencil text-[orange] cursor-pointer"
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
                              accept="video/*"
                              onChange={(e) => setEditEpisodeVideo(e.target.files[0])}
                              className="w-full px-3 py-2 border rounded-md border-[#3073c1]"
                            />
                            <label className="text-[17px] text-gray-700">جزوه جدید (در صورت نیاز)</label>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar"
                              onChange={(e) => setEditEpisodeFile(e.target.files[0])}
                              className="w-full px-3 py-2 border rounded-md border-[#3073c1]"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={handleEditEpisode}
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

                          </div>
                        </div>
                      )}



                      </>
                      )
                    }

                    {isTeacherOwner && (
                      <div dir="rtl" className="relative flex gap-5">
                        {/* دکمه حذف */}
                        {!(confirmDeleteEpisode.sectionIndex === index && confirmDeleteEpisode.episodeIndex === subIndex) && (
                          <i
                            title="حذف قسمت"
                            className="fas fa-trash text-red-600 cursor-pointer"
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
                                  onClick={() => handleConfirmDeleteEpisode(index, subIndex)}
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
                      onChange={(e) => setNewEpisodeVideo(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-md border-[#3073c1] cursor-pointer"
                    />
                    <label className="text-[15px]">فایل جزوه این قسمت را آپلود کنید (اختیاری)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar"
                      onChange={(e) => setNewEpisodeFile(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-md border-[#3073c1] cursor-pointer"
                    />
                    <button
                      onClick={handleAddEpisode}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                    >
                      افزودن قسمت
                    </button>
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

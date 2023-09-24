import { useEffect, useState, useRef } from "react";
import axios from "axios";
import log from "../../helpers/logging";
import { userState } from "../../GlobalState";
import { useReactiveVar } from "@apollo/client";
import blankProfileImg from '../../assets/home/blank-profile.png';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

//before submit - checks if user has reached the photos limit
//after submit:
//1.updates current profile Img if new one is changed
//2. send new photo to cloudinary
//3. if #2 successfull, send new photo to backend
//4. if #3 successfull, set as current profile image

// make buttons to set profile Img
// 


const UploadProfileImg = ({ profileImg, setProfileImg, currentProfileImg }) => {
  const user = useReactiveVar(userState);

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState(profileImg);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  const editModalRef = useRef(null);


  const updateProfilePic = (profileImg) => {
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/teamForward/${user._id}/gallery/update/${profileImg._id}`)
      .then((res) => {
        userState(res.data);
      })
      .catch((err) => {
        log(err);
      });
  };

  const handleDeleteImage = (e, photo) => {
    e.stopPropagation();
    if(photo.cloudinaryImgUrl === profileImg){
      setPreviewSource(blankProfileImg);
      setProfileImg(blankProfileImg);
    }
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/teamForward/${user._id}/gallery/delete/${photo._id}`,)
      .then((res) => {
        userState(res.data);
      }
      )
      .catch((err) => {
        log(err);
      }
      );
  }

  const uploadImage = (profileImg) => {
    axios
      .patch(`${process.env.REACT_APP_BE_URL}/teamForward/${user._id}/gallery/upload`, { file: profileImg })
      .then((res) => {
        userState(res.data);
      })
      .catch((err) => {
        log(err);
      });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //converts img to string
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setProfileImg(reader.result); // set base64 url to state
      uploadImage(reader.result);
      if (!previewSource) return;
      // uploadImage(previewSource);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);

    // if (file) {
    // }
    // else {
    //   setPreviewSource(currentProfileImg);
    //   setFileInputState("");
    // }
  };


  const showModal = () => {
    editModalRef.current.showModal();
  };

  const closeModal = () => {
    editModalRef.current.close();
  };

  const handleModalClick = (e) => {
    const dialogDimensions = editModalRef.current.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      editModalRef.current.close()
    }
  };

  const handleChangeProfileImg = (photo) => {
    setPreviewSource(photo.cloudinaryImgUrl);
    setProfileImg(photo.cloudinaryImgUrl);
    updateProfilePic(photo);
  };

  const handleImageHover = (photo) => {
    setHoveredPhoto(photo);
  };

  


  return (
    <form className="flex flex-col items-center mt-8 mb-10">
      <div className="relative h-36">
        <div className="shrink-0">
          {previewSource ? previewSource !== currentProfileImg ?
            <img src={profileImg} alt="chosen" className="object-cover w-32 h-32 rounded-full" /> :
            <img src={currentProfileImg} alt="current photo" className="object-cover w-32 h-32 rounded-full" /> :
            <img
              className="object-cover w-32 h-32 rounded-full"
              src={blankProfileImg}
              alt="empty profile photo"
            />
          }

        </div>

        <div className="group absolute bottom-0 left-1/2 transform select-none -translate-x-1/2 rounded-lg cursor-pointer">
          {/* <input
            id="fileInput"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="absolute opacity-0 w-full h-full rounded-lg"
            max="5MB"
          /> */}

          <div formMethod="dialog" className="bg-green-900 flex space-x-1 justify-center 
          items-end text-white px-2.5 py-1 rounded-lg border-0 font-semibold group-hover:bg-green-700"
            onClick={showModal}>
            <CameraAltOutlinedIcon className="text-sm" />
            <div className="text-base">Edit</div>
          </div>
        </div>

      </div>

      <dialog ref={editModalRef} className="" onClick={handleModalClick}>
        <div className="flex flex-col items-center p-4">
          <div className="font-bold text-xl mb-4">Edit Photos</div>

          <div className="grid grid-flow-col grid-cols-[repeat(auto-fit,minmax(1rem,1fr))] gap-3 mb-2">
            {user.photos?.map((photo) => {
              return (
                <div className={`relative h-14 w-14 ${photo.cloudinaryImgUrl === profileImg ? 'outline outline-cyan-500' : ''}`}
                  key={photo._id}
                  onMouseEnter={() => handleImageHover(photo)}
                  onMouseLeave={() => handleImageHover(null)}
                  onClick={()=>handleChangeProfileImg(photo)}>
                  <img src={photo.cloudinaryImgUrl} className="object-cover" />
                  {hoveredPhoto === photo && (
                    <div className="text-xs absolute -top-2 -right-2" onClick={(e)=>handleDeleteImage(e, photo)}>
                      <CancelIcon />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <img src={profileImg ? profileImg : blankProfileImg} alt="chosen" className="object-cover h-64 w-64" />

          <div
            className="relative select-none cursor-pointer mt-4 bg-green-900 text-white flex items-center border 
            border-slate-900 uppercase hover:text-white hover:bg-green-700 focus:outline-none font-medium 
            rounded-lg text-base px-6 py-2 text-center"
          >
            <div className="text-base">Upload</div>
            <input
              id="fileInput"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="absolute inset-0 opacity-0 w-full h-full rounded-lg"
              max="5MB"
            />
          </div>

          {/* <button formmethod="dialog" onClick={closeModal}>Close</button> */}
        </div>
      </dialog>
      {/* <label className="block">
        <span className="sr-only">Choose File</span>
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
          file:text-sm file:font-semibold file:bg-green-900 file:text-white hover:file:bg-green-700"
        />
      </label> */}
    </form>


  );
};

export default UploadProfileImg;

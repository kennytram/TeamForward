import { useReactiveVar } from "@apollo/client";
import { useState, useEffect } from "react";
import { userState } from "../../GlobalState";
import {
  Carousel,
  initTE,
} from "tw-elements";
const ProfileImg = ({ profileData, setProfileData }) => {

  useEffect(() => {
    initTE({ Carousel });
  }, []);


  return (
    profileData?.photos.length ? (
      <div
        id="carouselExampleCaptions"
        className="relative w-96 max-w-96 h-96 max-h-96"
        data-te-carousel-init
        data-te-carousel-slide>
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators>
          {profileData.photos.map((photo, index) => (
            <button
              type="button"
              data-te-target="#carouselExampleCaptions"
              data-te-slide-to={index}
              data-te-carousel-active
              className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
              aria-current="true"
              aria-label={`Slide ${index + 1}`}></button>
          ))}
        </div>
        <div
          className="relative w-96 max-w-96 h-96 max-h-96 overflow-hidden after:clear-both after:block after:content-['']">
          {profileData.photos.map((photo, index) => {
            if (index === 0) {
              return (
                <div
                  className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                  data-te-carousel-active
                  data-te-carousel-item
                  style={{ backfaceVisibility: 'hidden' }}>
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    style={{ backgroundPosition: '50%' }}>
                    <img
                      src={photo.cloudinaryImgUrl}
                      className="block w-full" />
                  </div>
                </div>
              )
            } 
            else {
              return (
                <div
                  className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                  data-te-carousel-item
                  style={{ backfaceVisibility: 'hidden' }}>
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    style={{ backgroundPosition: '50%' }}>
                    <img
                      src={photo.cloudinaryImgUrl}
                      className="block w-full" />
                  </div>
                </div>
              )
            }
          }
          )}
        </div>
        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev">
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </span>
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Previous</span
          >
        </button>
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next">
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Next</span
          >
        </button>
      </div>
    ) : (
      <div className="w-48 h-48 overflow-hidden bg-indigo-100 mx-auto shadow-2xl inset-x-0 top-0 flex items-center justify-center  text-indigo-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )
  );
};

export default ProfileImg;

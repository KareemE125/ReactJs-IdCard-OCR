import { ChangeEvent, useState } from "react";

import { useIdDataContext } from "../context/IdData";
import IdImagePreview from "./IdImagePreview";
import parsedIdData from "../utils/ocr";
import Lottie from "lottie-react";
import animation2 from "../assets/Animation - 1706312671890.json";

export default function UploadID() {

  const { idData, updateIdData } = useIdDataContext();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;

    if (images && images.length > 0) {
      const image = images[0];
      setSelectedImage(image);
      
      setIsLoading(true)
      
      const newIdData = await parsedIdData(image)
      updateIdData({...newIdData, imageUrl: URL.createObjectURL(image), imageName: image.name});
      
      setIsLoading(false)

      // Scroll to bottom
      document.documentElement.scrollTop = document.documentElement.scrollHeight*2;

    }
    
  };
  

  return (
    <section className="relative m-auto py-8 flex flex-col justify-center items-center gap-4 w-full border-2 rounded-lg border-teal-500 bg-black bg-opacity-50">
      <h2 className='text-2xl mb-4 rounded-lg bg-teal-600 w-fit px-8 py-2 font-semibold absolute -top-6 left-5'>ID Image</h2>
      
      {/* Selected Image Preview */}
      {
        isLoading 
        ? <div className="w-52">              
            <Lottie animationData={animation2} />
          </div>
        :<IdImagePreview />
      }

      {/* Select Image Button */}
      <div className="-mt-3">
        <label 
          className={`${isLoading? "opacity-50":" hover:bg-teal-500 font-bold cursor-pointer"} bg-teal-600 text-white py-2 px-8 rounded-lg`}
          htmlFor="fileInput"
        >
          { isLoading? "Loading..." : (selectedImage || idData.imageUrl) ? "Change ID Image" : "Select ID Image" }
        </label>
        <input 
          className="hidden"
          disabled={isLoading}
          id="fileInput" type="file" accept="image/*" onChange={handleImageSelection}
        />
      </div>
      
    </section>
  );

}

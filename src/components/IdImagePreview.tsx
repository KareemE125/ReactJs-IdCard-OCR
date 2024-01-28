import Lottie from "lottie-react"
import animationData3 from "../assets/Animation - 1706320021945.json"
import { useIdDataContext } from "../context/IdData";

export default function IdPreview() {

  const { idData } = useIdDataContext();

  return (
    <section className="pb-8 px-8">   
      {
        idData.imageUrl 
        ? <div className="pt-3 flex flex-col justify-center items-center gap-4">
            <p>Current Image: <span className="font-bold">{idData.imageName}</span></p>
            <img
              src={idData.imageUrl}
              alt="Selected Preview"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        : <div className="pt-4 flex flex-col justify-center items-center">
            <h3 className="uppercase text-xl font-semibold text-red-500">No selected ID Image !</h3>
            <div className="w-40">
              <Lottie animationData={animationData3} />
            </div>
          </div>
      }
    </section>
  );

}

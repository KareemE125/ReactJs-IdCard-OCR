import Lottie from "lottie-react";
import IdDataPreview from "../components/IdDataPreview";
import UploadID from "../components/UploadIDButton";
import aimation from "../assets/Animation - 1706312547196.json";

export default function Home() {


  return (
    <main className="flex flex-col items-stretch gap-12 pb-12">
        <section>
          <UploadID />
        </section>

        <section>
          <IdDataPreview />
        </section>
    </main>
  )
}

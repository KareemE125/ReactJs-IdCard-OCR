import IdDataPreview from "../components/IdDataPreview";
import UploadID from "../components/UploadIDButton";

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

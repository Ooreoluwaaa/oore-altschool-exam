import NotFoundImg from "@/assets/images/404-image.png";
import GoBackButton from "@/components/common/go-back";

export default function ErrorPage() {
  return (
    <div className="w-full max-w-[554px] h-[100vh] mx-auto flex flex-col items-center justify-center gap-5">
      <img
        src={NotFoundImg}
        alt="not found"
        width={205}
        height={212}
        className="object-cover"
      />
      <p className="max-w-[480px] text-3xl leading-8 text-center">
        Page Not Found!
      </p>

      <GoBackButton />
    </div>
  );
}

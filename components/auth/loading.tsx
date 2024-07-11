import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
      <Image
        src="/placeholder-logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
        priority
      />
    </div>
  );
};

export default Loading;

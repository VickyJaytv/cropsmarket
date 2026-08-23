import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] p-4 text-center">
      {/* 404 Container */}
      <div className="relative flex items-center justify-center gap-2 font-black tracking-tighter select-none md:gap-4">
        <h1
          className="text-[10rem] md:text-[18rem] leading-none bg-cover bg-center bg-clip-text text-transparent relative z-10 animate-in zoom-in-50 duration-700"
          style={{
            backgroundImage: "url('/hero.png')",
            backgroundPosition: "center center",
            fontFamily: "Inter, sans-serif",
            backgroundSize: "120%",
          }}
        >
          404
        </h1>
      </div>

      {/* Error Message */}
      <div className="max-w-md mx-auto mt-8 space-y-4 duration-700 delay-300 animate-in slide-in-from-bottom-5">
        <p className="text-sm font-medium tracking-widest uppercase md:text-base text-muted-foreground">
          The page you are looking for doesn&apos;t exist or another error occurred.
        </p>

        <Link
          href="/"
          className="inline-block pb-1 mt-8 text-sm font-bold tracking-widest uppercase transition-colors border-b-2 border-black hover:text-primary hover:border-primary"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

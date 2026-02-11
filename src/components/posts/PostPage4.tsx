
export default function PostPage4() {
  return (
    <article className=" w-full h-[1080px] bg-background text-foreground flex flex-col justify-center /* vertical center */ items-center /* horizontal center */ text-center ">
      {" "}
      <div className="w-[60%] py-12 space-y-12">
        {" "}
        <h1 className="text-4xl font-bold leading-tight max-w-3xl mx-auto">
          {" "}
          Software that’s up to speed{" "}
        </h1>{" "}
        <p className="w-[60%] text-lg font-light text-foreground max-w-2xl mx-auto">
          {" "}
          Sign up at buildwithspark.co and don’t leave your business
          behind.{" "}
        </p>{" "}
        <img
          src={"/nbarIcon.png"}
          alt="footer-icon"
          className="w-24 h-24 object-contain mx-auto mt-12"
        />{" "}
      </div>{" "}
    </article>
  );
}
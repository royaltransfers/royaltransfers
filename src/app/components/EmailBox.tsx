export default function EmailBox() {
  return (
    <form className="flex items-center  bg-white rounded-md overflow-hidden shadow-md w-full max-w-[270px] md:max-w-[380px]  lg:max-w-lg  px-1 md:px-3">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-grow py-4 lg:py-5 text-xs sm:text-sm md:text-base 4xl:text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none min-w-0 px-2 sm:px-3"
      />
      <button
        type="submit"
        className="bg-blue text-white text-xs sm:text-sm md:text-base 4xl:text-lg font-medium px-2 sm:px-3 md:px-4 lg:px-5 py-2.5 rounded-md flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}

import { useLoading } from "@/hooks/LoadingContext";

const Loader = () => {
  const { isLoading } = useLoading();
  console.log("Loading: " + isLoading);
  if (!isLoading) return null;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin">
        loading
      </div>
    </div>
  );
};

export default Loader;

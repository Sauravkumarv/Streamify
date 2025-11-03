import { useQuery } from "@tanstack/react-query";
import { getUserAuth } from "../lib/api";

const useAuthUser = () => {
 
    const authUser=useQuery({
      queryKey: ["authUser"],
  
      queryFn:getUserAuth,
      retry: false, //auth check
    });
    return {isLoading:authUser.isLoading,authUser:authUser.data?.user}
  
}

export default useAuthUser



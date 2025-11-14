import { axiosInstance } from "./axios";

export const signup =async(signupData)=>{
  const response=await axiosInstance.post("/auth/signup",signupData);
  return response.data;
  
}
export const login =async(loginData)=>{
  const response=await axiosInstance.post("/auth/login",loginData);
  return response.data;
  
}
export const logout =async()=>{
  const response=await axiosInstance.post("/auth/logout");
  return response.data;
  
}

export const getUserAuth= async() => {
 try {
  const res =await axiosInstance.get("/auth/me");
  return res.data; 
 } catch (error) {
  return null;
 } 
}

export const completeOnboarding=async(onboardingData)=>{
const res=await axiosInstance.post("/auth/onboarding",onboardingData);
return res.data;
}
export const getUserFriends=async()=>{
const res=await axiosInstance.get("/users/friends");
return res.data;
}
export const getRecommendedUsers=async()=>{
const res=await axiosInstance.get("/users");
return res.data;
}
export const getOutgoingFriendReqs=async()=>{
const res=await axiosInstance.get("/users/outgoing-friend-requests");
return res.data;  
}
export const sendFriendRequest=async(userId)=>{
  const res=await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
  }
  export const getFriendRequest=async()=>{
    const res=await axiosInstance.get("/users/friend-request");
    return res.data;
  }
  export const acceptFriendRequest=async(requestId)=>{
    const res=await axiosInstance.post(`/users/friend-request/${requestId}/accept`);
    return res.data;
    }
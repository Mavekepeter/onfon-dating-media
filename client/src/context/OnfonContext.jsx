import { createContext } from "react";

export const OnfonContext = createContext();
const OnfonContextProvider = (props)=> {

   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const value ={
    backendUrl
   }

return  (
      <OnfonContext.Provider value={value}>
        {props.children}
      </OnfonContext.Provider>
)
}
export default OnfonContextProvider;
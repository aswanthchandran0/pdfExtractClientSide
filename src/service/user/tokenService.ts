
export const tokenService = {
    setToken:(accessTokem:string)=>{
        localStorage.setItem('accessToken',accessTokem)    
    },
    getAccessToken:()=>localStorage.getItem('accessToken'),
    clearToken:()=>{
        localStorage.removeItem('accessToken')
    },
}
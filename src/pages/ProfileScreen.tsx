import  DefaultProfile from '../assets/images/profiles/c84082ec-d429-4ddd-9e6d-b162ba88a5aa.jpg'
import { Download, Settings } from "lucide-react"
import Navbar from '../components/user/navbar/Navbar'
import PrimaryButton from '../components/ui/button/PrimaryButton'

export interface IMediaCard{
    title:string 
    platform:string
    date:string
    quality:string 
    thumbnail:string 
}
const ProfileScreen = ()=>{

    // const downloadHistory:IMediaCard[] = [
    //     {
    //       title: 'Funny Cat Video',
    //       platform: 'YouTube',
    //       date: '2024-03-15',
    //       quality: '1080p',
    //       thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&h=120'
    //     },
    //     {
    //       title: 'Cooking Tutorial',
    //       platform: 'Instagram',
    //       date: '2024-03-14',
    //       quality: '720p',
    //       thumbnail: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=200&h=120'
    //     },
    //     {
    //       title: 'Travel Vlog',
    //       platform: 'Twitter',
    //       date: '2024-03-13',
    //       quality: '1080p',
    //       thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200&h=120'
    //     }
    //   ];

      
    return(
        <div className="flex flex-col w-full h-full min-h-screen">
 <Navbar/>
 <div className="w-full min-h-full px-4 pt-5 pb-16 bg-gradient-to-b md:pt-8 md:pb-32 from-indigo-50 to-white">
    {/* profile */}
    <div className="p-8 mb-8 bg-white shadow-md rounded-xl">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex items-center justify-center w-32 h-32 overflow-hidden border border-gray-100 rounded-full shadow">
          <img className="object-cover w-full h-full aspect-square" src={DefaultProfile} alt="profile image" />
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="mb-2 text-3xl font-bold">Joh doe</h1>
            <p className="mb-4 text-gray-600">john.doe@gmail.com</p>

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50">
                <Download size={20} className="text-indigo-600"/>
                <span className="font-semibold text-indigo-600">247 Downloads</span>
                </div>
                
                <div className="flex">
               <PrimaryButton Icon={Settings} size="md" action={()=>{}} text="Settings" className="px-10 py-[8px] sm:py-1"/>
                </div>

            </div>
          </div>
        </div> 
    </div>
    {/* Recent Downloads */}
    <div className="p-8 bg-white shadow-md rounded-xl ">

        <div className="flex items-center justify-start mb-6">
        <h2 className="text-2xl font-bold">Recent Downloads</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
           {/* {
            downloadHistory.map((data:IMediaCard)=>(
                <MediaCard data={data}/>
            ))
           } */}
        </div>
    </div>
    </div>
        </div>
    )
}

export default ProfileScreen
import AppWriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
export  function PostCard({$id,title,featuredimage}){
return (
    <Link className='h-55 w-46 border-2 rounded-[10px] hover:scale-101  m-2 bg-purple-400 overflow-hidden' to={`/post/${$id}`}>
        <div className='h-46 w-46 flex justify-center'>
            <img src={AppWriteService.getfileview(featuredimage)} className='h-full w-full object-cover rounded-[5px]' alt={title}/>
            </div>
        <div className='w-46 h-7 overflow-hidden text-center'>{title}</div>
        
    </Link>
)
}

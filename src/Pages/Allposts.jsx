import { useEffect, useState } from 'react'
import { Container ,PostCard} from '../index'
import appwriteservice from '../appwrite/config'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
export default function Allposts(){
    const [posts,setPosts]=useState([]);
    const userdata=useSelector(state=>state.auth.userData);
    useEffect(()=>{
        appwriteservice.getposts([Query.equal("userid",userdata.$id)]).then(
        (posts)=>{
            if(posts) setPosts(posts.documents);
        }
    )
    },[])
    return(
        <div>
            <Container className='flex flex-wrap'>
                {
                    posts.map((post)=>(
                        <PostCard key={post.$id} {...post} />
                    ))
                }
            </Container>
        </div>
    )
}
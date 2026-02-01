import { useEffect, useState } from 'react'
import appwriteservice from '../appwrite/config'
import {Container,PostCard} from '../index'
export default function Home(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        appwriteservice.getposts().then((posts)=>{
            if(posts) setPosts(posts.documents);
        })
    },[])
    if(posts.length===0){
        return (
            <Container>
                <div>
                    <h1>No existing Posts.</h1>
                </div>
            </Container>
        )
    }
    return (
        <Container className='flex flex-wrap space-x-2'>
            {
                posts.map((post)=>(
                    <PostCard key={post.$id} {...post}/>
                ))
            }
        </Container>
    )
}
import { Container,PostForm } from '../index'
import appwriteservice from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
export default function Editpost(){
    const [post,setPost]=useState(null);
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteservice.getpost(slug).then((post)=>{
                if(post) setPost(post);
            })
        }
        else navigate('/');   
    },[slug,navigate])
    return post?(
        <Container><PostForm post={post}/></Container>
    ):<h1>Loading...</h1>
}
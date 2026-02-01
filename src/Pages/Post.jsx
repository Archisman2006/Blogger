import { Link, useNavigate, useParams } from 'react-router-dom';
import {Container,Button} from '../index'
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import appwriteservice from '../appwrite/config';
import parse from 'html-react-parser';
export default function Post(){
    const [post,setPost]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();
    const userdata=useSelector(state=>state.auth.userData);
    const isAuthor=post && userdata ? (post.userid===userdata.$id):false
    useEffect(()=>{
        if(slug){
        appwriteservice.getpost(slug).then((post)=>{
            if(post) setPost(post); else navigate('/');
        })
        }
    },[slug,navigate])
    const deletepost=()=>{
        appwriteservice.deletepost(post.$id).then((status)=>{
            if(status){
                appwriteservice.deletefile(post.featuredimage); navigate('/');
            }
        })
    }
    return post?(
        <Container className='w-250 relative left-67 bg-purple-400 border-2 rounded-[10px]'>
            <img src={appwriteservice.getfileview(post.featuredimage)} className='w-150 pb-2 border-collapse rounded-[5px]'/>
            {
                isAuthor && <div>
                    <Link to={`/edit-post/${slug}`}> {/* we are using slug as post id, so this should be good. */}          
                        <Button className='h-8 p-0.5 w-10 rounded-[5px] border bg-purple-500 relative left-5 cursor-pointer '>Edit</Button>
                    </Link>
                    <Link>
                        <Button onClick={deletepost} className='h-8 p-0.5 w-13 rounded-[5px] border bg-purple-500 relative left-10 cursor-pointer'>Delete</Button>
                    </Link>
                </div>
            }
            <div>
                <h1 className='text-[25px] underline'>{post.title}</h1>
            </div>
            <div>
                {parse(post.content)}
            </div>
        </Container>
    ):null
}
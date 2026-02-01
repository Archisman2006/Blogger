import { useForm } from "react-hook-form";
import {Button,Input,RTE,Select} from '../../index'
import appwriteservice from '../../appwrite/config'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
export  function PostForm({post}){
    const {register,handleSubmit,watch,setValue,control,getValues,reset}=useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate=useNavigate();
    const userdata=useSelector(state=>state.auth.userData);
    const submit= async (data)=>{
        if(post){
            const file=data.image[0]?await appwriteservice.uploadfile(data.image[0]):null;
            if(file) appwriteservice.deletefile(post.featuredimage);
            const dbpost=await appwriteservice.updatepost(
                post.$id,{...data,featuredimage:file?file.$id:undefined}
            )
            if(dbpost){
                navigate(`/post/${dbpost.$id}`);
            }
        }
        else{
            const file=await appwriteservice.uploadfile(data.image[0]);
            console.log(file); 
            if(file){
                const fileid=file.$id;
                data.featuredimage=fileid;
                const dbpost=await appwriteservice.createpost({...data,userid:userdata.$id});
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`);
                }
            }
        }
        
    }
    const slugTransform=useCallback((value)=>{
        if(value && typeof value==='string'){
            // normalize: trim, lowercase, remove invalid chars, replace spaces with single hyphen
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        }
        return '';
    },[])
    useEffect(()=>{
        const subscription=watch((value,{name})=>{
        if(name==='title'){
            const generatedSlug = slugTransform(value.title);
            if(generatedSlug)
            setValue('slug',slugTransform(value.title),{shouldValidate:true});
        }
    })
        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugTransform,setValue])

    return (
    <form onSubmit={handleSubmit(submit)} className="text-[18px]">
        <div>
            <Input label='title: ' placeholder='title' {...register("title",{required:true})}
            className='p-2 ml-5' inputclass='w-150'/>
            {console.log(post?.slug)}
            <Input label='slug: ' placeholder='slug'  {...register("slug",{required:true})} readOnly
            className='p-2 ml-5' inputclass='w-150'/>
            <RTE label="" name="content" control={control} defaultValue={getValues("content")}/>
        </div>
        <div>
            <Input label="Featured Image: " type="file" accept="image/png, image/jpg, image/jpeg, image/gif" 
            {...register("image",{required:!post})}
            className='p-2 ml-5' />
            {post && (
                <img src={appwriteservice.getfileview(post.featuredimage)} className="w-100 rounded-[10px] ml-5" />
            )
            }
            <Select options={["active","inactive"]} label="status" {...register("status",{required:true})} className='p-2 ml-5' />
            <Button type='submit' className="p-0.5 border rounded-[5px] ml-7 mt-3">{post?'update':'submit'}</Button>
        </div> 
    </form>
)
}
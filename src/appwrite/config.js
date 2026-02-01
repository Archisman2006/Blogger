import config from "../config/config";
import { Client, ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client=new Client();
    databases; bucket;
    constructor(){
    this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectID);
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
    }
    async createpost({title,slug,content,featuredimage,status,userid}){
    try{
    return await this.databases.createDocument(config.appWriteDatabaseID,config.appWriteCollectionID,slug,{
        title,content,featuredimage,status,userid //deleted slug
    });
    }
    catch(error){
        throw error;
    }
    }
    async updatepost(slug,{title,content,featuredimage,status}){
    try {
    return await this.databases.updateDocument(
        config.appWriteDatabaseID,config.appWriteCollectionID,slug,{
            title,content,featuredimage,status
        }
    );    
    } catch (error) {
        throw error;
    }
    }
    async deletepost(slug){
    try {
    await this.databases.deleteDocument(
        config.appWriteDatabaseID,
        config.appWriteCollectionID,    
        slug
    ); return 1;   
    } catch (error) {
    return 0;
    }
    }
    async getpost(slug){
    try {
    return await this.databases.getDocument(config.appWriteDatabaseID,config.appWriteCollectionID,slug);    
    } catch (error) {
    throw error;
    }
    }
    async getposts(query=[Query.equal('status','active')]){
    try {
    return await this.databases.listDocuments(
    config.appWriteDatabaseID,config.appWriteCollectionID,query
    );
    } catch (error) {
    throw error;   
    }
    }
    async uploadfile(file){
    try {
    return this.bucket.createFile(
        config.appWriteBucketID,ID.unique(),file
    );
    } catch (error) {
    throw error;  
    }
    }
    async deletefile(fileid){
    try {
        await this.bucket.deleteFile(
        config.appWriteBucketID,fileid    
        );
    } catch (error) {
        throw error;
    }    
    }
    getfileview(fileid){
    try {
    return this.bucket.getFileView(
    config.appWriteBucketID,fileid
    );    
    } catch (error) {
        throw error;
    }    
    }
}

const service=new Service();
export default service;
import config from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService{
    client=new Client(); account;
constructor(){
    console.log(config.appWriteUrl);
    console.log(config.appWriteProjectID);
    console.log(import.meta.env);
    this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectID);
    this.account=new Account(this.client);  
    console.log("hello once again")
}
async createaccount({name,email,password}){
let UserAccount;
    try {
UserAccount= await this.account.create(ID.unique(),email,password,name);
} catch (error) {
throw error;   
}
if(UserAccount) return this.login({email,password}); else return UserAccount;
}
async login({email,password}){
try {
return this.account.createEmailPasswordSession({email,password});
} catch (error) {
throw error;   
}
}
async getcurrentuser(){
try {
    return await this.account.get();
} catch (error) {
    console.log("Appwrite Service::getcurrentuser::error123456");
    return null;
}
}
async logout(){
    try {
    await this.account.deleteSessions();    
    } catch (error) {
    throw error;   
    }
}
}
const authService=new AuthService();
export default authService;
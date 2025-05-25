import conf from "../conf/conf";
import { Client, Account, ID,Databases,Storage,Query, Query } from "appwrite";

export class Services{
    Client=new Client();
    Databases;
    bucket;
    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.Databases=new Databases(this.Client);
        this.bucket=new Storage(this.Client);
    }


    async createPost({title,content,featuredImage,slug,status,userId}){
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            return error
        }

    }


     async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            return error
        }

    }


     async deletePost(slug){
        try {
         await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
            
        } catch (error) {
            return error
            // return false
        }

    }

     async getPost(slug){
        try {
        return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
        )   
        } catch (error) {
            return error
            // return false
        }
    }


      async getPosts(queries=[Query.equal("status","active")]){
        try {
        return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
        )   
        } catch (error) {
            return error
            // return false
        }
    }


    // file uplode service

    async uploadFile(file){
        try {
            await this.bucket.createFile(conf.appwriteBuketId,ID.unique(),file)
            
        } catch (error) {
            throw error
            // return false
        }
    }

     async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBuketId,fileId)
             return true   
        }
        catch (error) {
            throw error
            // return false
        }
    }


     getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBuketId,fileId)
     }
}

const service=new Services();
export default service;
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcard" });

// ingest function to save user data in database
export const sycnUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            name: first_name + ' ' + last_name,
            email: email_addresses[0].email_addresses,
            image: image_url
        }
        await connectDB()
        await User()
    }
)

// ingest funciton to update user data 
export const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name: first_name + ' ' + last_name,
            inage: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

//Inngest function to delete user data

export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)
import {$authHost} from "../../../../processes/http/http";


export const GetAllBookingsAPI = async ({page}) =>{
    try {
        const res = await $authHost.get('/get_bookings' , page)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetUserById = async (userId) =>{
    try {
        const res = await $authHost.get(`/user/${userId}`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetAccommodationByID = async (accId) =>{
    try {
        const res = await $authHost.get(`/dacha/${accId}`)
        return res
    }catch (e){
        console.log(e)
    }
}
export const GetBookingById = async (bookingId) =>{
    try {
        const res = await $authHost.get(`/booking/${bookingId}`)
        return res
    }catch (e){
        console.log(e)
    }
}


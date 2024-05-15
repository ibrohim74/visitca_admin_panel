import {$authHost} from "../../../../processes/http/http";


export const GetStatAPI = async () => {
    try {
        const res = await $authHost.get('/site_statistics')
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}
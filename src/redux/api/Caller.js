const Get = async (url,  token='', header={})=>{
    let resp = await fetch(url, {
        method:'GET',
        headers:{
            ...header,
            "content-type":'application/json',
        }
    })

    return await resp.json()
}

export default {Get}

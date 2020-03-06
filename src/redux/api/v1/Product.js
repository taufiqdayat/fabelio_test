import req from '../Caller';

const getProduct = async()=>await req.Get('http://www.mocky.io/v2/5c9105cb330000112b649af8')

export default {getProduct}
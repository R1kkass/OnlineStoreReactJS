import axios from "axios";

export class Api {

async fetchPosts() {
    const query = ''
    const response = await axios.get('http://localhost:5001/api/devices'+'?page=1&query='+query+'&limit=8')
    return response.data.rows
    }

    async editOrder(id, state, token) {
        const query = ''
        const response = await axios.post('http://localhost:5001/api/buy/editOrder',{
            id: id,
            state: state
            }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            )
            .then(()=>{
                return response
            })
            .catch((e)=>{
                return e.message
            })
        }

    async deleteDevice(id){
        const response = await axios.post('http://localhost:5001/api/devices/delete',{
            id: id
            }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            )
            .then(()=>{
                return response
            })
            .catch((e)=>{
                return e.message
            })
        }

    async fetchType(){
        const response = await axios.get('http://localhost:5001/api/type')
        return response
    }

    async addType(name){
        const response = await axios.post('http://localhost:5001/api/type',{
            name:name
        },{headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}
        )
        return response
    }

    async deleteType(name){
        const response = await axios.post('http://localhost:5001/api/type/delete',{
            name:name
        },{headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}
        )
        
        return this.fetchType()
    }

    async deleteFeedback(id){
        const response = await axios.post('http://localhost:5001/api/feedback/delete',{
            id:id
        },{headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}
        )
        return response
    }
}
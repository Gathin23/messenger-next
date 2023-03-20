import { useState,useContext } from "react"
import { Web3Context } from "../context/Web3Context"

const Request = () => {
    const [toAcc,setToAcc] = useState('')
    const {contract}  = useContext(Web3Context)
    
    const friendRequest =async () => {
        console.log("Request sent")
        console.log(contract)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        friendRequest()
    }
    
    const handleChange = (event) => {
        setToAcc(event.target.value)
    }
    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={toAcc} />
                <button>Send!</button>
            </form>
        </div>
    )
}

export default Request
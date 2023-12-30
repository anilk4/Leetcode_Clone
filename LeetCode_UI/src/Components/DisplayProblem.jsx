import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Display = () => {
    const { id } = useParams();
    const [Data, setData] = useState([]);

    async function getData() {
        const data = await fetch('http://localhost:3000/problem/getAll');
        const json = await data.json();
        const Problems = json.course || [];
        setData(Problems)
        };
    
    useEffect(() => {
        getData();  
    }, [])

    return (
        <div className="display">
        <h1>Id: {id}</h1>
        
        </div>
    )
};



export default Display;
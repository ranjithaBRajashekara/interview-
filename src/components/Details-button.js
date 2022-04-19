import React, {useState} from 'react';
import '../App.css'
import {Button} from 'react-bootstrap'

function DetailsButton(props){
    const [result,setResult] = useState(props)
    return(
        <div>
            <Button style={{'backgroundColor':'white', color: 'black', border: 'none', marginRight: '5%', width: '150px', height:'50px'}}><div style={{color:'blue', fontSize: '12px',fontWeight: 600}}>{result.data}</div><div style={{color:'gray', fontSize: '15px'}}>{result.value}</div></Button>
        </div>
    )
}

export default DetailsButton;
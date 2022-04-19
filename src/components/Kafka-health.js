import '../App.css';
import React,{ useCallback, useState } from 'react';

function KafkaHealth(props){
    const [result, setResult] = useState(props.data);
    console.log("data: ",props.data)
    return (
    <div>
        {(result).map((row)=>(
            <div className='kafka-health-contents'>
            <div className='kafka-health-each-content'>
                <div className='kafka-health-each-row'>
                <div>{row.title}</div>
                <div>{row.value}</div>
                </div>
                <div className='kafka-health-each-row'>
                <div>DATA IN</div>
                <div>{row.dataIn}</div>
                </div>
                <div className='kafka-health-each-row'>
                <div>DATA OUT</div>
                <div>{row.dataOut}</div>
                </div>
                <div className='kafka-health-each-row'>
                <div>Message IN</div>
                <div>{row.messageIn}</div>
                </div>
            </div>
            </div>
        ))}
    </div>
    )
}

export default KafkaHealth;
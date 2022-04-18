import './App.css';
import {Navbar,
  Button
} from 'react-bootstrap';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Form
} from 'reactstrap'
import {BsFillHexagonFill} from 'react-icons/bs'
import { RiAccountCircleFill } from 'react-icons/ri';
import {IoIosNotifications} from 'react-icons/io';
import {AiOutlineFileSearch} from 'react-icons/ai';
import {BiNetworkChart} from 'react-icons/bi';
import {FaRegHandshake} from 'react-icons/fa';
import{BsCalendarDay} from 'react-icons/bs';
import {GiPuzzle} from 'react-icons/gi';

import React,{ useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import HeatMap from "react-heatmap-grid";

const rfStyle = {
  width:'100%',
  height:'40%',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'flex-start'
};

const xLabels = [
  "label1",
  "label2",
  "label3",
  "label4",
  "label5",
  "label6"
];
const yLabels = ["", "", "", "", "", "", ""];
const data = new Array(7)
  .fill(0)
  .map(() =>
    new Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100))
  );

  const flowChartData = [
    {
      heading: 'Authorization',
      percentage: '100',
      number: '510',
      no1: 5,
      no2: 4,
      no3: 1
    },
    {
      heading: 'E-KYC',
      percentage: '100',
      number: '510',
      no1: 5,
      no2: 4,
      no3: 1
    },
    {
      heading: 'Accounts & Branch Selection',
      percentage: '10',
      number: '510',
      no1: 5,
      no2: 4,
      no3: 1
    },
    {
      heading: 'Accounts & Branch Selection',
      percentage: '5',
      number: '510',
      no1: 5,
      no2: 4,
      no3: 1
    },
    {
      heading: 'Accounts & Branch Selection',
      percentage: '4',
      number: '510',
      no1: 5,
      no2: 4,
      no3: 1
    },
    {
      heading: 'Accounts & Branch Selection',
      percentage: '3',
      number: '510',
      no1: 5,
      no2: 4,
      no3: 1
    },
    {
      heading: 'Authorization',
      percentage: '80',
      number: '510',
      no1: 52,
      no2: 4,
      no3: 1
    },
    {
      heading: 'Authorization',
      percentage: '5',
      number: '5101',
      no1: 5,
      no2: 4,
      no3: 1
    }
  ]

  const kafkaHealthData = [
    {
      value: 'c-dps.connected-dp13.field',
      title: 'backend-instaaccount',
      dataIn: '674KB',
      dataOut: '10KB',
      messageIn: '3k'
    },
    {
      value: 'c-dps.connected-dp13.field',
      title: 'backend-idea',
      dataIn: '523KB',
      dataOut: '0B',
      messageIn: '1.8K'
    },
    {
      value: 'c-dps.connected-dp13.field',
      title:'backend-fts',
      dataIn: 319,
      dataOut: '41KB',
      messageIn: '2.1K'
    }
  ]

function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dropdownNameOpen,setdropdownNameOpen] = useState(false)
  const [dropdownTypeOpen,setdropdownTypeOpen] = useState(false)
  const [kafkData, setKafkaData] = useState([]);
  var arr = []
  function toggleName() {
    setdropdownNameOpen(!dropdownNameOpen)
  }

  function toggleAccOpening(){
    setdropdownTypeOpen(!dropdownTypeOpen)
  }

  React.useEffect(()=>{
    var initialNodes = []
    var initialx = -700
    var initialy = 0
    for(var i=0;i<flowChartData.length;i++){
      if(i===7){
        initialx = -500;
        initialy = -150;
      }
      initialNodes.push({
          id: 'node-'+(i+1),  
          position: { x: initialx, y: initialy }, 
          sourcePosition: 'right',
          targetPosition: 'left',
          style: { border: '1px solid #777', padding: 0, width: 'auto', height:'auto' },
          data: {
            label: (
              <>
              <div className='each-component'>
              <div className='each-component-heading'>{flowChartData[i].heading}</div>
              <div className='percentage'>{flowChartData[i].percentage}</div>
              <div className='number'>{flowChartData[i].number}</div>
              <div style={{display:'flex', flexDirection:'row',justifyContent: 'space-evenly', width:'85%'}}>
              <Button style={{float:'left', backgroundColor:'lightGray', color: 'black' }}>{flowChartData[i].no1}</Button>
              <Button style={{float:'left', backgroundColor:'lightGray', color: 'black' }}>{flowChartData[i].no2}</Button>
              <Button style={{float:'left', backgroundColor:'lightGray', color: 'black' }}>{flowChartData[i].no3}</Button>
              </div>
              </div>
              </>
            ),
          }   
        }
      )
      initialx+=200
    }
    var initialEdges = [] 
    for(var i=0;i<flowChartData.length;i++)
    {
      var edgeno = i+1
      var sourceno = i+1
      var targetno = i+2
      if(i==6)
      {
        edgeno = 1
        var sourceno = 1
      }
      initialEdges.push(
      { id: 'edge-'+edgeno, source: 'node-'+sourceno, target: 'node-'+targetno, style: { stroke: 'blue', 'stroke-width': 8, 'stroke-linecap':'round' }}
      )
    }
    kafkaHealthData.map((data)=>{
      console.log(data)
      var obj = {};
      obj.title = data.title;
      obj.value = data.value;
      obj.dataIn = data.dataIn;
      obj.dataOut = data.dataOut;
      obj.messageIn = data.messageIn;
      arr.push(obj)
    })
    setNodes(initialNodes)
    setEdges(initialEdges)
    setKafkaData(arr)
  })

  return (

<React.Fragment>
<Navbar className="bg" expand="lg">
<div className="brand">
<Dropdown className='drop-down' isOpen={dropdownTypeOpen} toggle={toggleAccOpening}>
        <DropdownToggle className='drop-down' style={{backgroundColor:'transparent', border: 'None', fontSize:"30px"}} caret>
          Smart Account Opening
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
</Dropdown>

</div>
{/* <Navbar.Collapse id="navbarScroll"> */}
      <div
        className="me-auto"
        navbarScroll
      >
      </div>
      <div className='navbar-right'>
        <div className='navbar-right-top'>
        <div className='navbar-right-top-contents'>
          <RiAccountCircleFill size={40} color="white" />
        </div>
        <div className='navbar-right-top-contents'>
        <Dropdown  isOpen={dropdownNameOpen} toggle={toggleName}>
        <DropdownToggle style={{backgroundColor:'transparent', border: 'None', fontSize:"20px"}} caret>
          Ricardo Chuan
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        </div>
        <div className='navbar-right-top-contents'>
          <IoIosNotifications size={20} color="white"/>
        </div>
        </div>
        <div className='navbar-right-bottom'>
          <div className='navbar-right-bottom-contents'><AiOutlineFileSearch color='white'/> Overview</div>
          <div className='navbar-right-bottom-contents'><BiNetworkChart color='white'/> Channels</div>
          <div className='navbar-right-bottom-contents'> <FaRegHandshake color='white'/>Partners</div>
          <div className='navbar-right-bottom-contents'><BsCalendarDay color='white'/> API's</div>
          <div className='navbar-right-bottom-contents'><GiPuzzle color='white'/> Integrations</div>
        </div>
      </div>

{/* </Navbar.Collapse> */}
</Navbar>
<div className='top'>
<div className='over-view'>
    <div className='over-view-div1'>Overview</div>
    <div className='over-view-div2'>
      01, Feb 2022
      </div>
    <div className='over-view-div3'>9:00 AM To Now</div>
  </div>
  <div className='details'>
    <Button style={{'backgroundColor':'white', color: 'black', border: 'none', marginRight: '5%', width: '150px', height:'50px'}}><div style={{color:'blue', fontSize: '12px',fontWeight: 600}}>Sessions</div><div style={{color:'gray', fontSize: '15px'}}>510</div></Button>
    <Button style={{'backgroundColor':'white', color: 'black', border: 'none', marginRight: '5%', width: '150px', height:'50px'}} variant='light' className='details-button'><div style={{color:'blue', fontSize: '12px',fontWeight: 600}}>Stuggle Score</div><div style={{color:'gray', fontSize: '15px'}}>0.7</div></Button>
    <Button style={{'backgroundColor':'white', color: 'black', border: 'none', marginRight: '5%', width: '150px', height:'50px'}} variant='light' className='details-button'><div style={{color:'blue', fontSize: '12px',fontWeight: 600}}>API Issues</div><div style={{color:'gray', fontSize: '15px'}}>2</div></Button>
    <Button style={{'backgroundColor':'white', color: 'black', border: 'none', marginRight: '5%', width: '150px', height:'50px'}} variant = 'light' className='details-button'><div style={{color:'blue', fontSize: '12px',fontWeight: 600}}>kafka</div><div style={{color:'gray', fontSize: '15px'}}>78.3K <span style={{fontSize: '12px'}}>bytes/sec</span></div></Button>
  </div>
</div>

<ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      style={rfStyle}
    />

    <div className='health'>
      <div className='kafka-health'>
        <div className='kafka-health-heading'>Kafka Health</div>
        {(kafkData).map((row)=>(
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
      <div className='kafka-health'>
      <div className='kafka-health-heading'>API Health</div>
        <div className='kafka-health-each-content'>
            <div className='kafka-health-each-row'>
              <div>Business Next</div>
              <div className='headmap'>
              <HeatMap
                  background={"#f0b01a"}
                  height={10}
                  squares={true}
                  xLabels={xLabels}
                  yLabels={yLabels}
                  xLabelsVisibility = {[]}
                  yLabelsVisibility = {[]}
                  data={data}
                />
              </div>
            </div>
            <div className='kafka-health-each-row'>
              <div>Bank Services</div>
              <div className='headmap'>
              <HeatMap
                  background={"#f0b01a"}
                  height={10}
                  squares={true}
                  xLabels={xLabels}
                  yLabels={yLabels}
                  xLabelsVisibility = {[]}
                  yLabelsVisibility = {[]}
                  data={data}
                />
              </div>
            </div>
            <div className='kafka-health-each-row'>
              <div>Other Services</div>
              <div className='headmap'>
              <HeatMap
                  background={"#f0b01a"}
                  height={10}
                  squares={true}
                  xLabels={xLabels}
                  yLabels={yLabels}
                  xLabelsVisibility = {[]}
                  yLabelsVisibility = {[]}
                  data={data}
                />
              </div>
            </div>
          </div>
      </div>

    </div>

</React.Fragment>

    );
}

export default Flow;



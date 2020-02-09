import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faPlay,faRedo ,faCheckCircle,faQuestionCircle,faWindowClose} from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';

export default class extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      inputx:'',
      hiddenParam1:1,
      hiddenParam2:1,
      difficulty:0,
      result:null,
      inputParam1:1,
      inputParam2:null,
      streak:0,
      working:false,
      correctModalShow:false,
      message:'',
      title:'',
      guide:true,
    }

  }
  componentDidMount(){
    this.randomise();
  }
  setGuide = (value)=>{
    this.setState({guide:value});
  }
  guideHelper = (value) =>{
    if(value===1){
      this.setInputx(1);
    }
  }


  setMessage(value){
    this.setState({message:value});
  }
  setTitle(value){
    this.setState({title:value})
  }
  setModalShow(value){
    this.setState({correctModalShow:value});
  }
  setWorking(value){
    this.setState({working:value});
  }
  incrStreak(){
    this.setState({streak:this.state.streak+1});

  }
  resetStreak(){
    this.setState({streak:0});
  }
  setInputx(value){
    this.setState({inputx:value});
  }
  setResult(value){
    this.setState({result:value});
  }

  setInputParam1(value){
    this.setState({inputParam1:parseInt(value)});
  }
  setInputParam2(value){
    this.setState({inputParam2:parseInt(value)});
  }
  setHiddenParam1(value){
    this.setState({hiddenParam1:value});
  }
  setHiddenParam2(value){
    this.setState({hiddenParam2:value});
  }

  randomise (){
    if(this.state.streak<1){
      this.setHiddenParam1(1);
      this.setHiddenParam2(this.getRandomInt(1,10));
    }
    else if(this.state.streak<3){
      this.setHiddenParam1(1);
      this.setHiddenParam2(this.getRandomInt(-10,-1));
    }
    else if(this.state.streak<7){
      this.setHiddenParam1(this.getRandomInt(1,5));
      this.setHiddenParam2(this.getRandomInt(-10,10));
    }
    else if(this.state.streak<12){
      this.setHiddenParam1(this.getRandomInt(-5,5));
      this.setHiddenParam2(this.getRandomInt(-10,10));
    }


  }


  getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  checkg(){
    if(this.state.streak<=4){
      this.setInputParam1(1);
    }

    if (this.state.hiddenParam1=== this.state.inputParam1 & this.state.hiddenParam2 === this.state.inputParam2){
      if(!this.state.streak===12){
        this.setMessage('You guessed the function correctly');
        this.setTitle('Congratulations!');
        this.setModalShow(true);
        this.incrStreak();
        this.randomise();
      }
      else{
        this.setMessage('You Made It!!');
        this.setTitle('Congratulations!');
        this.setModalShow(true);
        this.incrStreak();
        this.randomise();

      }


    }
    else{
      this.setMessage('It seems your guess wasnt correct');
      this.setTitle('Oops, something went wrong!');
      this.setModalShow(true);

    }
  }



  calculate(){
    this.setWorking(true);
    setTimeout(()=>{
      this.setWorking(false);
      if(parseInt(this.state.inputx,10)||parseInt(this.state.inputx,10)===0){

        this.setResult(parseInt(this.state.inputx) * this.state.hiddenParam1 + this.state.hiddenParam2);
      }
    },2000);

  }

  render(){
    return (
      <React.Fragment>

        <Guide setGuide={this.setGuide} guide={this.state.guide}/>
        <div className="main-container">
          <div className="side-div">
            <h1>Input</h1>
            <input type="text" value={this.inputx} className='on-top' onChange={(e)=>this.setInputx(e.target.value)} maxLength="4"/>
          </div>


          <div className="image-div">
            <FontAwesomeIcon className={this.state.working?"arrow blink_me":"arrow"} icon={faArrowRight}/>
              <div className={this.state.working?"play-pause-container hide-display":"play-pause-container"}>
                <FontAwesomeIcon className="play" onClick={()=>this.calculate()} icon={faPlay}/>

              </div>

          <img className="machine-image" alt="Smiley face" src={this.state.working?process.env.PUBLIC_URL +'/tumblr_nfakifdir61twkrf5o1_1280.webp':process.env.PUBLIC_URL +'/machine.png'}/>

            <FontAwesomeIcon className={this.state.working?"arrow blink_me":"arrow"}  icon={faArrowRight}/>

          </div>

          <div className="side-div">
            <h1>Output</h1>
            <h2 >{this.state.result}</h2>
          </div>
        </div>
            <div className="machine-extend">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">
                    Refresh the secret rule
                  </Tooltip>
                }
              >
                <button onClick={()=>this.randomise()}> <FontAwesomeIcon icon={faRedo}/></button>
              </OverlayTrigger>
            <input type={this.state.streak>3?'text':'hidden'}  onChange={(e)=>this.setInputParam1(e.target.value)} maxLength="3"/>
            <h2 className="machine-text">{this.state.streak>3?'* ':null} X +</h2>
            <input type="text" onChange={(e)=>this.setInputParam2(e.target.value)} maxLength="3"/>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-top">
                  Check your rule
                </Tooltip>
              }
            >
              <button onClick={()=>{
                console.log(this.state.hiddenParam1);
                console.log(this.state.inputParam1);
                console.log(this.state.hiddenParam2);
                console.log(this.state.inputParam2);
                this.checkg();
              }}>  <FontAwesomeIcon icon={faCheckCircle}/> </button>
            </OverlayTrigger>
          </div>
          <Alert
            show={this.state.correctModalShow}
            onHide={() => {this.setModalShow(false); if(this.state.streak===12){this.resetStreak();} }}
            title={this.state.title}
            message={this.state.message}

          />

          <h1 className="level-heading">Level<span>{this.state.streak!==12?Math.floor(this.state.streak/4)+1:3}</span> </h1>
          <Progress progress={this.state.streak!==12?this.state.streak%4:4}/>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-top">
                Guide
              </Tooltip>
            }
          >
          <div className='guide-container'><FontAwesomeIcon icon={faQuestionCircle} onClick={()=>{this.setGuide(true)}}/></div>
          </OverlayTrigger>
          {this.state.streak===12?<Win/>:null}
      </React.Fragment>
    )
  }
}
const Win = ()=>{
  return (
  <div className="win-container">
    <img className="win-gif" alt="Smiley face" src={process.env.PUBLIC_URL +'/giphy.gif'}/>
  </div>
  )
}

const Guide= (props)=> {
  var guide = ["In this game you have to figure out the inner workings of a function machine.","This machine takes a number as an input and upon activation applies a secret rule on it and delivers the answer as an output.","Your task is to figure out the secret rule by testing the machine with your inputs."
    ,"When you think you have figured out the secret rule fill the field and press the check button.","Each time you guess correctly a new secret rule is placed in it's place and you come one step closer to beating the machine.","Surpass this super inteligent machine by completing the 3rd Level. Good Luck!"]
  const [progress,setProgress] = useState(0);



  return (
    <div>
      {props.guide?
        <React.Fragment>
          <div className="overlay">

            <Popups progress={progress}/>
            <div className="close-container" ><FontAwesomeIcon icon={faWindowClose} className='close-guide' onClick={()=>{props.setGuide(false)}}/></div>
            <div className="text-box">
              <p>{guide[progress]}</p>
              <Button className="guide-button-next" onClick={()=>{if(progress<5){setProgress(progress+1)}else{setProgress(0); props.setGuide(false)}  }}><FontAwesomeIcon  icon={faArrowRight}/></Button>
            </div>

          </div>
        </React.Fragment>:null
      }

  </div>
  )
}


function Popups(props){
  return(
      <div>
      {props.progress===1||props.progress===2?
        <React.Fragment>
          <div className="pop-1">
            <OverlayTrigger triger='focus' defaultShow={true} placement="bottom" overlay={
              <Popover id="popover-basic" >
                <Popover.Title as="h3">1) This is the input field.</Popover.Title>

              </Popover>
            }>
              <div className="empty"></div>
              </OverlayTrigger>
          </div>
          <div className="pop-2">
            <OverlayTrigger triger='focus' defaultShow={true} placement="bottom" overlay={
              <Popover id="popover-basic" >
                <Popover.Title as="h3">2) This is the button that activates the machine</Popover.Title>

              </Popover>
            }>
              <div className="empty"></div>
            </OverlayTrigger>
          </div>
          <div className="pop-3">
            <OverlayTrigger triger='focus' defaultShow={true} placement="bottom" overlay={
              <Popover id="popover-basic" >
                <Popover.Title as="h3">3) The output will be displayed here</Popover.Title>
              </Popover>
            }>
              <div className="empty"></div>
            </OverlayTrigger>
          </div>
        </React.Fragment>:null
    }
    {props.progress===3?
      <React.Fragment>
        <div className="pop-4">
          <OverlayTrigger triger='focus' defaultShow={true} placement="bottom" overlay={
            <Popover id="popover-basic" >
              <Popover.Title as="h3">Fill the input and press the check button next to it</Popover.Title>

            </Popover>
          }>
            <div className="empty"></div>
          </OverlayTrigger>
        </div>
      </React.Fragment>:null
    }

  {props.progress===6?
    <React.Fragment>
      <div className="pop-5">
        <OverlayTrigger triger='focus' defaultShow={true} placement="bottom" overlay={
          <Popover id="popover-basic" >
            <Popover.Title as="h3">Fill the input and press the check button sdfsdfnext to it</Popover.Title>

          </Popover>
        }>
          <div className="empty"></div>
        </OverlayTrigger>
      </div>
    </React.Fragment>:null
  }

  </div>
  )

}
function Alert(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p>
          {props.message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{props.message==="You Made It!!"?'Play Again':'Continue'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

class Progress extends React.Component {
  render(){
    return(
      <div className='my-progress-bar'>
        <div className={this.props.progress>0?'my-progress-bar-item':'hide my-progress-bar-item'} ></div>
        <div className={this.props.progress>1?'my-progress-bar-item':'hide my-progress-bar-item'}></div>
        <div className={this.props.progress>2?'my-progress-bar-item':'hide my-progress-bar-item'}></div>
        <div className={this.props.progress>3?'my-progress-bar-item':'hide my-progress-bar-item'}></div>
      </div>
    )
  }
}

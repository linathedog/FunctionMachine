import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faPlay,faRedo ,faCheckCircle,faArrowUp} from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    }

  }
  componentDidMount(){
    this.randomise();
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
    if(this.state.streak<2){
      this.setHiddenParam1(1);
      this.setHiddenParam2(this.getRandomInt(1,5));
    }
    else if(this.state.streak<4){
      this.setHiddenParam1(1);
      this.setHiddenParam2(this.getRandomInt(-10,10));
    }
    else if(this.state.streak<8){
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
      this.setMessage('You guessed the function correctly');
      this.setTitle('Congratulations!');
      this.setModalShow(true);
      this.incrStreak();
      this.randomise();

    }
    else{
      this.setMessage('It seems your guess wasnt correct');
      this.setTitle('Oops, something went wrong!');
      this.setModalShow(true);
      this.setWrongModalShow(true);
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
        
        <div className="main-container">
          <div className="side-div">
            <h1>Input</h1>
            <input type="text" value={this.inputx} onChange={(e)=>this.setInputx(e.target.value)} maxLength="4"/>
          </div>


          <div className="image-div">
            <FontAwesomeIcon className={this.state.working?"arrow blink_me":"arrow"} icon={faArrowRight}/>
              <div className={this.state.working?"play-pause-container hide-display":"play-pause-container"}>
                <FontAwesomeIcon className="play" onClick={()=>this.calculate()} icon={faPlay}/>

              </div>

          <img className="machine-image"  src={this.state.working?process.env.PUBLIC_URL +'/tumblr_nfakifdir61twkrf5o1_1280.webp':process.env.PUBLIC_URL +'/machine.png'}/>

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
                    Tooltip on <strong>top</strong>.
                  </Tooltip>
                }
              >
                <button onClick={()=>this.randomise()}> <FontAwesomeIcon icon={faRedo}/></button>
              </OverlayTrigger>
            <input type={this.state.streak>3?'text':'hidden'}  onChange={(e)=>this.setInputParam1(e.target.value)} maxLength="3"/>
            <h2 className="machine-text">{this.state.streak>3?'* ':null} X +</h2>
            <input type="text" onChange={(e)=>this.setInputParam2(e.target.value)} maxLength="3"/>
            <button onClick={()=>{
              console.log(this.state.hiddenParam1);
              console.log(this.state.inputParam1);
              console.log(this.state.hiddenParam2);
              console.log(this.state.inputParam2);
              this.checkg();
            }}>  <FontAwesomeIcon icon={faCheckCircle}/> </button>
          </div>
          <Alert
            show={this.state.correctModalShow}
            onHide={() => this.setModalShow(false)}
            title={this.state.title}
            message={this.state.message}

          />
          <h1 className="level-heading">Level<span>{Math.floor(this.state.streak/4)+1}</span> </h1>
          <Progress progress={this.state.streak%4}/>
      </React.Fragment>
    )
  }
}

function Guide() {
  var guide = ["In this game you have to figure out the inner workings of a function machine.","This machine takes a number as an input and upon activation applies a secret rule on it and delivers the answer as an output."]
  const [progress,setProgress] = useState(0);
  return (
    <div className="overlay">
      <div className="text-box">
        <p>{guide[progress]}</p>
        <Button className="guide-button-next" onClick={()=>{setProgress(progress+1)}}><FontAwesomeIcon  icon={faArrowRight}/></Button>
      </div>
      <div className={progress===1?'guide-arrow':'guide-arrow hidden'}><FontAwesomeIcon  icon={faArrowUp}/><br/>1</div>
      <h1>Rules of the function machine game</h1>
        <p>.  Your work is to figure out the secret rule by testing the machine with your inputs.
          Each time you guess correctly a new secret rule is placed in it's place and you come one step closer to beating the machine. There are 3 levels of
          difficulty in this game, do your best to surpass this super inteligent machine. Good Luck
        </p>

    </div>
  )
}
function Alert(props) {
  return (
    <Modal
      {...props}
      size="lg"
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
        <Button onClick={props.onHide}>Continue</Button>
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

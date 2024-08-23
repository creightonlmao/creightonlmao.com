import './App.css';
import './homepage.css';
import eyeball from './images/eyecube_cropped.png';
import creditdata from './credits/creditdata.json';
import {useState, useRef, Suspense, useEffect} from 'react';
import EyeCanvas from './EyeCanvas';

// comma is true iff this track is not the last/only one in the tracklist 
function Track({link, name, comma}) {
  return (
    <>
      <a href={link} className="listlink"><em>{name}</em>{comma && <em>, </em>}</a>
    </>
  );
}

function TracksList({list}) {

  const tracks = list.map((track, index) =>
    <Track link={track.link} name={track.name} comma={index + 1 != list.length} />
  )

  return (
    <div className="trackslist">
      <dd> Tracks: {tracks}</dd>
    </div>
  );
}

function CreditSublist({category, title}) {
  
  const items = category.map(item =>
    <>
      <dt><a href={item.link} className="listlink"> <em>{item.name}</em></a> | {item.artist}</dt>
      {item.tracks && <TracksList list={item.tracks}/>}
    </>
  );

  return (
    <>
      <h2 class="creditsubtitle">{title}</h2>
      <dl>{items}</dl>
    </>
  );
}

function Credits() {

  return(
    <div id="credits" className="credits">

    <h1 className="credittitle"> credits </h1>
    <div className="centeredlist">
      
      <CreditSublist category={creditdata.credit.mastering} title = "mastering"/>
      <CreditSublist category={creditdata.credit.mixing} title = "mixing"/>
      <CreditSublist category={creditdata.credit.producing} title = "producing"/>
    </div>
    </div>
  );
}

function App() {

  const [displayCredits, setDisplayCredits] = useState(false);
  const sectionRef = useRef(null);
  const eyeRef = useRef();

  useEffect(() => {
    function rotateCube(event) {
      // console.log(event.clientX, event.clientY);
      if (eyeRef.current) eyeRef.current.callRotation(event.clientX - window.innerWidth / 2, event.clientY - window.innerHeight / 2);
      else console.log(eyeRef.current);
    };

    window.addEventListener("mousemove", rotateCube);
  }, []);

  function creditClick() {
    setDisplayCredits(!displayCredits);
    if (displayCredits) { // fix the scrolling
      sectionRef.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }

  

  return (
    <div className="App" /*onMouseMove={rotateCube} /* the error is that when App runs EyeCanvas isn't rendered yet so there isn't a ref? need to call useRef after it renders*/ > 
      
        <div className="mainarea">
          <Suspense fallback={<div> Loading... </div>}>
          
            <EyeCanvas ref={eyeRef}/>
          </Suspense>
          <br />
          <br />
          <div className="links">
            <a href="https://open.spotify.com/artist/3jb4tT5s9CebD3Bu5KPaTK?si=CL0iSXm2Rem9Hqvl2hII8w">music</a>
            <button onClick={creditClick}>credits</button>
          </div>

        </div>
        <div ref={sectionRef}>
          {displayCredits && <Credits />}
        </div>
      
    </div>
  );
}



export default App;

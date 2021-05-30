import React, { useState, useRef } from 'react';
import './style.css';

export const Audio = (props) => {
  const audioRef = useRef();
  const [audioStatus, setAudioStatus] = useState('loading');
  const [delka, setDelka] = useState(0);
  const [aktualniCas, setAktualniCas] = useState(0);

  const handleToggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const handleStartAudio = () => {
    audioRef.current.play();
    setAudioStatus('Pause');
  };

  const handleTimeUpdate = (event) => {
    setDelka(audioRef.current.duration);
    setAktualniCas(audioRef.current.currentTime);
  };

  return (
    <>
      <audio
        id="zvuk"
        ref={audioRef}
        src={props.soubor}
        onLoadedMetadata={handleStartAudio}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setAudioStatus('Pause')}
        onPause={() => setAudioStatus('Play')}
        onEnded={() => setAudioStatus('Play')}
      ></audio>
      <button className="btn-audio" onClick={handleToggleAudio}>
        <div className="audio-status">{audioStatus}</div>
        <div
          style={{
            backgroundColor: 'green',
            width: `${(aktualniCas / delka) * 100}%`,
            height: '100%',
            color: 'white',
            borderRadius: '10px',
          }}
        ></div>
      </button>
    </>
  );
};

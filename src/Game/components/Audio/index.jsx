import React, { useState, useRef } from 'react';
import {
  faPlayCircle,
  faPauseCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  async function handleStartAudio() {
    try {
      await audioRef.current.play();
      setAudioStatus('pause');
    } catch (e) {
      setAudioStatus('play');
    }
  }

  const handleTimeUpdate = () => {
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
        onPlay={() => setAudioStatus('pause')}
        onPause={() => setAudioStatus('play')}
        onEnded={() => setAudioStatus('play')}
      ></audio>
      <div className="audio-bar">
        <div
          className="audio-bar--inner"
          style={{ width: `${(aktualniCas / delka) * 100}%` }}
        ></div>
      </div>
      <button className="btn-audio" onClick={handleToggleAudio}>
        <FontAwesomeIcon
          icon={
            audioStatus === 'play'
              ? faPlayCircle
              : audioStatus === 'pause'
              ? faPauseCircle
              : faSpinner
          }
          spin={audioStatus === 'loading' ? true : false}
          size="3x"
        />
      </button>
    </>
  );
};

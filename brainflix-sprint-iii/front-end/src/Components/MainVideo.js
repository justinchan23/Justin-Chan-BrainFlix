import React, { useEffect, useState, useRef } from 'react'

const MainVideo = props => {
  const [videoPlay, setVideoPlay] = useState(false)
  const [playPauseButton, setPlayPauseButton] = useState('./Assets/Icons/SVG/Icon-play.svg')
  const [videoMute, setVideoMute] = useState(false)
  const video = useRef()

  const videoEnded = () => {
    video.current.load()
    setVideoPlay(false)
    setPlayPauseButton('./Assets/Icons/SVG/Icon-play.svg')
  }

  const playVideo = () => {
    video.current.play()
    setVideoPlay(true)
    setPlayPauseButton('./Assets/Icons/SVG/Icon-pause.svg')
  }

  const pauseVideo = () => {
    video.current.pause()
    setVideoPlay(false)
    setPlayPauseButton('./Assets/Icons/SVG/Icon-play.svg')
  }

  const playOrPause = () => {
    videoPlay ? pauseVideo() : playVideo()
  }

  const mute = () => {
    setVideoMute(videoMute ? false : true)
    video.current.muted = videoMute
  }

  const muteVideo = () => {
    mute()
  }

  const requestFullscreen = () => {
    video.current.requestFullscreen()
  }

  useEffect(() => {
    videoEnded()
  }, [props.poster])

  const { poster, duration, src } = props
  return (
    <main className="main">
      <div className="main__videoImage">
        <video
          poster={poster}
          src={src}
          ref={video}
          className="main__videoImageFull"
          onEnded={videoEnded}
        />
      </div>
      <div className="main__videoControls">
        <button className="main__videoButton" onClick={playOrPause}>
          <img src={playPauseButton} alt="" />
        </button>
        <div className="main__videoSlider">
          <progress className="main__videoBar" value="0" min="0" max="100" />
          <h6 className="main__videoTime">0:00 / {duration}</h6>
        </div>
        <div className="main__buttonRight">
          <button
            className="main__videoButtonRight main__videoButtonPadding"
            onClick={() => {
              requestFullscreen()
            }}
          >
            <img
              src="./Assets/Icons/SVG/Icon-fullscreen.svg"
              alt=""
              className="main__videoFullscreen"
            />
          </button>
          <button className="main__videoButtonRight" onClick={muteVideo}>
            <img src="./Assets/Icons/SVG/Icon-volume.svg" alt="" className="main__videoVolume" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default MainVideo
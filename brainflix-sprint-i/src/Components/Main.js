import React from 'react'
import MainContent from './MainContent'
import TopButton from './TopButton'
import videoData from './Data/CurrentVideo.json'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      currentVideo: videoData,
      itemText: ''
    }
  }

  commentTextbox = event => {
    this.setState({ itemText: event.target.value })
    //console.log(this.state.itemText)
  }

  addComment = () => {
    //event.preventDefault()
    //console.log(this.state.itemText)
    if (this.state.itemText.length < 2) {
      alert('Please enter a valid comment')
    } else {
      const newComment = this.state.currentVideo.comments.concat({
        name: 'Justin Chan',
        comment: this.state.itemText,
        id: this.state.currentVideo.comments.length,
        timestamp: Math.floor(new Date())
      })
      this.setState(
        Object.assign(this.state.currentVideo, {
          comments: newComment,
          itemText: ''
        })
      )
    }
  }

  deleteComment = key => {
    const commentArray = this.state.currentVideo.comments.slice(0)
    commentArray.splice(key, 1)
    //delete commentArray[key]
    this.setState(Object.assign(this.state.currentVideo, { comments: commentArray }))
  }

  render() {
    return (
      <div>
        <main className="main">
          <div className="main__videoImage">
            <video poster={this.state.currentVideo.image} className="main__videoImageFull" />
          </div>
          <div className="main__videoControls">
            <button className="main__videoButton">
              <img src="./Assets/Icons/SVG/Icon-play.svg" alt="" />
            </button>
            <div className="main__videoSlider">
              <progress className="main__videoBar" value="0" min="0" max="100" />
              <h6 className="main__videoTime">0:00 / 0:42</h6>
            </div>
            <div className="main__buttonRight">
              <button className="main__videoButtonRight">
                <img
                  src="./Assets/Icons/SVG/Icon-fullscreen.svg"
                  alt=""
                  className="main__videoFullscreen"
                />
              </button>
              <button className="main__videoButtonRight">
                <img
                  src="./Assets/Icons/SVG/Icon-volume.svg"
                  alt=""
                  className="main__videoVolume"
                />
              </button>
            </div>
          </div>
        </main>
        <MainContent
          currentVideo={this.state.currentVideo}
          commentTextbox={this.commentTextbox}
          addComment={this.addComment}
          itemText={this.state.itemText}
          deleteComment={this.deleteComment}
        />
        <TopButton />
      </div>
    )
  }
}

export default Main

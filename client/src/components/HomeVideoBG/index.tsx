import './index.css'

const VideoBackground = () => {
    return (
      <div className="video-background">
        <div className="video-iframe-wrapper">
          <iframe
            src="https://player.vimeo.com/video/1079532880?background=1&autoplay=1&loop=1&byline=0&title=0"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Background Video"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default VideoBackground;

 
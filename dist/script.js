function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById('beep');
/* builds both break and session length containers so they both look identical, but eventually with different values*/
const TimerSet = (props) => /*#__PURE__*/
React.createElement("div", { className: "timer-container" }, /*#__PURE__*/
React.createElement("div", { className: "timer-flex" }, /*#__PURE__*/
React.createElement("h1", { id: props.labelId }, props.title), /*#__PURE__*/
React.createElement("div", { className: "button-container" }, /*#__PURE__*/
React.createElement("button", { id: props.minusId, onClick: props.handleMinus }, /*#__PURE__*/
React.createElement("i", { class: "fas fa-minus fa-sm" })), /*#__PURE__*/

React.createElement("span", { id: props.lengthId }, props.count), /*#__PURE__*/
React.createElement("button", { id: props.plusId, onClick: props.handlePlus }, /*#__PURE__*/
React.createElement("i", { class: "fas fa-plus fa-sm" })))));





/* builds the main clock container using props */
const Clock = (props) => /*#__PURE__*/
React.createElement("div", { className: "clock-container" }, /*#__PURE__*/
React.createElement("h1", { id: "timer-label" }, props.activeTimer), /*#__PURE__*/
React.createElement("span", { id: "time-left" }, props.countTimer), /*#__PURE__*/
React.createElement("div", null, /*#__PURE__*/
React.createElement("button", { id: "start_stop", onClick: props.playPause }, /*#__PURE__*/
React.createElement("i", { className: "fas fa-play fa-sm" }), /*#__PURE__*/
React.createElement("i", { className: "fa fa-pause fa-sm" })), /*#__PURE__*/

React.createElement("button", { id: "reset", onClick: props.reset }, /*#__PURE__*/React.createElement("i", { class: "fas fa-redo fa-sm" }))));



//parent component
class Timers extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "sessionPlus",




















    () => {
      if (!this.state.timerActive && this.state.sessionCount < 60) {
        this.setState({
          sessionCount: this.state.sessionCount + 1,
          activeCount: this.state.activeCount + 1 * 60 });

      }
    });_defineProperty(this, "sessionMinus",
    () => {
      if (this.state.sessionCount > 1 && !this.state.timerActive) {
        this.setState({
          sessionCount: this.state.sessionCount - 1,
          activeCount: this.state.activeCount - 1 * 60 });

      }
    });_defineProperty(this, "breakPlus",
    () => {
      if (this.state.breakCount < 60) {
        this.setState({
          breakCount: this.state.breakCount + 1 });

      }
    });_defineProperty(this, "breakMinus",
    () => {
      if (this.state.breakCount > 1) {
        this.setState({
          breakCount: this.state.breakCount - 1 });

      }
    });_defineProperty(this, "timerDisplay",
    count => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      };
      if (seconds < 10) {
        seconds = "0" + seconds;
      };
      return minutes + ":" + seconds;
    });_defineProperty(this, "handlePlayPause",
    () => {
      if (this.state.timerActive) {
        clearInterval(this.duration);
        this.setState({
          timerActive: false });

      } else
      {
        this.setState({
          timerActive: true });

        // create countdown:  
        this.duration = setInterval(() => {
          if (this.state.activeCount === 0) {
            if (this.state.activeTimer === "Session") {
              this.setState({
                activeTimer: "Break",
                activeCount: this.state.breakCount * 60 });

            } else
            {
              this.setState({
                activeTimer: "Session",
                activeCount: this.state.sessionCount * 60 });

            }
            audio.play();
          } else
          {
            this.setState({
              activeCount: this.state.activeCount - 1 });

          }

        }, 1000);
      }
    });_defineProperty(this, "handleReset",
    () => {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        activeCount: 25 * 60,
        activeTimer: "Session",
        timerActive: false });

      clearInterval(this.duration);
      audio.pause();
      audio.currentTime = 0;
    });this.duration = undefined;this.state = { breakCount: 5, sessionCount: 25, activeCount: 25 * 60, activeTimer: "Session", timerActive: false };this.timerDisplay = this.timerDisplay.bind(this);this.handlePlayPause = this.handlePlayPause.bind(this);this.handleReset = this.handleReset.bind(this);this.sessionPlus = this.sessionPlus.bind(this);this.sessionMinus = this.sessionMinus.bind(this);this.breakPlus = this.breakPlus.bind(this);this.breakMinus = this.breakMinus.bind(this);}componentWillUnmount() {clearInterval(this.duration);}
  render() {
    //props for all 3 containers:
    const breakProps = {
      title: "Break Length",
      count: this.state.breakCount,
      labelId: "break-label",
      lengthId: "break-length",
      minusId: "break-decrement",
      plusId: "break-increment",
      handleMinus: this.breakMinus,
      handlePlus: this.breakPlus };

    const sessionProps = {
      title: "Session Length",
      count: this.state.sessionCount,
      labelId: "session-label",
      lengthId: "session-length",
      minusId: "session-decrement",
      plusId: "session-increment",
      handleMinus: this.sessionMinus,
      handlePlus: this.sessionPlus };

    const clockProps = {
      activeTimer: this.state.activeTimer,
      countTimer: this.timerDisplay(this.state.activeCount),
      playPause: this.handlePlayPause,
      reset: this.handleReset };

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { className: "headline" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { className: "main-flex" }, /*#__PURE__*/
      React.createElement(TimerSet, breakProps), /*#__PURE__*/
      React.createElement(TimerSet, sessionProps)), /*#__PURE__*/

      React.createElement("div", { className: "main-flex" }, /*#__PURE__*/
      React.createElement(Clock, clockProps))));



  }}

ReactDOM.render( /*#__PURE__*/React.createElement(Timers, null), document.getElementById("timers"));
/**
 * app-container for encapsulate all main app logic
 * subscribe to window message event and reRender stream data when updates.
 */
(function(global, undefined) {
  var App = global.App;
  var AppContainer = React.createClass({
    getInitialState: function() {
      return {
        chatWindows: []
      };
    },

    chatWindowsCount: 0,

    addChatWindow: function() {
      var _chatWindows = this.state.chatWindows;
      _chatWindows.push(this.chatWindowsCount++);
      this.setState({
        chatWindows: _chatWindows
      });
    },

    componentDidMount: function() {
      global.addEventListener('message', function(e) {

        // send introduction message
        if(this.chatWindowsCount === 1 && e.data.ready) {
          this.setState({
            stream: {
              timestemp: new Date(),
              text: 'Hey there, Welcome, did you know you can use emojis ! :100: :P :) :O, try it now!',
              author: 'Mr.Robot'
            }
          });
        }

        this.setState({
          stream: e.data.stream
        });
      }.bind(this));
    },

    render: function() {
      return (<App className='app-stage' stream={this.state.stream} chatWindows={this.state.chatWindows} onAdd={this.addChatWindow}/>);
    }

  });
  global.AppContainer = AppContainer;
}(window));

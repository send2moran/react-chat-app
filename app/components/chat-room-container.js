/**
 * chat room container encapsulate window message event and push new message updates to parent window
 */
(function(global, undefined) {
  var ChatRoom = global.ChatRoom;
  var ChatRoomContainer = React.createClass({
    getInitialState: function() {
      return {
        stream: [],
        user: this.getRandomUsername()
      };
    },

    componentDidMount: function() {
      global.parent.postMessage({'ready': true}, '*');

      // subscribe to message event from window
      // check if message log is already in list, if not push new message to log list.
      global.addEventListener('message', function(e) {
        if (typeof (e.data.stream) !== 'undefined') {

          if (this.state.stream.filter(function(item) {
              return item.timestemp.getTime() === e.data.stream.timestemp.getTime();
            }).length > 0) {
            return;
          }

          var _stream = this.state.stream;
          _stream.push(e.data.stream);

          this.setState({
            stream: _stream
          });
        }

        // scroll to the bottom of the chat log.
        global.setTimeout(function() {
          var logDiv = document.getElementById('log');
          logDiv.scrollTop = logDiv.scrollHeight;
        }, 0);

      }.bind(this));

    },

    getRandomUsername: function() {
      // get random user name from list of pre-defined names
      var userNames = ['Moran','Pini','Lior','Keren','Omri','Shai'];
      var user = userNames[Math.floor(Math.random() * userNames.length)];
      return user;
    },

    pushMessage: function(message) {
      // push new chat message to the parent window, only if not empty
      var _stream = this.state.stream;
      if (message.match(/\S/)) {

        var newStreamLog = {
          timestemp: new Date(),
          text: message,
          author: this.state.user
        };
        _stream.push(newStreamLog);

        // post message
        global.parent.postMessage({
          stream: newStreamLog
        }, '*');

        // update component state
        this.setState({
          message: '',
          stream: _stream
        });

        // scroll to the bottom of the chat log.
        global.setTimeout(function() {
          var logDiv = document.getElementById('log');
          logDiv.scrollTop = logDiv.scrollHeight;
        }, 0);
      }
    },

    render: function() {
      return (
          <ChatRoom className='chat-room-container' onPushMessage={this.pushMessage} user={this.state.user} stream={this.state.stream}/>
        );
    }

  });
  global.ChatRoomContainer = ChatRoomContainer;
}(window));

/**
 * chat room component
 * @property {function} onPushMessage
 * @property {string} user
 * @property {array} stream
 */
(function(global, undefined) {

  var ChatRoom = React.createClass({

    mixins: [ReactEmoji],

    getInitialState: function() {
      return {
        stream: this.props.stream,
        message: ''
      };
    },

    componentDidMount: function() {},

    handleChange: function(event) {
      this.setState({
        message: event.target.value
      });
    },

    pushMessage: function() {
      this.props.onPushMessage(this.state.message);
      this.refs.chatTextArea.getDOMNode().value = '';
    },

    handleKeyDown: function(event) {
      if (event.keyCode == 13 && !event.shiftKey) {
        this.pushMessage();
      }
    },

    render: function() {
      return (
        <div>
          <div id='log' className='chat-room-log'>
            {this.state.stream.map(function(log) {
              return <div className='chat-bubble-wrap' key={log.timestemp.getTime()}>{log.author}:
                      <span className='chat-bubble'>
                        <span className='chat-bubble-text'>{ this.emojify(log.text) }</span>
                      </span>
                      <span className='chat-bubble-date'>{moment(log.timestemp.getTime()).format('MMMM Do, HH:mm:ss')}</span>
                    </div>
            }.bind(this))}
          </div>
          <textarea onKeyDown={this.handleKeyDown} defualtValue={this.state.message} className='chat-room-textbox' ref='chatTextArea' onChange={this.handleChange}></textarea>
          <input className='chat-room-send-button' type="button" value="send" onClick={this.pushMessage}/>
        </div>
        );
    }

  });
  global.ChatRoom = ChatRoom;
}(window));

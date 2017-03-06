/**
 * app component encapsulate add button and list of chat-containers
 * @property {function} onAdd
 * @property {array} chatWindows
 * @property {array} stream
 */
(function(global, undefined) {
  var AddButton = global.AddButton;
  var ChatContainer = global.ChatContainer;
  var App = React.createClass({
    addChatWindow: function() {
      this.props.onAdd();
    },

    render: function() {
      return (
        <div className='windows-container'>
          <AddButton onClick={this.addChatWindow}/>
          { this.props.chatWindows.map(function(index) {
            return <ChatContainer stream={this.props.stream} key={index} id={index}/>;
          }.bind(this)) }
        </div>
        );
    }

  });
  global.App = App;
}(window));

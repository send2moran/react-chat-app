/**
 * chat frame - iframe component
 * @property {function} onUpdate
 * @property {number} id
 * @property {array} stream
 */
(function(global, undefined) {
  var ChatFrame = React.createClass({
    componentDidMount: function() {
      var s = React.findDOMNode(this);
    },

    componentWillReceiveProps: function(nextProps) {
      this.props.onUpdate(this, nextProps.stream);
    },

    render: function() {
      return (<iframe id={'chat-frame-' + this.props.id} ref='chatFrame' src='chat-room.html'/>);
    }

  });
  global.ChatFrame = ChatFrame;
}(window));

/**
 * chat container encapsulate Draggable component and chat updates logic
 */
(function(global, undefined) {

  var Draggable = global.ReactDraggable;
  var ChatFrame = global.ChatFrame;
  var ChatContainer = React.createClass({

    getInitialState: function() {
      return {
        position: {
          top: 0,
          left: 0
        },
        activeDrags: 0
      };
    },

    handleDrag: function(e, ui) {
      this.setState({
        position: ui.position
      });
    },

    onStart: function(event) {
      event.preventDefault();
      this.setState({
        activeDrags: ++this.state.activeDrags
      });
    },

    onStop: function() {
      this.setState({
        activeDrags: --this.state.activeDrags
      });
    },

    onUpdate: function(iframe, stream){
      iframe.getDOMNode().contentWindow.postMessage({
        stream: stream
      }, '*');
    },

    render: function() {

      var drags = {
        onStart: this.onStart,
        onStop: this.onStop
      };

      return (
        <Draggable start={{x: (200 * this.props.id) + 20 , y: (20 * this.props.id) + 20 }} zIndex={100} bounds='parent' {...drags}>
          <div className='chat-frame-container box no-cursor'>
            <strong className='chat-frame-handle'></strong>
            <ChatFrame onUpdate={this.onUpdate} className='chat-frame' stream={this.props.stream} id={this.props.id}/>
          </div>
        </Draggable>
        );
    }

  });
  global.ChatContainer = ChatContainer;
}(window));

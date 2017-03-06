(function(global, undefined) {
  var chatContainer = document.getElementById('chat-room-container');
  var ChatRoomContainer = global.ChatRoomContainer;
  React.render(<ChatRoomContainer/>, chatContainer);
}(window));

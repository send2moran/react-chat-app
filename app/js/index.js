(function(global, undefined) {
  var chatContainer = document.getElementById('chat-app-container');
  var AppContainer = global.AppContainer
  React.render(<AppContainer/>, chatContainer);
}(window));

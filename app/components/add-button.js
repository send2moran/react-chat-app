/**
 * add button component - trigger onClick handler
 *
 * @property {function} onClick
 */
(function(global, undefined) {
  var AddButton = React.createClass({

    addChat: function() {
      this.props.onClick();
    },

    render: function() {
      return (<div><input className='add-button' type='button' value='+' onClick={this.addChat}/></div>);
    }

  });
  global.AddButton = AddButton;
}(window));

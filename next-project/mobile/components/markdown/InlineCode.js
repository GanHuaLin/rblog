export default (props) => {
  let render = null;
  if (props.inline) {
    render = <code className='inline'>{props.children}</code>
  } else {
    render = <code>{props.children}</code>
  }

  return render
};

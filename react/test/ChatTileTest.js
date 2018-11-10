import ChatTile from '../../react/src/components/ChatTile';

describe('Chat', () => {
  let id,
      title,
      wrapper,
      onClick;


  beforeEach(()=> {
    onClick = jasmine.createSpy('onClick spy');
    wrapper = mount(
      <ChatTile
        id="1"
        title="abc"
        onClick={onClick}
      />
    );
  });

  it('should render a "Link" tag', () => {
    // const link = wrapper.find('Link')
    // console.log(link.debug())
    expect(wrapper.find('Link')).toBePresent();
  });

  it('should render an "Link" tag with the link to', () => {
    expect(wrapper.find('Link').props().to).toBe('/chats/1');
  });

  it('should render an "Link" tag with the text property value', () => {
    // expect(wrapper.props().title).toBe('abc');
    expect(wrapper.find('Link').text()).toBe('Chatroom: abc');
  });

  // it('should invoke the onClick function from props when clicked', () => {
  //   wrapper.find('.fa').simulate('click');
  //   expect(onClick).toHaveBeenCalled();
  // });
});

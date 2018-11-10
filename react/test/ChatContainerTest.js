import ChatContainer from "../src/containers/ChatContainer"
import ChatTileContainer from '../src/containers/ChatTileContainer';
import NewChatFormContainer from '../src/containers/NewChatFormContainer';
import UserIndexContainer from '../src/containers/UserIndexContainer';
import fetchMock from 'fetch-mock';

describe ('Chat Container', () => {
  let users,
      current_user,
      general_chats,
      private_chats,
      wrapper;

  let addChatRoom,
      deleteChatRoom,
      onClick,
      usernameHandles;

  beforeEach(() => {
    jasmineEnzyme();
    onClick = jasmine.createSpy('onClick spy');
    spyOn(ChatContainer.prototype, 'addChatRoom').and.callThrough();
    users = [
      { id: 1, username: "John", icon_num: "1" },
      { id: 2, username: "Shiela", icon_num: "2"}
    ]

    current_user = [ users[0] ]

    general_chats = [{
      id: 1,
      title: 'Chatroom: xyz',
      // created_at: "2018-10-10T19:01:29.908Z",
      chatroom_users: [
        { id: 1, user: users[0] }
      ]
    }]

    private_chats = [{
      id: 2,
      title: 'Chatroom: private',
      chatroom_users: [
        { id: 2, user: users[1] }
      ]
    }]

    fetchMock.get(`/api/v1/chats`, {
      status: 200,
      body: {
        general_chats: general_chats,
        private_chats: private_chats,
        current_user: current_user
      }
    });
    fetchMock.get('/api/v1/users', {
      status: 200,
      body: {
        users: users
      }
    });

    // fetchMock.get('/api/v1/users', {
    //   status: 200,
    //   credentials: 'include',
    //   body: {
    //     users: users
    //   }
    // }), { overwriteRoutes: false };

    wrapper = mount(<ChatContainer />);
  });

  afterEach(fetchMock.restore);

  // describe('ChatContainer', () => {
  //   it('should have the specified initial state', (done) => {
  //     setTimeout(() =>{
  //       expect(wrapper.state()).toEqual({
  //         generalChats: [],
  //         privateChats: [],
  //         users: [],
  //         currentUser: null
  //        });
  //     }, 0)
  //   })
  // });

  describe('ChatContainer', () => {
    it('ChatTileContainer is present', (done) => {
      setTimeout(() => {
        // debugger
        // console.log(wrapper)
        expect(wrapper.find(ChatTileContainer)).toBePresent();
        done()
      }, 0)
    });

    // it('should render an ChatTileContainer Component', () => {
    //   expect(wrapper.find(ChatTileContainer)).toBePresent();
    // });

    it('ChatTileContainer is receiving the correct props', (done) => {
      setTimeout(() => {
        expect(wrapper.find(ChatTileContainer).props()).toEqual({
          generalChats: general_chats,
          privateChats: private_chats,
          deleteChatRoom: jasmine.any(Function),
          currentUser: current_user[0],
          users: users
        });
        done()
      }, 0)
    });

    it('UserIndexContainer is present', (done) => {
      setTimeout(() => {
        expect(wrapper.find(UserIndexContainer)).toBePresent();
        done()
      }, 0)
    });

    it('UserIndexContainer is receiving the correct props', (done) => {
      setTimeout(() => {
        expect(wrapper.find(UserIndexContainer).props()).toEqual({
          users: users,
          addChatRoom: jasmine.any(Function),
          privateChatTitles: [private_chats[0].title]
        });
        done()
      }, 0)
    });

    it('NewChatFormContainer is present', (done) => {
      setTimeout(() => {
        expect(wrapper.find(NewChatFormContainer)).toBePresent();
        done()
      }, 0)
    });

    it('NewChatFormContainer is receiving the correct props', (done) => {
      setTimeout(() => {
        expect(wrapper.find(NewChatFormContainer).props()).toEqual({
          addChatRoom: jasmine.any(Function),
          privateChatTitles: [private_chats[0].title],
          generalChatTitles: [general_chats[0].title]
        });
        done()
      }, 0)
    });
  });
});

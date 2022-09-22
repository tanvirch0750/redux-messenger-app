import { useSelector } from 'react-redux';
import { useGetConversationsQuery } from '../../features/conversations/conversationsApi';
import ChatItem from './ChatItem';
import Error from '../ui/Error';
import moment from 'moment';
import getPartnerInfo from '../../utils/getPartnerInfo';
import gravatarUrl from 'gravatar-url';
import { Link } from 'react-router-dom';

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);

  // decide what to render
  let content = null;
  if (isLoading) content = <li className="m-2 text-center">Loading...</li>;
  if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  }

  if (!isLoading && !isError && conversations?.length === 0) {
    content = (
      <li className="m-2 text-center">
        <Error message="No conversations found" />
      </li>
    );
  }

  if (!isLoading && !isError && conversations?.length > 0) {
    content = (
      <li>
        {conversations.map((conversation) => {
          const { id, message, timestamp, users } = conversation;

          const { name, email: partnerEmail } = getPartnerInfo(users, email);
          return (
            <Link to={`/inbox/${id}`}>
              <ChatItem
                key={id}
                avatar={gravatarUrl(partnerEmail, { size: 80 })}
                name={name}
                lastMessage={message}
                lastTime={moment(timestamp).fromNow()}
              />
            </Link>
          );
        })}
      </li>
    );
  }

  return <ul>{content}</ul>;
}

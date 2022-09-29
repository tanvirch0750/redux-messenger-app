// import Blank from "./Blank";
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../../features/messages/messagesApi';
import ChatHead from './ChatHead';
import Messages from './Messages';
import Options from './Options';
import Error from '../../ui/Error';

export default function ChatBody() {
  const { id } = useParams();
  const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

  // decide what to render
  let content = null;
  if (isLoading) content = <div className="m-2 text-center">Loading...</div>;
  if (!isLoading && isError) {
    content = (
      <div className="m-2 text-center">
        <Error message={error?.data} />
      </div>
    );
  }

  if (!isLoading && !isError && messages?.length === 0) {
    content = (
      <li className="m-2 text-center">
        <Error message="No messages found" />
      </li>
    );
  }

  if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead message={messages[0]} />
        <Messages messages={messages} />
        <Options info={messages[0]} />
      </>
    );
  }

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        {content}
        {/* <Blank /> */}
      </div>
    </div>
  );
}

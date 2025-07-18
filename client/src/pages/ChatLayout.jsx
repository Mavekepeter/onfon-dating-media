
import Chatsidebar from '../components/Chatsidebar'
import Chatheader from '../components/Chatheader'
import Chatbody from '../components/Chatbody'

const ChatLayout = () => {
  
  return (
    <div className="h-screen mt-10 flex overflow-hidden">
      {/* Sidebar */}
      <Chatsidebar/>
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
       <Chatheader/>
        <Chatbody/>
      </div>
    </div>
  )
}

export default ChatLayout

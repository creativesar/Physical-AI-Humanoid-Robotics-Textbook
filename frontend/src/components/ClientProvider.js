import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import ChatbotProvider from './Chatbot/ChatbotProvider';
import { AuthProvider } from './Auth/BetterAuth';

export default function GlobalProviders({ children }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      {children}
      <ChatbotProvider />
    </AuthProvider>
  );
}
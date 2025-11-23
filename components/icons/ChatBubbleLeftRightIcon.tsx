
import React from 'react';

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.23c-1.09.083-2.037-.621-2.453-1.618l-.73-1.739a6.75 6.75 0 00-13.163 0l-.73 1.739c-.416.997-1.363 1.701-2.453-1.618l-3.72-.23A2.25 2.25 0 010 15v-4.286c0-.97.616-1.813 1.5-2.097l3.72-.23c1.09-.083 2.037.621 2.453 1.618l.73 1.739a6.75 6.75 0 0013.163 0l.73-1.739c.416-.997 1.363-1.701 2.453-1.618l3.72.23z" />
    </svg>
);

export default ChatBubbleLeftRightIcon;
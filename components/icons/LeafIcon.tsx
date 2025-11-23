
import React from 'react';

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-10.5c0-.414.336-.75.75-.75H15M6 18.75a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75V9.75c0-.414.336-.75.75-.75H5.25m1.5 9.75a.75.75 0 01.75.75H8.25a.75.75 0 01.75-.75v-1.5a.75.75 0 00-.75-.75H6m6-1.5l2.25-2.25 2.25 2.25m-4.5 4.5l2.25-2.25 2.25 2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

export default LeafIcon;

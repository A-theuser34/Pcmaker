import React from 'react';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 ">
      <div className="text-3xl font-bold mb-4 text-yellow-200">Wassup,</div>
      <div className="text-3xl font-bold mb-4 text-white">Thanks for submitting a form!</div>
      <div className="text-3xl font-bold mb-4 text-white">
        It will be reviewed by me <span role="img" aria-label="cool-glasses">😎</span>
      </div>
    </div>
  );
}

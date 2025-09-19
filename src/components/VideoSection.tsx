import React from 'react';

function VideoSection() {
  return (
    <div className="my-2.5 flex justify-center">
      <div className="relative aspect-[16/9] bg-neutral-200 w-full max-w-[614px] rounded-2xl border border-neutral-700 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <wistia-player
          media-id="n35oqfnoo2"
          seo="false"
          aspect="1.7777777777777777"
        ></wistia-player>
      </div>
    </div>
  );
}

export default VideoSection;
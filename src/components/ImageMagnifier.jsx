import React, { useState, useRef } from 'react';

const ImageMagnifier = ({
  src,
  alt,
  zoom = 3,
  lensSize = 140
}) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const cRect = container.getBoundingClientRect();
    const iRect = img.getBoundingClientRect();

    // cursor position relative to image (NOT container)
    const x = e.clientX - iRect.left;
    const y = e.clientY - iRect.top;

    // ignore when cursor is outside actual image
    if (x < 0 || y < 0 || x > iRect.width || y > iRect.height) {
      setShow(false);
      return;
    }

    setShow(true);
    setPos({
      x,
      y,
      cx: e.clientX - cRect.left,
      cy: e.clientY - cRect.top
    });

    setImgDim({
      w: iRect.width,
      h: iRect.height
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square bg-white border rounded-xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShow(false)}
    >
      {/* Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain p-4 select-none"
      />

      {/* Lens */}
      {show && (
        <div
          className="pointer-events-none absolute rounded-full border border-black/40 shadow-xl"
          style={{
            width: lensSize,
            height: lensSize,
            top: pos.cy - lensSize / 2,
            left: pos.cx - lensSize / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',

            // IMPORTANT: scale based on actual image size
            backgroundSize: `${imgDim.w * zoom}px ${imgDim.h * zoom}px`,

            backgroundPosition: `
              ${-(pos.x * zoom) + lensSize / 2}px
              ${-(pos.y * zoom) + lensSize / 2}px
            `,

            backgroundColor: '#000'
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;

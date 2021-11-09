import React from 'react';

const WebpImage = ({
    src,
    fallback,
    type = 'image/webp',
    ...delegated
  }) => {
    return (
        <picture>
            <source srcSet={src} type={type} />
            <img src={fallback} {...delegated} />
        </picture>
    )
}

export default WebpImage;
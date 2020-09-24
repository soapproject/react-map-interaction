import React from 'react';
import MapInteraction from './MapInteraction';

/*
  This component provides a map like interaction to any content that you place in it. It will let
  the user zoom and pan the children by scaling and translating props.children using css.
*/
const MapInteractionCSS = (props) => {
  const getCursorStyle = () => {
    if(props.status === 'drawing')
      return 'crosshair'
    else if(props.status === 'viewing')
      return 'all-scroll'
    else
      return 'default'
  }
  return (
    <MapInteraction {...props}>
      {
        ({ translation, scale }) => {
          // Translate first and then scale.  Otherwise, the scale would affect the translation.
          const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
          return (
            <div className='MapInteraction-wrapp'
              style={{
                height: '100%',
                width: '100%',
                position: 'relative', // for absolutely positioned children
                overflow: 'hidden',
                touchAction: 'none', // Not supported in Safari :(
                msTouchAction: 'none',
                cursor: getCursorStyle(),
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            >
              <div className='MapInteraction-inline'
                style={{
                  display: 'inline-block', // size to content
                  transform: transform,
                  transformOrigin: '0 0 '
                }}
              >
                {props.children}
              </div>
            </div>
          );
        }
      }
    </MapInteraction>
  );
};

export default MapInteractionCSS;

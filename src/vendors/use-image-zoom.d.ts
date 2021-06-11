import { Ref } from 'react';
import { ImageZoomOpts } from './image-zoom';
interface UseImageZoom extends ImageZoomOpts {
    (opts?: ImageZoomOpts): {
        ref: Ref<HTMLImageElement>;
    };
}
declare const useImageZoom: UseImageZoom;
export default useImageZoom;

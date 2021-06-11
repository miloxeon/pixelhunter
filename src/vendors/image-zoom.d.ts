import 'focus-options-polyfill';
export interface ImageZoomOpts {
    closeText?: string;
    isControlled?: boolean;
    modalText?: string;
    onZoomChange?: (isZoomed: boolean) => void;
    openText?: string;
    overlayBgColor?: string;
    overlayOpacity?: number;
    transitionDuration?: number;
    zoomMargin?: number;
    zoomZindex?: number;
}
export interface ImageZoomUpdateOpts extends ImageZoomOpts {
    isZoomed?: boolean;
}
interface Update {
    (opts?: ImageZoomUpdateOpts): void;
}
export interface ImageZoomReturnType {
    cleanup: () => void;
    update: Update;
}
declare const ImageZoom: ({ closeText, isControlled, modalText, onZoomChange, openText, overlayBgColor, overlayOpacity, transitionDuration: _transitionDuration, zoomMargin, zoomZindex, }: ImageZoomOpts | undefined, targetEl: HTMLElement) => ImageZoomReturnType;
export default ImageZoom;

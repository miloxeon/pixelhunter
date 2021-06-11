import { useRef, useEffect } from 'react';
import ImageZoom from './image-zoom';

var useImageZoom = function (opts) {
    var ref = useRef(null);
    var savedOpts = useRef(opts);
    var imgZoom = useRef();
    useEffect(function () {
        var _a;
        savedOpts.current = opts;
        (_a = imgZoom.current) === null || _a === void 0 ? void 0 : _a.update(savedOpts.current);
    }, [opts]);
    useEffect(function () {
        var el = ref.current;
        if (!el)
            return;
        imgZoom.current = ImageZoom(savedOpts.current, el);
        return function () {
            var _a;
            (_a = imgZoom.current) === null || _a === void 0 ? void 0 : _a.cleanup();
        };
    }, []);
    return { ref: ref };
};

export default useImageZoom

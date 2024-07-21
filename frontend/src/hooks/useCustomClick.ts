import useDoubleClick from "use-double-click";

const useCustomClick = ({ref, handleSingleClick = () => { }, handleDoubleClick = () => { }}: UseCustomClickProps) => {
  useDoubleClick({
    onSingleClick: () => {
      handleSingleClick()
      // if (isPreview) return;
      // setIsControlsVisible(!isControlsVisible);
    },
    onDoubleClick: () => {
      handleDoubleClick()
      // if (isPreview) return;
      // setIsPlaying(!isPlaying);
    },
    ref: ref,
    latency: 250,
  });
}

export default useCustomClick
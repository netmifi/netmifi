import { Button } from "./ui/button";

const ShareComponent = ({
  child,
  url,
  title,
  text,
  files,
}: ShareComponentProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
          files: files,
        });
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <Button variant={"transparent"} asChild onClick={handleShare}>
      {child}
    </Button>
  );
};

export default ShareComponent;

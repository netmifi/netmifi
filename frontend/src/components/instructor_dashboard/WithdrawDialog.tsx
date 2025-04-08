import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const WithdrawDialog = ({ trigger }: { trigger: JSX.Element }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get Instant Cashout</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;

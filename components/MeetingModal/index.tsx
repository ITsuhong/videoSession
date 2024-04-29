import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface meetingModalProp {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText?: string;
  handleClick: () => void;
  children?: React.ReactNode;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  handleClick,
  children,
}: meetingModalProp) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-1 text-white border-none">
        <div className="text-2xl font-bold leading-[42px flex justify-center">
          {title}
        </div>
        {children}
        <Button
          className={
            'bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
          }
          onClick={handleClick}
        >
          &nbsp;
          {buttonText || 'Schedule Meeting'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default MeetingModal;

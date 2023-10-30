import { useLocation, useNavigate } from '@remix-run/react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent
} from '~/components/ui/dialog';

export default function InvitationDialog() {
  const { hash } = useLocation();
  const navigation = useNavigate();
  const isOpen = hash === '#invitations';
  return (
    <Dialog open={isOpen} onOpenChange={() => navigation({ hash: '' })}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

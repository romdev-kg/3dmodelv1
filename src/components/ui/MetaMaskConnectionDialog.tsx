import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useConnect } from 'wagmi'
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'


interface MetaMaskConnectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConnect: (connector: any) => void;
    children: (props: { isLoading: boolean }) => React.ReactNode;
  }
  
  
 export const MetaMaskConnectionDialog: React.FC<MetaMaskConnectionDialogProps> = (props) => {
    const { connectAsync, connectors } = useConnect();
    const [isPending, setIsPending] = useState(false);
  
    const handleConnect = async (connector: any) => {
      setIsPending(true);
      try {
        await connectAsync({ connector });
        props.onConnect(connector);
        props.onOpenChange(false);
      } catch (error) {
        console.error('Failed to connect:', error);
      } finally {
        setIsPending(false);
      }
    };
  
    return (
      <Dialog open={props.open} onOpenChange={() => props.onOpenChange(false)}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:top-70">
          <DialogHeader>
            <DialogTitle>Wallet</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            {isPending ? (
              <div className="loader loader--style3 flex justify-center" title="2">
                {/* SVG Loader */}
              </div>
            ) : (
              connectors.map((connector) => (
                <Button
                  key={connector.id}
                  onClick={() => handleConnect(connector)}
                  className="w-full mb-3"
                >
                  <img src="metamask-icon.svg" alt="MetaMask Icon" className="inline-block w-6 h-6 mr-2" />
                  {connector.name === 'WalletConnect' ? 'QR MetaMask' : 'MetaMask'}
                </Button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
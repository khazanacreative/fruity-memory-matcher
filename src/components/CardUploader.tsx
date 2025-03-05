
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Upload, X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CardUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCards: (customCards: CustomCardImage[]) => void;
}

export interface CustomCardImage {
  id: number;
  url: string;
  name: string;
}

const CardUploader: React.FC<CardUploaderProps> = ({ isOpen, onClose, onSaveCards }) => {
  const [customCards, setCustomCards] = useState<CustomCardImage[]>([]);
  const [currentName, setCurrentName] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload only image files');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const newCard: CustomCardImage = {
          id: Date.now(),
          url: event.target.result.toString(),
          name: currentName || `Card ${customCards.length + 1}`
        };
        
        setCustomCards([...customCards, newCard]);
        setCurrentName('');
        toast.success('Card added successfully');
      }
    };
    
    reader.readAsDataURL(file);
  };
  
  const removeCard = (id: number) => {
    setCustomCards(customCards.filter(card => card.id !== id));
    toast.info('Card removed');
  };
  
  const handleSave = () => {
    if (customCards.length < 2) {
      toast.error('Please add at least 2 cards');
      return;
    }
    
    // Only send up to 25 cards (for 25 pairs)
    const finalCards = customCards.slice(0, 25);
    onSaveCards(finalCards);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Upload Custom Cards
          </DialogTitle>
          <DialogDescription className="text-center">
            Upload your own images to create custom cards. Add up to 25 images for 25 pairs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 my-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Card name"
                className="flex-1 h-10 rounded-md border border-input px-3 py-2"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <Button variant="outline" className="h-10">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Added {customCards.length}/25 cards
            </div>
          </div>
          
          {customCards.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
              {customCards.map((card) => (
                <div key={card.id} className="relative group rounded-md border overflow-hidden">
                  <img 
                    src={card.url} 
                    alt={card.name}
                    className="w-full h-24 object-contain"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      className="p-1 rounded-full bg-white text-red-500"
                      onClick={() => removeCard(card.id)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-1 text-xs truncate bg-background border-t">
                    {card.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSave} 
            disabled={customCards.length < 2}
            className="w-full gap-2"
          >
            <Check className="w-4 h-4" />
            Save and Use Custom Cards
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardUploader;

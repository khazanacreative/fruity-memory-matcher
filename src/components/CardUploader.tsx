
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Upload, X, Check, Trash2 } from 'lucide-react';
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
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} bukan file gambar`);
        return false;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} melebihi batas ukuran 5MB`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length === 0) return;
    
    // Process each valid file
    let processedCount = 0;
    const totalFiles = validFiles.length;
    
    validFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const newCard: CustomCardImage = {
            id: Date.now() + index,
            url: event.target.result.toString(),
            name: currentName || `Kartu ${customCards.length + index + 1}`
          };
          
          setCustomCards(prev => [...prev, newCard]);
          processedCount++;
          
          if (processedCount === totalFiles) {
            toast.success(`${totalFiles} kartu berhasil ditambahkan`);
            setCurrentName('');
          }
        }
      };
      
      reader.readAsDataURL(file);
    });
  };
  
  const removeCard = (id: number) => {
    setCustomCards(customCards.filter(card => card.id !== id));
    toast.info('Kartu dihapus');
  };
  
  const clearAllCards = () => {
    if (customCards.length > 0) {
      setCustomCards([]);
      toast.info('Semua kartu dihapus');
    }
  };
  
  const handleSave = () => {
    if (customCards.length < 2) {
      toast.error('Silakan tambahkan minimal 2 kartu');
      return;
    }
    
    // Increase limit to 36 pairs
    const finalCards = customCards.slice(0, 36);
    onSaveCards(finalCards);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Unggah Kartu Kustom
          </DialogTitle>
          <DialogDescription className="text-center">
            Unggah gambar Anda sendiri untuk membuat kartu kustom. Tambahkan hingga 36 gambar untuk 36 pasangan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 my-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Nama umum untuk kartu (opsional)"
                className="flex-1 h-10 rounded-md border border-input px-3 py-2"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <Button variant="outline" className="h-10">
                  <Upload className="w-4 h-4 mr-2" />
                  Unggah
                </Button>
              </div>
              {customCards.length > 0 && (
                <Button 
                  variant="outline" 
                  className="h-10 text-destructive hover:text-destructive"
                  onClick={clearAllCards}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground flex justify-between">
              <span>Ditambahkan {customCards.length}/36 kartu</span>
              <span className="text-xs">(Klik pada "Unggah" untuk memilih beberapa file)</span>
            </div>
          </div>
          
          {customCards.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
              {customCards.map((card) => (
                <div key={card.id} className="relative group rounded-md border overflow-hidden">
                  <img 
                    src={card.url} 
                    alt={card.name}
                    className="w-full h-24 object-cover"
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
            Simpan dan Gunakan Kartu Kustom
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardUploader;

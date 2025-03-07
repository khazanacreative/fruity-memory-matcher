
import React from 'react';
import GameBoard from '@/components/GameBoard';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-start">
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Permainan Kartu Memori
          </span>
        </h1>
        <p className="mt-3 text-gray-500 text-center max-w-xl">
          Cocokkan pasangan kartu untuk memenangkan permainan. Main dengan 2-3 pemain dan bergiliran mencari pasangan kartu yang cocok.
          Pilih dari kartu ikon (24 pasang), kartu alfabet (A-Z), kartu angka (12-36), atau unggah hingga 36 gambar khusus!
        </p>
      </header>
      
      <main className="w-full flex-1 flex flex-col">
        <GameBoard />
      </main>
      
      <footer className="w-full py-4 text-center text-gray-500 text-sm">
        <p>Bergiliran untuk menemukan semua pasangan dan menang! Gunakan kartu alfabet, kartu angka, atau unggah beberapa gambar khusus untuk keseruan lebih.</p>
      </footer>
    </div>
  );
};

export default Index;

import React from 'react';
import { NavBar } from "../../components/Nav-bar";
import MyPageContent from '../../components/account/MyPageContent';

export default function MyPage() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <MyPageContent />
      </div>
    </main>
  );
}
import { NavBar } from '../../../components/Nav-bar';
import { ForgotPasswordForm } from '../../modules/Forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-traveling-bg">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}

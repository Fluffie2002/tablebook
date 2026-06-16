'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-12">
      <Card className="w-full max-w-md p-8 shadow-2xl shadow-slate-950/10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Account recovery</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Enter your email and TableBook will send a recovery link.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            toast.success('Password reset instructions sent');
          }}
        >
          <Input placeholder="Email" type="email" required />
          <Button className="w-full">Send reset link</Button>
        </form>
        <Link href="/login" className="mt-6 block text-sm font-medium text-slate-950">Back to login</Link>
      </Card>
    </main>
  );
}

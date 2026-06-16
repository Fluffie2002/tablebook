'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/auth-context';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-[#0a2540] p-12 lg:flex">
        <p className="text-lg font-semibold text-white">TableBook</p>
        <p className="max-w-sm text-lg leading-relaxed text-[#a3b4c6]">
          Create an account to book tables, manage reservations, and receive confirmations instantly.
        </p>
        <p className="text-xs text-[#697386]">© TableBook</p>
      </div>
      <main className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-[#0a2540]">Create account</h1>
          <p className="mt-2 text-sm text-[#697386]">Start booking at restaurants across Malaysia.</p>
          <form
            className="mt-8 space-y-4"
            onSubmit={form.handleSubmit(async (values) => {
              await register(values.name, values.email, values.password);
              toast.success('Account created');
              router.push('/restaurants');
            })}
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0a2540]">Full name</label>
              <Input {...form.register('name')} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0a2540]">Email</label>
              <Input type="email" {...form.register('email')} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0a2540]">Password</label>
              <Input type="password" {...form.register('password')} />
            </div>
            <Button className="w-full" type="submit">Create account</Button>
          </form>
          <p className="mt-6 text-sm text-[#697386]">
            Already have an account? <Link href="/login" className="font-medium text-[#0ea5e9] hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

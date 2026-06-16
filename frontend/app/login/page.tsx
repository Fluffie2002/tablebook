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
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-[#0a2540] p-12 lg:flex">
        <p className="text-lg font-semibold text-white">TableBook</p>
        <div>
          <blockquote className="text-2xl font-medium leading-relaxed text-white/90">
            &ldquo;We cut reservation handling time in half and finally have visibility into peak makan hours across our outlets.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-[#a3b4c6]">— Operations lead, Klang Valley restaurant group</p>
        </div>
        <p className="text-xs text-[#697386]">© TableBook</p>
      </div>

      <main className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-[#0a2540]">Sign in</h1>
          <p className="mt-2 text-sm text-[#697386]">Access your reservations and operator dashboard.</p>
          <form
            className="mt-8 space-y-4"
            onSubmit={form.handleSubmit(async (values) => {
              const user = await login(values.email, values.password);
              toast.success(`Welcome back, ${user.name}`);
              router.push(user.role === 'ADMIN' ? '/admin' : '/restaurants');
            })}
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0a2540]">Email</label>
              <Input type="email" placeholder="you@company.com" {...form.register('email')} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0a2540]">Password</label>
              <Input type="password" placeholder="••••••••" {...form.register('password')} />
            </div>
            <Button className="w-full" type="submit">Continue</Button>
          </form>
          <div className="mt-6 flex justify-between text-sm">
            <Link href="/register" className="font-medium text-[#0ea5e9] hover:underline">Create account</Link>
            <Link href="/forgot-password" className="text-[#697386] hover:text-[#0a2540]">Forgot password?</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

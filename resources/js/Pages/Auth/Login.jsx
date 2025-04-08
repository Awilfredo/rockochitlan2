import AppLogo from '@/Components/Icons/AppLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Log in" />
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 backdrop-blur-sm p-8 shadow-2xl border border-gray-700">
                <div>
                    <Link href={route('home')} className="flex justify-center">
                        <AppLogo className="h-16 w-16 text-white hover:text-blue-400 transition-colors duration-200" />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-bold text-white">
                        Iniciar Sesión
                    </h2>
                    {status && (
                        <div className="mb-4 text-sm font-medium text-gray-300">
                            {status}
                        </div>
                    )}
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="text-gray-700"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-gray-700"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-200">
                                Remember me
                            </span>
                        </label>

                        {/* {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                Forgot your password?
                            </Link>
                        )} */}
                    </div>

                    <div>
                        <PrimaryButton
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            disabled={processing}
                        >
                            {processing
                                ? 'Iniciando sesión...'
                                : 'Iniciar Sesión'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

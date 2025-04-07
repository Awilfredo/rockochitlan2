import DeleteButton from '@/Components/Buttons/DeleteButton';
import SimpleImageEditor from '@/Components/SimpleImageEditor';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { se } from 'date-fns/locale';
import { Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Create = ({ banners }) => {
    const [image, setImage] = useState('');
    const [procesando, setprocesando] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        section: 'banner',
        alt_text: '',
        position: '',
    });
    const handleSubmit = (e) => {
        setprocesando(true);
        e.preventDefault();

        if (!image || !image.blob) {
            return Swal.fire({
                title: 'Alerta!',
                text: 'No has seleccionado una imagen o no has guardado los cambios de la edición.',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3B82F6',
                timer: '3000',
            });
        }

        const formData = new FormData();
        formData.append('file', image.blob, 'cropped-image.webp');
        formData.append('section', data.section);
        formData.append('alt_text', data.alt_text);
        formData.append('position', data.position);

        // Debug log
        console.log('FormData contents:', Object.fromEntries(formData));

        router.post(route('images.store'), formData, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImage('');
                Swal.fire({
                    title: 'Éxito!',
                    text: 'La imagen se ha guardado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3B82F6',
                    timer: '3000',
                });
            },
            onFinish: () => {
                setprocesando(false);
                },
        });
        
    };

    const handleDelete = (id) => {
        router.visit(route('images.destroy', id), {
            method: 'DELETE',
            preserveScroll: true,
            onFinish: () => {
                Swal.fire({
                    title: 'Éxito!',
                    text: 'La imagen se ha eliminado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3B82F6',
                    timer: '3000',
                });
            },
        });
    };

    return (
        <DefaultLayout>
            <Head title="Nueva Imagen" />

            <div className="mb-6 flex w-full flex-wrap items-center justify-center px-5">
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Banners
                </h2>
                <div className="flex w-full flex-wrap gap-4 md:grid md:grid-cols-2">
                    {banners.map((banner, index) => (
                        <div key={index} className="relative">
                            <div className="absolute right-0 top-0 p-2">
                                <DeleteButton
                                    onClick={() => handleDelete(banner.id)}
                                ></DeleteButton>
                            </div>
                            <img
                                src={`/storage/${banner.file_path}`}
                                alt={banner.alt_text}
                                className="mx-auto h-auto"
                            />
                        </div>
                    ))}
                </div>

                <div className="p-6">
                    <div className="mx-auto max-w-2xl">
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                { !procesando &&
                                    <SimpleImageEditor
                                    croppedImage={image}
                                    setCroppedImage={setImage}
                                    aspect={21 / 9}
                                ></SimpleImageEditor>
                            }
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">
                                    {errors.image}
                                    </p>
                                )}

                                {/* <div>
                                    <Label htmlFor="section" value="Sección" />
                                    <Select
                                        id="section"
                                        value={data.section}
                                        onChange={(e) =>
                                            setData('section', e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Selecciona una sección
                                        </option>
                                        <option value="banner">Banner</option>
                                        <option value="gallery">Galería</option>
                                        <option value="about">
                                            Sobre Nosotros
                                        </option>
                                    </Select>
                                    {errors.section && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.section}
                                        </p>
                                    )}
                                </div> */}

                                <div>
                                    <Label
                                        htmlFor="alt_text"
                                        value="Texto Alternativo"
                                    />
                                    <TextInput
                                        id="alt_text"
                                        value={data.alt_text}
                                        onChange={(e) =>
                                            setData('alt_text', e.target.value)
                                        }
                                    />
                                    {errors.alt_text && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.alt_text}
                                        </p>
                                    )}
                                </div>
                                {/* 
                                <div>
                                    <Label
                                        htmlFor="position"
                                        value="Posición"
                                    />
                                    <TextInput
                                        id="position"
                                        type="number"
                                        value={data.position}
                                        onChange={(e) =>
                                            setData('position', e.target.value)
                                        }
                                    />
                                    {errors.position && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.position}
                                        </p>
                                    )}
                                </div> */}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Create;

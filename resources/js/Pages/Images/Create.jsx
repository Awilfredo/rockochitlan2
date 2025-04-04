import SimpleImageEditor from '@/Components/SimpleImageEditor';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, Label, TextInput, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';

const Create = () => {
    const [image, setImage] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        file: null,
        section: '',
        alt_text: '',
        position: '',
    });

    useEffect(() => {
        if (image) {
            // Convert Blob to File object
            const blobToFile = new File([image], 'image.jpg', { type: 'image/jpeg' });
            setData('file', blobToFile);
        }
    }, [image]);

    useEffect(() => {
        console.log(data.file);
    }, [data.file]);
    // Remove console.log useEffect

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('images.store'));
    };

    return (
        <DefaultLayout>
            <Head title="Nueva Imagen" />

            <div className="p-6">
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <SimpleImageEditor
                                croppedImage={image}
                                setCroppedImage={setImage}
                                aspect={16 / 9}
                            ></SimpleImageEditor>

                            <div>
                                <Label htmlFor="section" value="Sección" />
                                <Select
                                    id="section"
                                    value={data.section}
                                    onChange={e => setData('section', e.target.value)}
                                >
                                    <option value="">Selecciona una sección</option>
                                    <option value="banner">Banner</option>
                                    <option value="gallery">Galería</option>
                                    <option value="about">Sobre Nosotros</option>
                                </Select>
                                {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
                            </div>

                            <div>
                                <Label htmlFor="alt_text" value="Texto Alternativo" />
                                <TextInput
                                    id="alt_text"
                                    value={data.alt_text}
                                    onChange={e => setData('alt_text', e.target.value)}
                                />
                                {errors.alt_text && <p className="mt-1 text-sm text-red-600">{errors.alt_text}</p>}
                            </div>

                            <div>
                                <Label htmlFor="position" value="Posición" />
                                <TextInput
                                    id="position"
                                    type="number"
                                    value={data.position}
                                    onChange={e => setData('position', e.target.value)}
                                />
                                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                            </div>

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
        </DefaultLayout>
    );
};

export default Create;
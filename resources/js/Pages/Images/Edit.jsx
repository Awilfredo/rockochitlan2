import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, Label, TextInput, Select } from 'flowbite-react';

const Edit = ({ image }) => {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        file: null,
        section: image.section,
        alt_text: image.alt_text,
        position: image.position,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('images.update', image.id));
    };

    return (
        <DefaultLayout>
            <Head title="Editar Imagen" />

            <div className="p-6">
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <div className="mb-6">
                            <img
                                src={`/storage/${image.file_path}`}
                                alt={image.alt_text}
                                className="h-48 w-full object-contain"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="file" value="Nueva Imagen (opcional)" />
                                <input
                                    id="file"
                                    type="file"
                                    onChange={e => setData('file', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                />
                                {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                            </div>

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
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Edit;
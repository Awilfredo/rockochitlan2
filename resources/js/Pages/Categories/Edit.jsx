import EditIcon from '@/Components/Icons/EditIcon';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import Swal from 'sweetalert2';

export default function Edit({ categories }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingSubcategory, setEditingSubcategory] = useState(null);
    const categoryFormRef = useRef(null);
    const subcategoryFormRef = useRef(null);

    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        description: '',
        category_id: '',
    });

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('categories.update', editingCategory.id), {
                onSuccess: () => {
                    reset();
                    setEditingCategory(null);
                },
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleSubcategorySubmit = (e) => {
        e.preventDefault();
        if (editingSubcategory) {
            put(route('subcategories.update', editingSubcategory.id), {
                onSuccess: () => {
                    reset();
                    setEditingSubcategory(null);
                },
            });
        } else {
            post(route('subcategories.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const scrollToForm = (formRef) => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleCancel = () => {
        reset();
        setEditingCategory(null);
        setEditingSubcategory(null);
    };

    return (
        <DefaultLayout>
            <Head title="Editar Categorías" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Categories Section */}
                        <Card>
                            <h2 className="mb-4 text-xl font-bold">
                                Categorías
                            </h2>
                            <form
                                ref={categoryFormRef}
                                onSubmit={handleCategorySubmit}
                                className="mb-6 space-y-4"
                            >
                                <div>
                                    <Label htmlFor="name" value="Nombre" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="description"
                                        value="Descripción"
                                    />
                                    <textarea
                                        className="w-full rounded-lg border-gray-300"
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        {editingCategory
                                            ? 'Actualizar'
                                            : 'Crear'}{' '}
                                        Categoría
                                    </Button>
                                    {editingCategory && (
                                        <Button
                                            color="gray"
                                            onClick={handleCancel}
                                            type="button"
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="rounded border p-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {category.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {category.description}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingCategory(
                                                            category,
                                                        );
                                                        setData({
                                                            name: category.name,
                                                            description:
                                                                category.description,
                                                        });
                                                        scrollToForm(
                                                            categoryFormRef,
                                                        );
                                                    }}
                                                >
                                                    <EditIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-500 hover:bg-red-600"
                                                    onClick={() => {
                                                        Swal.fire({
                                                            icon: 'warning',
                                                            title: '¿Estás seguro?',
                                                            text: 'Las subcategorias y productos que  pertenecen a esta categoria seran eliminados tambien. Esta acción no se puede deshacer.',
                                                            showCancelButton: true,
                                                            confirmButtonText:
                                                                'Sí, eliminar',
                                                            cancelButtonText:
                                                                'Cancelar',
                                                        }).then((result) => {
                                                            if (
                                                                result.isConfirmed
                                                            ) {
                                                                router.delete(
                                                                    route(
                                                                        'categories.destroy',
                                                                        category.id,
                                                                    ),
                                                                );
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <BsTrash3Fill />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Subcategories Section */}
                        <Card>
                            <h2 className="mb-4 text-xl font-bold">
                                Subcategorías
                            </h2>
                            <form
                                ref={subcategoryFormRef}
                                onSubmit={handleSubcategorySubmit}
                                className="mb-6 space-y-4"
                            >
                                <div>
                                    <Label
                                        htmlFor="category_id"
                                        value="Categoría"
                                    />
                                    <select
                                        id="category_id"
                                        className="w-full rounded-lg border-gray-300"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                'category_id',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Seleccionar categoría
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="subcategory_name"
                                        value="Nombre"
                                    />
                                    <textarea
                                        className="w-full rounded-lg border-gray-300"
                                        id="subcategory_name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="subcategory_description"
                                        value="Descripción"
                                    />
                                    <TextInput
                                        id="subcategory_description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        {editingSubcategory
                                            ? 'Actualizar'
                                            : 'Crear'}{' '}
                                        Subcategoría
                                    </Button>
                                    {editingSubcategory && (
                                        <Button
                                            color="gray"
                                            onClick={handleCancel}
                                            type="button"
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <div className="space-y-4">
                                {categories.map((category) => (
                                    <div key={category.id}>
                                        <h3 className="mb-2 font-semibold">
                                            {category.name}
                                        </h3>
                                        <div className="ml-4 space-y-2">
                                            {category.subcategories.map(
                                                (subcategory) => (
                                                    <div
                                                        key={subcategory.id}
                                                        className="rounded border p-3"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-medium">
                                                                    {
                                                                        subcategory.name
                                                                    }
                                                                </h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        subcategory.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setEditingSubcategory(
                                                                            subcategory,
                                                                        );
                                                                        setData(
                                                                            {
                                                                                name: subcategory.name,
                                                                                description:
                                                                                    subcategory.description,
                                                                                category_id:
                                                                                    subcategory.category_id,
                                                                            },
                                                                        );
                                                                        scrollToForm(
                                                                            subcategoryFormRef,
                                                                        );
                                                                    }}
                                                                >
                                                                    <EditIcon className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-red-500 hover:bg-red-600"
                                                                    onClick={() => {
                                                                        Swal.fire(
                                                                            {
                                                                                icon: 'warning',
                                                                                title: '¿Estás seguro?',
                                                                                text: 'Los productos que pertenecen a esta subcategoria seran eliminados tambien. Esta acción no se puede deshacer.',
                                                                                showCancelButton: true,
                                                                                confirmButtonText:
                                                                                    'Sí, eliminar',
                                                                                cancelButtonText:
                                                                                    'Cancelar',
                                                                                    
                                                                            },
                                                                        ).then(
                                                                            (
                                                                                result,
                                                                            ) => {
                                                                                if (
                                                                                    result.isConfirmed
                                                                                ) {
                                                                                    router.delete(
                                                                                        route(
                                                                                            'subcategories.destroy',
                                                                                            subcategory.id,
                                                                                        ),
                                                                                    );
                                                                                }
                                                                            },
                                                                        );
                                                                    }}
                                                                >
                                                                    <BsTrash3Fill />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

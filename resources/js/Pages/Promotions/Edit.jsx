import DefaultLayout from '@/Layouts/DefaultLayout';
import { useForm } from '@inertiajs/react';
import { Card, Label, TextInput, Textarea, Button, Select } from 'flowbite-react';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ promotion, products }) {
    const { data, setData, put, processing, errors } = useForm({
        title: promotion.title,
        description: promotion.description,
        discount: promotion.discount,
        start_date: promotion.start_date,
        end_date: promotion.end_date,
        product_id: promotion.product_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('promotions.update', promotion.id));
    };

    return (
        <DefaultLayout>
            <Head title="Editar Promoción" />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <Card className="w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Editar Promoción</h2>
                            <div className="text-sm text-gray-500">
                                ID: {promotion.id}
                            </div>
                        </div>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="lg:col-span-2">
                                    <Label htmlFor="title" value="Título" />
                                    <TextInput
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Título de la promoción"
                                        className="w-full"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div className="lg:col-span-2">
                                    <Label htmlFor="description" value="Descripción" />
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Descripción de la promoción"
                                        rows={4}
                                        className="w-full"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="discount" value="Descuento (%)" />
                                    <TextInput
                                        id="discount"
                                        type="number"
                                        value={data.discount}
                                        onChange={(e) => setData('discount', e.target.value)}
                                        placeholder="Ej: 15.00"
                                        step="0.01"
                                        className="w-full"
                                    />
                                    {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="product_id" value="Producto" />
                                    <Select
                                        id="product_id"
                                        value={data.product_id}
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        className="w-full"
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </Select>
                                    {errors.product_id && <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="start_date" value="Fecha de inicio" />
                                    <TextInput
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="end_date" value="Fecha de fin" />
                                    <TextInput
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    color="gray"
                                    onClick={() => window.history.back()}
                                    type="button"
                                >
                                    Cancelar
                                </Button>
                                <PrimaryButton 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full sm:w-auto"
                                >
                                    Actualizar promoción
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
}
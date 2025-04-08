import DefaultLayout from '@/Layouts/DefaultLayout';
import { useForm } from '@inertiajs/react';
import { Card, Label, TextInput, Textarea, Button, Select } from 'flowbite-react';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ products }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        discount: '',
        start_date: '',
        end_date: '',
        product_id: '',
    });

    console.log(products);
    

    const submit = (e) => {
        e.preventDefault();
        post(route('promotions.store'));
    };

    return (
        <DefaultLayout>
            <Head title="Crear Promoción" />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <Card className="w-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Promoción</h2>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Title and Description - Full width on small screens */}
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

                                {/* Discount and Product - Side by side on large screens */}
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

                                {/* Dates - Side by side */}
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

                            <div className="flex justify-end pt-4">
                                <PrimaryButton 
                                
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full sm:w-auto"
                                >
                                    Crear promoción
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
}

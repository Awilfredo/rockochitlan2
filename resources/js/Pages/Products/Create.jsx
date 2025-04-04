import CreateSubcategoryModal from "@/Components/CreateSubcategoryModal";
import PrimaryBlueButton from "@/Components/PrimaryBlueButton";
import SimpleImageEditor from "@/Components/SimpleImageEditor";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Create({ categories }){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: 0,
        visible: true,
        subcategory_id: "",
    });
    const defaultSubcategory = {
        categoryName: "",
        categoryId: '',
        createCategory: false,
        subcategoryName: "",
    };
    const [newSubcategory, setNewSubcategory] = useState(defaultSubcategory);

    const [showCreateSubcategory, setShowCreateSubcategory] = useState(false);

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                    ? files[0]
                    : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (image) {
            data.append("image", image.blob, "cropped-image.webp");
        }

        if (!image) {
            Swal.fire({
                title: "Alerta!",
                text: "No has seleccionado una imagen o no has guardado los cambios de la edición, ¿deseas guardar el producto sin una imagen?",
                icon: "warning",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3B82F6",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    sendData();
                }
            }); 
        }else{
            sendData();
        }
    };

    const sendData = (e) => {
        router.post(route("products.store"), data, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Exito!",
                    text: "Producto creado correctamente",
                    icon: "success",
                    timer: 2500,
                }).then(() => {
                    router.visit(route("products.index"));
                });
            },
            onError: (errors) => {
                Swal.fire({
                    title: "Error!",
                    text: "Hubo un error al crear el producto",
                    icon: "error",
                });
            }
        });
    };

    const handleCreateSubcategory = (e) => {
        e.preventDefault();
        console.log("Creating subcategory", newSubcategory);
        router.post(route("subcategory.store"), newSubcategory, {
            preserveState: true,
            onSuccess: () => {
                setNewSubcategory(defaultSubcategory);
                setShowCreateSubcategory(false);
            }
        });
    }

    return (
        <DefaultLayout>
            <div className="w-full flex justify-center px-5">
                <div className="w-full xl:w-10/12  p-5 grid grid-cols-1 bg-white rounded-lg shadow-md mb-5">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Crear Producto
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                    >
                        {/* Nombre */}
                        <div className="w-full">
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nombre
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full  px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Descripción */}
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 w-full  block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Precio */}
                            <div className="mb-4">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Precio
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="mt-1 w-full block  px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Stock */}
                            <div className="mb-4">
                                <label
                                    htmlFor="stock"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Categoría y Subcategoría */}
                            <div className="mb-4">
                                <label
                                    htmlFor="subcategory_id"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Categoría / Subcategoría
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="subcategory_id"
                                    name="subcategory_id"
                                    value={formData.subcategory_id}
                                    onChange={handleChange}
                                    className="mt-1 w-full block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                >
                                    <option value="">
                                        Selecciona una subcategoría
                                    </option>
                                    {categories.map((category) => (
                                        <optgroup
                                            key={category.id}
                                            label={category.name}
                                        >
                                            {category.subcategories.map(
                                                (subcategory) => (
                                                    <option
                                                        key={subcategory.id}
                                                        value={subcategory.id}
                                                    >
                                                        {subcategory.name}
                                                    </option>
                                                )
                                            )}
                                        </optgroup>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="my-5 text-blue-500"
                                    onClick={() =>
                                        setShowCreateSubcategory(true)
                                    }
                                >
                                    Crear una nueva subcategoría
                                </button>
                            </div>

                            {/* Visible */}
                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="visible"
                                    name="visible"
                                    checked={formData.visible}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="visible"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Visible
                                </label>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <SimpleImageEditor
                                croppedImage={image}
                                setCroppedImage={setImage}
                            ></SimpleImageEditor>
                        </div>
                        {/* Botón Enviar */}
                        <div className="flex justify-center w-full">
                            <PrimaryBlueButton type="submit">
                                Guardar
                            </PrimaryBlueButton>
                        </div>
                    </form>
                </div>
                <CreateSubcategoryModal
                    categories={categories}
                    show={showCreateSubcategory}
                    setShow={setShowCreateSubcategory}
                    data={newSubcategory}
                    setData={setNewSubcategory}
                    handleSubmit={handleCreateSubcategory}
                ></CreateSubcategoryModal>
            </div>
        </DefaultLayout>
    );
};

export default Create;

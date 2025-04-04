import { useState } from "react";
import DefaultLayout from "../../Layouts/DefaultLayout";
import PrimaryBlueButton from "../../Components/PrimaryBlueButton";
import Swal from "sweetalert2";
import TextareaInput from "@/Components/Inputs/TextareaInput";
import { router, usePage } from "@inertiajs/react";
import TextInput from "@/Components/Inputs/TexInput";
import CheckInput from "@/Components/Inputs/CheckInput";
import SimpleImageEditor from "@/Components/SimpleImageEditor";

const Create = () => {
    const user = usePage().props.auth.user;
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        location: "",
        is_public: false,
        user_id: user.id,
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        data.append("image", image.blob, "cropped-image.webp");

        router.post(route("events.store"), data, {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Evento creado correctamente",
                    icon: "success",
                    timer: 2500,
                }).then(() => {
                    router.visit(route("events.index"));
                });
            },
            onError: (error) => {
                Swal.fire({
                    title: "Error!",
                    text: `Hubo un error al crear el evento ${error}`,
                    icon: "error",
                });
            },
        });
    };

    return (
        <DefaultLayout>
            <div className="w-full flex justify-center px-5">
                <div className="w-full xl:w-10/12 p-5 flex justify-center flex-wrap bg-white rounded-lg shadow-md mb-5">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 w-full">
                        Nuevo Evento
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full sm:grid sm:grid-cols-2 gap-5 xl:grid-cols-3"
                    >
                        {/* Title */}
                        <TextInput
                            label="Titulo"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required={true}
                        ></TextInput>

                        <TextareaInput
                            label="Descripcion"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required={true}
                        ></TextareaInput>

                        {/* Start Date */}

                        <div className="grid grid-cols-2 gap-2">
                            <TextInput
                                label="Fecha de Inicio"
                                name="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required={true}
                            ></TextInput>

                            {/* End Date */}
                            <TextInput
                                label="Fecha de finalizacion"
                                name="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={handleChange}
                            ></TextInput>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <TextInput
                                label="Hora de Inicio"
                                name="start_time"
                                type="time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required={true}
                            ></TextInput>
                            <TextInput
                                label="Hora de finalizacion"
                                name="end_time"
                                type="time"
                                value={formData.end_time}
                                onChange={handleChange}
                            ></TextInput>
                        </div>

                        {/* Location */}
                        <TextInput
                            label="Ubicacion"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required={true}
                        ></TextInput>

                        {/* Public */}

                        <CheckInput
                            label="Publico"
                            name="public"
                            onChange={handleChange}
                            checked={true}
                        ></CheckInput>

                        <div className="lg:col-span-2">
                            <SimpleImageEditor
                                croppedImage={image}
                                setCroppedImage={setImage}
                                aspect={4 / 4}
                            ></SimpleImageEditor>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center w-full mt-10">
                            <PrimaryBlueButton type="submit">
                                Guardar
                            </PrimaryBlueButton>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Create;

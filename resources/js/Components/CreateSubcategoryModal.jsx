import { useEffect, useState } from "react";
import DangerButton from "./DangerButton";
import SelectInput from "./Inputs/SelectInput";
import TextInput from "./Inputs/TexInput";
import Modal from "./Modal";
import PrimaryBlueButton from "./PrimaryBlueButton";

function CreateSubcategoryModal({
    categories = [],
    show,
    setShow,
    data=[],
    setData,
    handleSubmit,
}) {
    const [createCategory, setCreateCategory] = useState(false);

    const handleCreateSubcategory = () => {
        setCreateCategory(!createCategory);
    };

    useEffect(() => {
        setData({ ...data, createCategory });
    }, [createCategory]);

    const handleCancel = (e) => {
        setShow(false);
    };

        

    return (
        <Modal show={show}>
            <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="px-5">
                    <h2 className="text-lg text-center w-full font-bold text-gray-900">
                        Crear Categoría
                    </h2>
                    <div className=" grid grid-cols-2 gap-5 my-5">
                        {createCategory ? (
                            <TextInput
                                label="Nombre de la Nueva Categoria"
                                value={data.categoryName}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        categoryName: e.target.value,
                                    })
                                }
                                required
                            ></TextInput>
                        ) : (
                            <SelectInput
                                required={true}
                                label={<>Selecciona una categoría</>}
                                value={data.categoryId}
                                onChange={(e) => setData({...data, categoryId: e.target.value})}
                            >
                                <option value="">
                                    Selecciona una subcategoría
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </SelectInput>
                        )}
                        <div className="flex justify-center items-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded h-10"
                                type="button"
                                onClick={handleCreateSubcategory}
                            >
                                {createCategory
                                    ? "Seleccionar"
                                    : "Crear"}
                            </button>
                        </div>
                    </div>
                    <TextInput
                        label="Nombre de la Nueva Subcategoria"
                        required
                        value={data.subcategoryName}
                        onChange={(e) =>setData({...data, subcategoryName: e.target.value})}
                    ></TextInput>
                    <div className="flex justify-center w-full gap-5 my-5">
                        <DangerButton type="button" onClick={handleCancel}>
                            Cancelar
                        </DangerButton>
                        <PrimaryBlueButton type="submit">
                            Guardar
                        </PrimaryBlueButton>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default CreateSubcategoryModal;

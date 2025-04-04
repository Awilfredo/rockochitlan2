import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

function EditContent({ show, onClose, contentKey, initialContent }) {
    const { data, setData, patch, processing, errors } = useForm({
        key: contentKey,
        content: initialContent || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('page-contents.update', contentKey), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} closeable={true}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Editar Contenido
                </h2>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contenido
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows="4"
                        />
                        {errors.content && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancelar
                        </button>
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : 'Guardar Cambios'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default EditContent;
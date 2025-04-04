import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import DataTable from 'react-datatable';

const Edit = () => {
    const { contents } = usePage().props;
    const [data, setData] = useState(contents);

    const handleValueChange = (id, value) => {
        const updated = data.map(item =>
            item.id === id ? { ...item, value } : item
        );
        setData(updated);
    };

    const handleSave = (id, value) => {
        router.put(route('contents.update', id), { value }, {
            onSuccess: () => console.log('Actualizado'),
            onError: () => alert('Error al actualizar'),
        });
    };

    const columns = [
        { key: 'id', text: 'ID', sortable: true },
        { key: 'key', text: 'Clave', sortable: true },
        {
            key: 'value',
            text: 'Contenido',
            cell: record => (
                <textarea
                    value={record.value}
                    onChange={e => handleValueChange(record.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={2}
                />
            )
        },
        {
            key: 'actions',
            text: 'Acciones',
            cell: record => (
                <button
                    onClick={() => handleSave(record.id, record.value)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Guardar
                </button>
            )
        }
    ];

    const config = {
        page_size: 10,
        length_menu: [5, 10, 20],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        language: {
            filter: "Buscar...",
            length_menu: "Mostrar _MENU_ registros por página",
            no_data_text: "Sin registros",
        },
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Contenidos de la Página</h1>
            <DataTable
                records={data}
                columns={columns}
                config={config}
            />
        </div>
    );
};

export default Edit;

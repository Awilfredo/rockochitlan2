import { Link } from '@inertiajs/react';

export default function Index({ contents }) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-bold">Descripciones de página</h1>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="text-left">Clave</th>
                        <th className="text-left">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map((content) => (
                        <tr key={content.id}>
                            <td>{content.key}</td>
                            <td>
                                <Link
                                    href={route(
                                        'page-contents.edit',
                                        content.id,
                                    )}
                                    className="text-blue-500 underline"
                                >
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

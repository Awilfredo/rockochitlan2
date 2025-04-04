import PrimaryBlueButton from '@/Components/PrimaryBlueButton';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryGreenButton from '@/Components/PrimaryGreenButton';
import ProductCard from '@/Components/ProductCard';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function Index({ auth, data }) {
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSubcaregory, setSelectedSubcaregory] = useState({});
    useEffect(() => {
        setSelectedCategory(data[0]);
        setSelectedSubcaregory(data[0].subcategories[0]);
        console.log(data);
    }, []);

    const handleClickCategory = (element) => {
        setSelectedCategory(element);
        setSelectedSubcaregory(element.subcategories[0]);
    };

    const handleClickSubcategory = (element) => {
        setSelectedSubcaregory(element);
    };

    return (
        <DefaultLayout>
            <div className='flex w-full flex-wrap justify-center px-5'>
                <div className="mb-5 grid w-full grid-cols-2 gap-4">
                    {data.map((element, index) =>
                        selectedCategory.id == element.id ? (
                            <PrimaryButton key={index} className="w-full h-10">
                                <div className="flex w-full justify-center">
                                    {element.name}
                                </div>
                            </PrimaryButton>
                        ) : (
                            <PrimaryBlueButton
                                key={index}
                                className="w-full h-10"
                                onClick={() => handleClickCategory(element)}
                            >
                                <div className="flex w-full justify-center">
                                    {element.name}
                                </div>
                            </PrimaryBlueButton>
                        ),
                    )}
                </div>
                <div className="mb-10 flex w-full flex-wrap gap-5">
                    {selectedCategory.id
                        ? selectedCategory.subcategories.map(
                              (element, index) =>
                                  selectedSubcaregory.id == element.id ? (
                                      <button
                                          key={index}
                                          className="text-blue-700 hover:text-blue-900"
                                      >
                                          {element.name}
                                      </button>
                                  ) : (
                                      <button
                                          key={index}
                                          className="text-green-700 hover:text-green-900"
                                          onClick={() =>
                                              handleClickSubcategory(element)
                                          }
                                      >
                                          {element.name}
                                      </button>
                                  ),
                          )
                        : ''}
                </div>

                {selectedSubcaregory?.id ? (
                    <div>
                        {' '}
                        <h1 className="mb-5 mt-10 w-full text-center text-xl">
                            Se han encontrado{' '}
                            {
                                selectedSubcaregory.products.filter(
                                    (obj) =>
                                        auth.user?.roles.includes('admin') ||
                                        obj.visible,
                                ).length
                            }{' '}
                            productos
                        </h1>
                        {auth.user?.roles.includes('admin') ? (
                            <div className="mb-5 flex w-full flex-wrap justify-center gap-4 px-2">
                                <Link href={route('products.create')}>
                                    <PrimaryGreenButton>
                                        Crear Nuevo elemento
                                    </PrimaryGreenButton>
                                </Link>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="mb-5 flex w-full flex-wrap justify-between sm:grid sm:gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                            {' '}
                            {selectedSubcaregory.products.map(
                                (element, index) =>
                                    auth.user?.roles.includes('admin') ||
                                    element.visible ? (
                                        <ProductCard
                                            key={index}
                                            product={element}
                                            hide={
                                                auth.user?.roles.includes(
                                                    'admin',
                                                ) || element.visible
                                            }
                                        ></ProductCard>
                                    ) : (
                                        ''
                                    ),
                            )}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </DefaultLayout>
    );
}

export default Index;

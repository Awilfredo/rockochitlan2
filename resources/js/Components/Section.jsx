function Section({className='', children}) {
    return (
        <section className={`${className} mt-10 flex w-full flex-wrap justify-center`}>
            {
                children
            }
        </section>
    );
}

export default Section;
function MapLocation() {
    return (
        <iframe
            className="w-full max-w-4xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.326276259033!2d-89.02982692490112!3d13.939168192927944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f636bde29d47e8d%3A0x5a735039f954f775!2sRockochitl%C3%A1n%20Grill%20And%20Music!5e0!3m2!1ses-419!2ssv!4v1734045535574!5m2!1ses-419!2ssv"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    );
}

export default MapLocation;

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import PrimaryButton from "./PrimaryButton";

const SimpleImageEditor = ({ croppedImage = null, setCroppedImage, aspect=4 / 3  }) => {
    const [imageSrc, setImageSrc] = useState(null); // Imagen cargada
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // Posición del recorte
    const [zoom, setZoom] = useState(1); // Nivel de zoom
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Área recortada en píxeles
    const [outputResolution, setOutputResolution] = useState(1); // Resolución de salida (escala de la imagen recortada)
    //const [croppedImage, setCroppedImage] = useState(null); // Imagen recortada guardada

    // Maneja la selección de la imagen
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result); // Carga la imagen en base64
            reader.readAsDataURL(file);
        }

        setCroppedImage(null);
    };

    // Maneja el cambio en el recorte
    const onCropChange = useCallback((crop) => {
        setCrop(crop);
    }, []);

    // Maneja el cambio de zoom
    const onZoomChange = useCallback((zoom) => {
        setZoom(zoom);
    }, []);

    // Guarda el área recortada
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
        console.log("Área Recortada en Píxeles:", croppedAreaPixels);
    }, []);

    // Función para guardar la imagen recortada con resolución personalizada
    const saveCroppedImage = () => {
        if (croppedAreaPixels && imageSrc) {
            const canvas = document.createElement("canvas");
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const { x, y, width, height } = croppedAreaPixels;

                // Ajustar la resolución de salida
                const outputWidth = width * outputResolution;
                const outputHeight = height * outputResolution;
                canvas.width = outputWidth;
                canvas.height = outputHeight;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    image,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    outputWidth,
                    outputHeight
                );

                // Convertir la imagen recortada a un Blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Crear un ObjectURL para previsualización
                        const objectURL = URL.createObjectURL(blob);
                        setCroppedImage({ objectURL, blob }); // Guardar el blob y el URL
                    } else {
                        console.error(
                            "Error al generar el Blob de la imagen recortada."
                        );
                    }
                }, "image/webp");
            };
            image.onerror = () => console.error("Error al cargar la imagen.");
        }
    };

    const handleEdit = (e) => {
        setCroppedImage(null);
    };

    return (
        <div>
            <h1 className="text-xl mb-5">IMAGEN</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
            />

            {imageSrc && !croppedImage && (
                <div>
                    <p className="text-sm mt-5">Recortar Imagen</p>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "400px",
                        }}
                    >
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={onCropChange}
                            onZoomChange={onZoomChange}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <label>Zoom: </label>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) =>
                                onZoomChange(Number(e.target.value))
                            }
                        />
                    </div>

                    {croppedAreaPixels && (
                        <PrimaryButton type="button" onClick={saveCroppedImage}>
                            Guardar Imagen Recortada
                        </PrimaryButton>
                    )}
                </div>
            )}

            {/* Mostrar la imagen recortada */}
            {croppedImage && (
                <div style={{ marginTop: 20 }}>
                    <h2>Imagen Recortada</h2>
                    <img
                        src={croppedImage.objectURL}
                        alt="Imagen Recortada"
                        style={{ maxWidth: "100%", maxHeight: 400 }}
                        className="mb-5"
                    />
                    <PrimaryButton onClick={handleEdit}>Editar</PrimaryButton>
                </div>
            )}
        </div>
    );
};

export default SimpleImageEditor;

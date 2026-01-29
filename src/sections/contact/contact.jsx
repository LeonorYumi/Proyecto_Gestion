import React, { useState } from "react";
import { db } from "../../firebase/config"; // Verifica que esta ruta llegue a tu archivo config.js
import { collection, addDoc } from "firebase/firestore";
import './contact.css';

const Contact = () => {
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            await addDoc(collection(db, "contactos"), {
                nombre: formData.get("nombre"),
                correo: formData.get("corre0"),
                celular: formData.get("celular"),
                observaciones: formData.get("observaciones"),
                fecha: new Date().toLocaleString()
            });

            setEnviado(true);
            e.target.reset(); // Limpia los campos del formulario
            
            // Oculta el mensaje de éxito después de 5 segundos
            setTimeout(() => setEnviado(false), 5000);
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al enviar el mensaje. Revisa la consola.");
        }
    };

    return (
        <section id="contact" className="container contact" data-aos="fade-up">    
            <h2 className="contact__title">Contáctanos</h2>
            <div className="contact__row">       
                <div className="contact__form">
                    {/* Mensaje de confirmación */}
                    {enviado && (
                        <div className="alerta-exito">
                            ¡Mensaje enviado con éxito!
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nombre" placeholder="Nombre" required />
                        <input type="email" name="corre0" placeholder="Correo" required />
                        <input type="tel" name="celular" placeholder="Celular" required />
                        <textarea name="observaciones" placeholder="Observaciones" rows="4"></textarea>
                        <label className="checkbox__label">
                            <input type="checkbox" required />
                            Términos y condiciones
                        </label>
                        <button type="submit" className="btn button">Enviar</button>
                    </form>
                </div>
                <div className="contact__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7902553041!2d-78.4912953251!3d-0.210546399787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a1079ba7f5b%3A0x673934d618d4076!2sEscuela%20Polit%C3%A9cnica%20Nacional!5e0!3m2!1ses!2sec!4v1700000000000"
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa EPN"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
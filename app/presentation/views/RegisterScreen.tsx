import React, { useEffect, useState } from "react";
import { View, Text, Image, ToastAndroid, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsStackNavigation } from "../interfaces/StackNav";
import { RegisterViewModel } from "../viewModel/RegisterViewModel";
import { FormInputInline } from "../components/FormInputInLine";
import { RoundedButton } from "../components/RoundedButton";
import { useCityCoordinates } from "../components/CityInput";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export function RegisterScreen({ navigation }: PropsStackNavigation) {
    const {
        nombre,
        clave,
        repeatClave,
        email,
        sexo,
        posicion,
        fechaNacimiento,
        descripcion,
        distancia,
        errorMessage,
        onChangeRegister,
        register,
    } = RegisterViewModel();

    const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState("");
    const [sexoError, setSexoError] = useState("");
    const [city, setCity] = useState("");
    const [position, setPosition] = useState("");
    const [imagenes, setImagenes] = useState<string[]>([]);
    const { getCoordinates, errorCity } = useCityCoordinates();

    const handleCityChange = (text: string) => {
        setCity(text);
        const result = getCoordinates(text);
        if (result && result.coords) {
            setPosition(result.coords);
            onChangeRegister("posicion", result.coords);
        }
    };

    const seleccionarImagen = async () => {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permiso.granted) {
            alert("Se necesita permiso para acceder a la galería");
            return;
        }
    
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!resultado.canceled) {
            const nuevasImagenes = [...imagenes, resultado.assets[0].uri];
            setImagenes(nuevasImagenes);
            onChangeRegister("imagenes", nuevasImagenes); // Actualizar inmediatamente en el ViewModel
        }
    };

    const handleFinalizar = async () => {
        // Actualizar las imágenes en el modelo de vista antes de registrar
        onChangeRegister("imagenes", imagenes);
        
        console.log({
            nombre,
            clave,
            repeatClave,
            email,
            sexo,
            posicion,
            fechaNacimiento,
            descripcion,
            distancia,
            imagenes,
        });
        // Usar el método register del ViewModel
        const result = await register();
        

        if (result.success) {
            ToastAndroid.show("Registro exitoso", ToastAndroid.LONG);
            navigation.navigate("Login");
        } else {
            ToastAndroid.show("Error en el registro", ToastAndroid.LONG);
        }
    };

    useEffect(() => {
        if (errorMessage !== "") {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage]);

    const nextStep = () => {
        // Validación específica para cada paso usando el ViewModel
        let isValid = true;
        const errors = {};
    
        switch (step) {
            case 1: // Validación del nombre
                if (!nombre.trim()) {
                    isValid = false;
                    ToastAndroid.show("El nombre de usuario es obligatorio", ToastAndroid.SHORT);
                }
                break;
            
            case 2: // Validación de contraseñas
                if (!clave.trim()) {
                    isValid = false;
                    ToastAndroid.show("La contraseña es obligatoria", ToastAndroid.SHORT);
                } else if (clave !== repeatClave) {
                    isValid = false;
                    setPasswordError("Las contraseñas no coinciden");
                    ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
                } else {
                    setPasswordError("");
                }
                break;
            
            case 3: // Validación del email
                if (!email.trim()) {
                    isValid = false;
                    ToastAndroid.show("El correo electrónico es obligatorio", ToastAndroid.SHORT);
                } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                    isValid = false;
                    ToastAndroid.show("Ingrese un correo electrónico válido", ToastAndroid.SHORT);
                }
                break;
            
            case 4: // Validación del sexo
                if (!["HOMBRE", "MUJER"].includes(sexo)) {
                    isValid = false;
                    setSexoError("Debe seleccionar un sexo válido");
                    ToastAndroid.show("Debe seleccionar HOMBRE o MUJER", ToastAndroid.SHORT);
                } else {
                    setSexoError("");
                }
                break;
            
            case 5: // Validación de la ciudad/posición
                if (!posicion || posicion.trim() === "") {
                    isValid = false;
                    ToastAndroid.show("Debe ingresar una ciudad válida", ToastAndroid.SHORT);
                }
                break;
            
            case 6: // Validación de la fecha de nacimiento
                if (!fechaNacimiento.trim()) {
                    isValid = false;
                    ToastAndroid.show("Debe ingresar una fecha de nacimiento", ToastAndroid.SHORT);
                } else if (!/^\d{2}-\d{2}-\d{4}$/.test(fechaNacimiento)) {
                    isValid = false;
                    ToastAndroid.show("El formato debe ser DD-MM-YYYY", ToastAndroid.SHORT);
                }
                break;
            
            case 7: // Validación de la descripción
                if (!descripcion.trim()) {
                    isValid = false;
                    ToastAndroid.show("Debe ingresar una descripción", ToastAndroid.SHORT);
                }
                break;
            
            case 8: // Validación de la distancia
                if (typeof distancia !== 'string' || !distancia.trim() || isNaN(Number(distancia)) || Number(distancia) <= 0) {
                    isValid = false;
                    ToastAndroid.show("Debe ingresar una distancia válida en metros", ToastAndroid.SHORT);
                }
                break;
            
            case 9: // Validación de imágenes (aunque este es el último paso)
                if (!imagenes.length) {
                    isValid = false;
                    ToastAndroid.show("Debe seleccionar al menos una imagen", ToastAndroid.SHORT);
                }
                break;
        }
    
        // Si la validación es correcta, avanza al siguiente paso
        if (isValid) {
            // Si estamos en el último paso, no avanzamos
            if (step < 9) {
                setStep((prev) => prev + 1);
            }
        }
    };

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.container}
        >
            <Image
                source={require("../../assets/flashmeet_logo.png")}
                style={styles.logoSplash}
            />

            <View style={styles.inputContainer}>
                {step === 1 && (
                    <>
                        <Text style={styles.presentationText}>
                            ¡Hey! Vamos a crear tu cuenta, no te tomará más de un café, ¡Empezamos! ¿Cómo quieres que te llame?
                        </Text>
                        <FormInputInline
                            placeholder={"Nombre de usuario"}
                            keyboardType="default"
                            value={nombre}
                            secureTextEntry={false}
                            onPressFormInterface={(text) => onChangeRegister("nombre", text)}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <Text style={styles.presentationText}>Hora de la verdad... crea una contraseña segura (y que recuerdes)</Text>
                        <FormInputInline
                            placeholder={"Contraseña"}
                            keyboardType="default"
                            value={clave}
                            secureTextEntry={true}
                            onPressFormInterface={(text) => onChangeRegister("clave", text)}
                        />
                        <FormInputInline
                            placeholder={"Repetir Contraseña"}
                            keyboardType="default"
                            secureTextEntry={true}
                            value={repeatClave}
                            onPressFormInterface={(text) => {
                                onChangeRegister("repeatClave", text);
                                if (text !== clave) {
                                    setPasswordError("Las contraseñas no coinciden");
                                } else {
                                    setPasswordError("");
                                }
                            }}
                        />
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    </>
                )}
                {step === 3 && (
                    <>
                        <Text style={styles.presentationText}>Tu correo, por favor. Prometo no enviarte recetas de cocina raras (a menos que quieras).</Text>
                        <FormInputInline
                            placeholder={"Correo electrónico"}
                            keyboardType="email-address"
                            value={email}
                            secureTextEntry={false}
                            onPressFormInterface={(text) => onChangeRegister("email", text)}
                        />
                    </>
                )}
                {step === 4 && (
                    <>
                        <Text style={styles.presentationText}>Dime, ¿cómo te identificas? (Hombre/Mujer). Tranquil@, no voy a pedirte certificado de nacimiento.</Text>
                        <FormInputInline
                            placeholder={"Sexo (HOMBRE/MUJER)"}
                            keyboardType="default"
                            secureTextEntry={false}
                            value={sexo}
                            onPressFormInterface={(text) => {
                                onChangeRegister("sexo", text);
                                if (!["HOMBRE", "MUJER"].includes(text)) {
                                    setSexoError("Debe seleccionar un sexo válido");
                                } else {
                                    setSexoError("");
                                }
                            }}
                        />
                        {sexoError ? <Text style={styles.errorText}>{sexoError}</Text> : null}
                    </>
                )}
                {step === 5 && (
                    <>
                        <Text style={styles.presentationText}>
                            ¿Desde dónde nos saludas? Escríbeme tu ciudad, y no, “Planeta Tierra” no cuenta.
                        </Text>
                        <FormInputInline
                            placeholder={"Ciudad"}
                            keyboardType="default"
                            value={city}
                            secureTextEntry={false}
                            onPressFormInterface={handleCityChange}
                        />
                        {errorCity ? <Text style={styles.errorText}>{errorCity}</Text> : null}                       
                    </>
                )}

                {step === 6 && (
                    <>
                        <Text style={styles.presentationText}>¿Cuándo es tu cumple? (DD-MM-YYYY). Esto no es para enviarte un regalo, pero nunca se sabe…</Text>
                        <FormInputInline
                            placeholder={"Fecha de Nacimiento (DD-MM-YYYY)"}
                            keyboardType="default"
                            value={fechaNacimiento}
                            secureTextEntry={false}
                            onPressFormInterface={(text) => onChangeRegister("fechaNacimiento", text)}
                        />
                    </>
                )}
                {step === 7 && (
                    <>
                        <Text style={styles.presentationText}>Preséntate en pocas palabras. Puedes escribir “Amante de la pizza” o “Dueño/a de un perrito adorable”, yo no juzgo</Text>
                        <FormInputInline
                            placeholder={"Descripción"}
                            keyboardType="default"
                            value={descripcion}
                            secureTextEntry={false}
                            onPressFormInterface={(text) => onChangeRegister("descripcion", text)}
                        />
                    </>
                )}
                {step === 8 && (
                    <>
                        <Text style={styles.presentationText}>¿Hasta qué distancia quieres conocer gente? (en metros). Recuerda, 12,000 metros son 12 kilómetros… por si quieres evitar sorpresas tipo larga distancia.</Text>
                        <FormInputInline
                            placeholder={"Distancia en metros (ej. 12000)"}
                            keyboardType="numeric"
                            value={distancia.toString()}
                            secureTextEntry={false}
                            onPressFormInterface={(text) => onChangeRegister("distancia", text)}
                        />
                    </>
                )}
            
            {step === 9 && (
                <>
                    <Text style={styles.presentationText}>Finalmente, ¡Sube tus 6 mejores fotos!</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
                        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        {imagenes.map((imagen, index) => (
                            <Image key={index} source={{ uri: imagen }} style={styles.imagePreview} />
                        ))}
                    </View>
                    
                </>
            )}
            </View>
            <View style={styles.buttonContainer}>
                {step > 1 && <RoundedButton text={"Atrás"} onPressFromInterface={() => setStep((prev) => prev - 1)} />}
                {step < 9 ? (
                    <RoundedButton text={"Siguiente"} onPressFromInterface={() => setStep((prev) => prev + 1)} />
                ) : (
                    <RoundedButton text={"Finalizar"} onPressFromInterface={handleFinalizar} />
                )}
            </View>
            
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>
                    ¿Ya tienes cuenta? Inicia sesión
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logoSplash: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    errorText: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
        marginBottom: 10, // Pequeño margen antes del link de inicio de sesión
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    link: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    presentationText: {
        color: "#fff",
        fontSize: 20,
        marginBottom: 10,
    },
    imageButton: { backgroundColor: "#000", padding: 10, borderRadius: 10, alignItems: "center", marginVertical: 10 },
    imageContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 },
    imagePreview: { width: 80, height: 80, borderRadius: 10, margin: 5 },
});

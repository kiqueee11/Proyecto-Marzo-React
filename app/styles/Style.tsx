import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
    },
    logoSplash: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: "contain",
    },
    inputContainer: {
        width: "80%",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        marginVertical: 10,
    },
    secondaryButton: {
        backgroundColor: "#FF8899",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    linkContainer: {
        marginTop: 20,
    },
    link: {
        color: "white",
        textDecorationLine: "underline",
        marginVertical: 5,
    },
    profileButton: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 220,
        height: 220,
        borderRadius: 100,
        marginBottom: 10,
    },
    profileName: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    profileAge: {
        color: "white",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginVertical: 20,
    },
    iconButton: {
        alignItems: "center",
    },
    iconButtonText: {
        color: "white",
        fontSize: 14,
    },
    meetButton: {
        backgroundColor: "black",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    meetButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    editProfileContainer: {
        flex: 1,
        backgroundColor: "#FF6B8B",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 35,
    },
    backButtonText: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
    },
    photoBox: {
        width: "33%",
        aspectRatio: 1,
        padding: 5,
    },
    cameraIcon: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFA0B4",
        borderRadius: 10,
    },
    personalInfo: {
        padding: 15,
    },
    sectionTitle: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
    },
    infoInput: {
        backgroundColor: "#FFA0B4",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    descriptionInput: {
        backgroundColor: "#FFA0B4",
        margin: 15,
        padding: 10,
        borderRadius: 8,
        height: 100,
    },
    socialLinks: {
        padding: 15,
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
    settingsContainer: {
        flex: 1,
        backgroundColor: "#FF6B8B",
    },
    settingsSection: {
        padding: 15,
    },
    settingsHeader: {
        color: "white",
        fontSize: 16,
        marginBottom: 15,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFA0B4",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    settingValue: {
        color: "#666",
    },
    preferencesToggle: {
        flexDirection: "row",
        backgroundColor: "#black",
        borderRadius: 8,
        marginVertical: 10,
        overflow: "hidden",
    },
    preferenceButton: {
        flex: 1,
        padding: 15,
        alignItems: "center",
    },
    activePreference: {
        backgroundColor: "#FF8899",
    },
    sessionButtons: {
        padding: 15,
    },
    logoutContainer: {
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "black", 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: "80%", 
        alignItems: "center",
        justifyContent: "center",
    },
    logoutText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteContainer: {
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center", 
        marginVertical: 20, 
    },
    deleteButton: {
        backgroundColor: "transparent",
        borderColor: "#FF8899",
        borderWidth: 2, 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: "80%", 
        alignItems: "center", 
        justifyContent: "center",
    },
    deleteText: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16, 
    },
    friendsContainer: {
        flex: 1,
        paddingTop: 10, 
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    card: {
        backgroundColor: "white", 
        borderRadius: 10, 
        margin: 10, 
        padding: 10, 
        shadowColor: "#000", 
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardContent: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    rangeText: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    friendMessage: {
        fontSize: 14,
        color: "#666",
    },
});

export default styles;

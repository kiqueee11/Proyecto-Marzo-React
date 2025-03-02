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
    modalInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 8,
    },

    modalInputIcon: {
        marginRight: 10,
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

    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    editProfileContainer: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    editProfileHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 1,
        top: 20,
        left: 0,
        right: 0,
    },

    backIcon: {
        fontSize: 24,
        color: "#000",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "500",
        color: "#fff",
        marginLeft: 10,
        fontStyle: "italic",
    },
    content: {
        flex: 1,
    },
    profilePhotoContainer: {
        width: "100%",
        height: 250,
        backgroundColor: "#ccc",
    },
    profilePhoto: {
        width: "100%",
        height: "100%",
    },
    profileInfoCard: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    editProfileInfoCard: {
        height: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    ageGenderContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingTop: 10,
    },

    editProfileName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        fontFamily: "sans-serif", 
    },

    editProfileAge: {
        fontSize: 20,
        color: "#333",
        marginLeft: 15,
    },

    profileGender: {
        fontSize: 16,
        color: "#666",
        marginLeft: 15,
    },

    editButton: {
        marginLeft: "auto",
    },

    editIcon: {
        fontSize: 22,
        color: "#000",
    },
    descriptionSection: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
        fontFamily: "serif",
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        fontSize: 18,
        width: "80%",
    },

    descriptionText: {
        fontSize: 16,
        color: "#666",
    },
    photosSection: {
        marginTop: 20,
    },
    profileImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridPhotoContainer: {
        width: 100,
        height: 100,
        margin: 5,
    },
    gridPhoto: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    coverPhotoHighlight: {
        borderWidth: 2,
        borderColor: "blue", 
    },
    emptyPhotoSlot: {
        width: 100,
        height: 100,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    cameraIconContainer: {
        alignItems: "center",
    },
    coverPhotoSection: {
        marginTop: 20,
        alignItems: "center",
    },

    coverPhotoLabel: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    coverPhoto: {
        width: "100%",
        height: 100,
    },
    plusIcon: {
        marginBottom: 5,
    },
    cameraBody: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
    },
    socialSection: {
        marginTop: 20,
    },
    socialIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    socialIconButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#f1f1f1",
    },
    socialEditButton: {
        padding: 10,
    },
    socialEditContainer: {
        marginTop: 10,
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: "#E35D66",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    instagramIcon: {
        fontSize: 24,
    },
    facebookIcon: {
        fontSize: 24,
    },
    twitterIcon: {
        fontSize: 24,
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalInputField: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 10,
        padding: 5,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },
    modalSaveButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginRight: 5,
    },
    modalCancelButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    chatHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    chatBackButton: {
        marginRight: 10,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    usernameText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10,
        fontStyle: "italic",
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: "70%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    otherMessageText: {
        fontSize: 16,
        color: "black",
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: "70%",
    },
    myMessageText: {
        fontSize: 16,
        color: "white",
    },
    chatInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 25,
        margin: 10,
    },
    chatInput: {
        flex: 1,
        fontSize: 16,
        color: "black",
        paddingHorizontal: 10,
    },
    sendButton: {
        backgroundColor: "#A479AF",
        padding: 10,
        borderRadius: 25,
        marginLeft: 5,
    },
    chatContainer: {
        flex: 1,
    },
    chatModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    chatModalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    chatModalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    chatModalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    chatModalButtonYes: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
    },
    chatModalButtonNo: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
    },
    chatModalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    actionIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        right: 10,
        top: 10,
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    actionIcon: {
        marginLeft: 10,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginTop: 5,
    },
});

export default styles;
